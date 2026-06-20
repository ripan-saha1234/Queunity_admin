import { setStoredUser, setToken } from './token';

export async function login({ username, password }) {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ username, password }),
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.detail || 'Login failed');
  }

  const token =
    data.token ??
    data.access_token ??
    data.accessToken ??
    response.headers.get('Authorization')?.replace(/^Bearer\s+/i, '');

  if (token) {
    setToken(token);
  } else if (data.message?.toLowerCase().includes('success')) {
    setToken('session-authenticated');
  }

  if (data.name) {
    setStoredUser({
      id: null,
      name: data.name,
      firstName: data.name,
      lastName: '',
      email: username,
      phone: '',
      roles: ['admin'],
      image: '/avatar.svg',
    });
  }

  return data;
}
