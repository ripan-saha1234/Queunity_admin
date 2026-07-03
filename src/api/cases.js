import { getToken } from './token';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function authHeaders(extra = {}) {
  const token = getToken();
  const headers = { Accept: 'application/json', ...extra };
  if (token && token !== 'session-authenticated') {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

// Uploads a single image and returns the hosted URL.
// Response shape: { message, filename, url }
export async function uploadImage(file) {
  const body = new FormData();
  body.append('file', file);

  const response = await fetch(`${BASE_URL}/upload-image`, {
    method: 'POST',
    headers: authHeaders(),
    body,
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.detail || 'Image upload failed');
  }

  return data.url;
}

// Submits the full case form payload to the add_case endpoint.
export async function addCase(payload) {
  const response = await fetch(`${BASE_URL}/add_case`, {
    method: 'POST',
    headers: authHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(payload),
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.detail || 'Failed to add case');
  }

  return data;
}

// GET /get_allcases/{case_id} — full case details for the submitted case view.
export async function getCaseById(caseId) {
  const response = await fetch(`${BASE_URL}/get_allcases/${encodeURIComponent(caseId)}`, {
    method: 'GET',
    headers: authHeaders(),
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.detail || 'Failed to fetch case details');
  }

  return data;
}

export async function getAllCasesPagination({ page = 1, pageSize = 10 } = {}) {
  const params = new URLSearchParams({
    page: String(page),
    page_size: String(pageSize),
  });

  const response = await fetch(`${BASE_URL}/get_all_cases_pagination?${params}`, {
    method: 'GET',
    headers: authHeaders(),
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.detail || 'Failed to fetch cases');
  }

  return data;
}

// PUT /update_caseby_case_id/{case_id} — update an existing case.
export async function updateCaseByCaseId(caseId, payload) {
  const response = await fetch(
    `${BASE_URL}/update_caseby_case_id/${encodeURIComponent(caseId)}`,
    {
      method: 'PUT',
      headers: authHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(payload),
      credentials: 'include',
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.detail || 'Failed to update case');
  }

  return data;
}

// DELETE /delete_case/{case_id}
export async function deleteCase(caseId) {
  const response = await fetch(
    `${BASE_URL}/delete_case/${encodeURIComponent(caseId)}`,
    {
      method: 'DELETE',
      headers: authHeaders(),
      credentials: 'include',
    },
  );

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const detail = Array.isArray(data.detail)
      ? data.detail.map((item) => item.msg || item.message).join(', ')
      : data.detail;
    throw new Error(data.message || detail || 'Failed to delete case');
  }

  return data;
}
