import { getToken } from './token';
import { generateOffenseId, generateSubCategoryId } from '../utils/randomId';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function authHeaders(extra = {}) {
  const token = getToken();
  const headers = { Accept: 'application/json', ...extra };
  if (token && token !== 'session-authenticated') {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

function toApiDateTime(value) {
  if (value instanceof Date) return value.toISOString();
  if (typeof value === 'number') return new Date(value).toISOString();
  if (typeof value === 'string' && value.trim()) {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) return parsed.toISOString();
    return value.trim();
  }
  return new Date().toISOString();
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

export function buildOffenceUpdatePayload(form, meta = {}) {
  const now = toApiDateTime();

  return {
    offense_id: meta.offense_id || '',
    offense_name: form.offenseName?.trim() || '',
    case_assigned_count: meta.case_assigned_count ?? 0,
    system_info: meta.system_info ?? '',
    created_at: meta.created_at ? toApiDateTime(meta.created_at) : now,
    updated_at: now,
    isactive: meta.isactive ?? true,
  };
}

export function mapOffenceToRow(item) {
  return {
    offenseId: item.offense_id,
    offenseName: item.offense_name || '-',
    case_assigned:
      item.case_assigned_count != null ? String(item.case_assigned_count) : '0',
  };
}

export function mapSubCategoryToRow(item) {
  const caseCount =
    item.subcategory_case_assigned_count ?? item.case_assigned_count;

  return {
    subCategoryId: item.sub_category_id || '-',
    subCategoryName: item.sub_category_name || '-',
    case_assigned: caseCount != null ? String(caseCount) : '0',
  };
}

export function buildSubCategoryPayload(offenseId, form) {
  const now = new Date().toISOString();

  return {
    sub_category_id: generateSubCategoryId(),
    offense_id: offenseId,
    sub_category_name: form.subCategoryName?.trim() || '',
    case_assigned_count: 0,
    created_at: now,
    updated_at: now,
    isactive: true,
  };
}

export function validateSubCategoryForm(form) {
  if (!form.subCategoryName?.trim()) return 'Sub-category name is required';
  return null;
}

function normalizeOffenceByIdItems(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.items)) return data.items;
  if (data && typeof data === 'object') return [data];
  return [];
}

export function parseOffenceByIdResponse(data) {
  const items = normalizeOffenceByIdItems(data);
  const first = items[0] || {};

  const subCategories = items
    .filter((item) => item.sub_category_id?.trim() || item.sub_category_name?.trim())
    .map(mapSubCategoryToRow);

  return {
    offenseId: first.offense_id || '',
    offenseName: first.offense_name || 'Offense',
    caseAssignedCount:
      first.offense_case_assigned_count ?? first.case_assigned_count ?? 0,
    subCategories,
  };
}

// GET /get_offence_by_id/{offense_id} — offense details with sub-categories.
export async function getOffenceById(offenseId) {
  const response = await fetch(
    `${BASE_URL}/get_offence_by_id/${encodeURIComponent(offenseId)}`,
    {
      method: 'GET',
      headers: authHeaders(),
      credentials: 'include',
    },
  );

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const detail = Array.isArray(data.detail)
      ? data.detail.map((item) => item.msg || item.message).join(', ')
      : data.detail;
    throw new Error(data.message || detail || 'Failed to fetch offense details');
  }

  return parseOffenceByIdResponse(data);
}

// POST /offense_subcategories — creates a sub-category under an offense.
export async function addSubCategory(offenseId, form) {
  const payload = buildSubCategoryPayload(offenseId, form);

  const response = await fetch(`${BASE_URL}/offense_subcategories`, {
    method: 'POST',
    headers: authHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(payload),
    credentials: 'include',
  });

  const data = await response.json().catch(() => ({}));

  if (data?.sub_category_id || data?.message) {
    return data;
  }

  if (!response.ok) {
    const detail = Array.isArray(data.detail)
      ? data.detail.map((item) => item.msg || item.message).join(', ')
      : data.detail;
    throw new Error(data.message || detail || 'Failed to add sub-category');
  }

  return data;
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

// PUT /update_offence/{offense_id} — update an existing offense.
export async function updateOffence(offenseId, form, meta = {}) {
  const payload = buildOffenceUpdatePayload(form, {
    ...meta,
    offense_id: meta.offense_id || offenseId,
  });

  const response = await fetch(
    `${BASE_URL}/update_offence/${encodeURIComponent(offenseId)}`,
    {
      method: 'PUT',
      headers: authHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(payload),
      credentials: 'include',
    },
  );

  const data = await response.json().catch(() => ({}));

  if (data?.offense_id || data?.message) {
    return data;
  }

  if (!response.ok) {
    const detail = Array.isArray(data.detail)
      ? data.detail.map((item) => item.msg || item.message).join(', ')
      : data.detail;
    throw new Error(data.message || detail || 'Failed to update offense');
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
