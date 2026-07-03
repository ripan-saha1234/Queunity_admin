import { getToken } from './token';
import { generateOffenseId } from '../utils/randomId';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function authHeaders(extra = {}) {
  const token = getToken();
  const headers = { Accept: 'application/json', ...extra };
  if (token && token !== 'session-authenticated') {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

export function buildOffencePayload(form) {
  const now = new Date().toISOString();

  return {
    offense_id: generateOffenseId(),
    offense_name: form.offenseName?.trim() || '',
    case_assigned_count: 0,
    system_info: form.systemInfo?.trim() || '',
    created_at: now,
    updated_at: now,
    isactive: true,
  };
}

export function validateOffenceForm(form) {
  if (!form.offenseName?.trim()) return 'Offense name is required';
  return null;
}

export function mapOffenceToRow(item) {
  return {
    offenseId: item.offense_id,
    offenseName: item.offense_name || '-',
    case_assigned:
      item.case_assigned_count != null ? String(item.case_assigned_count) : '0',
  };
}

// GET /get_offence_pagination — paginated offense list for the table.
export async function listOffences({ page = 1, pageSize = 10 } = {}) {
  const params = new URLSearchParams({
    page: String(page),
    page_size: String(pageSize),
  });

  const response = await fetch(`${BASE_URL}/get_offence_pagination?${params}`, {
    method: 'GET',
    headers: authHeaders(),
    credentials: 'include',
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const detail = Array.isArray(data.detail)
      ? data.detail.map((item) => item.msg || item.message).join(', ')
      : data.detail;
    throw new Error(data.message || detail || 'Failed to fetch offenses');
  }

  return data;
}

// POST /add_offence — creates a new offense category.
export async function addOffence(form) {
  const payload = buildOffencePayload(form);

  const response = await fetch(`${BASE_URL}/add_offence`, {
    method: 'POST',
    headers: authHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(payload),
    credentials: 'include',
  });

  const data = await response.json().catch(() => ({}));

  if (data?.offense_id || data?.message) {
    return data;
  }

  if (!response.ok) {
    const detail = Array.isArray(data.detail)
      ? data.detail.map((item) => item.msg || item.message).join(', ')
      : data.detail;
    throw new Error(data.message || detail || 'Failed to add offense');
  }

  return data;
}

// DELETE /delete_offence/{offense_id}
export async function deleteOffence(offenseId) {
  const response = await fetch(
    `${BASE_URL}/delete_offence/${encodeURIComponent(offenseId)}`,
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
    throw new Error(data.message || detail || 'Failed to delete offense');
  }

  return data;
}
