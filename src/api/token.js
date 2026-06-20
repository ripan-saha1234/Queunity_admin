export function getToken() {
  const raw = localStorage.getItem('queunity_admin_token');
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    return typeof parsed === 'string' ? parsed : null;
  } catch {
    return raw;
  }
}

export function setToken(token) {
  localStorage.setItem('queunity_admin_token', JSON.stringify(token));
}

export function removeToken() {
  localStorage.removeItem('queunity_admin_token');
}

export function getStoredUser() {
  const raw = localStorage.getItem('queunity_admin_user');
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setStoredUser(user) {
  localStorage.setItem('queunity_admin_user', JSON.stringify(user));
}

export function removeStoredUser() {
  localStorage.removeItem('queunity_admin_user');
}

export function clearAuth() {
  removeToken();
  removeStoredUser();
}
