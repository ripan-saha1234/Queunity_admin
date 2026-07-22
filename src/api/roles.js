import { getToken } from './token';
import { generateRoleId } from '../utils/randomId';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function authHeaders(extra = {}) {
  const token = getToken();
  const headers = { Accept: 'application/json', ...extra };
  if (token && token !== 'session-authenticated') {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

function normalizePermissionRows(rows = []) {
  return rows
    .filter((row) => row?.module)
    .map((row) => ({
      module: String(row.module).trim(),
      add: !!row.add,
      edit: !!row.edit,
      view: !!row.view,
      delete: !!row.delete,
    }));
}

function toPermissionsText(rows = []) {
  return rows
    .map((row) => row.module)
    .filter(Boolean)
    .join(' | ');
}

function parseErrorDetail(data) {
  if (Array.isArray(data?.detail)) {
    return data.detail.map((item) => item.msg || item.message).join(', ');
  }
  return data?.detail;
}

export function buildRolePayload(form) {
  return {
    role_id: generateRoleId(),
    role_name: form.roleName?.trim() || '',
    permission_rows: normalizePermissionRows(form.permissionRows),
    isactive: true,
  };
}

export function buildRoleUpdatePayload(form, meta = {}) {
  return {
    role_id: meta.role_id || '',
    role_name: form.roleName?.trim() || '',
    permission_rows: normalizePermissionRows(form.permissionRows),
    isactive: meta.isactive ?? true,
  };
}

export function validateRoleForm(form) {
  if (!form.roleName?.trim()) return 'Role name is required';
  const rows = normalizePermissionRows(form.permissionRows);
  if (rows.length === 0) return 'At least one permission with a module is required';
  return null;
}

export function mapRoleToRow(item) {
  const permissionRows = Array.isArray(item.permission_rows)
    ? item.permission_rows
    : Array.isArray(item.permissionRows)
      ? item.permissionRows
      : [];

  return {
    roleId: item.role_id || item.roleId || '',
    role: item.role_name || item.role || '-',
    permissionRows,
    permissions:
      item.permissions || toPermissionsText(permissionRows) || '-',
    isactive: item.isactive ?? true,
  };
}

export async function listRoles({ page = 1, pageSize = 10 } = {}) {
  const params = new URLSearchParams({
    page: String(page),
    page_size: String(pageSize),
  });

  const response = await fetch(`${BASE_URL}/list_roles?${params}`, {
    method: 'GET',
    headers: authHeaders(),
    credentials: 'include',
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.message || parseErrorDetail(data) || 'Failed to fetch roles',
    );
  }

  const items = data.data ?? data.items ?? [];
  const total = data.total ?? items.length;
  const pages =
    data.pages ??
    data.total_pages ??
    (pageSize > 0 ? Math.ceil(total / pageSize) : 0);

  return {
    data: items,
    total,
    pages,
    page: data.page ?? page,
  };
}

export async function addRole(form) {
  const payload = buildRolePayload(form);

  const response = await fetch(`${BASE_URL}/add_roles`, {
    method: 'POST',
    headers: authHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(payload),
    credentials: 'include',
  });

  const data = await response.json().catch(() => ({}));

  if (data?.role_id || data?.message) {
    return data;
  }

  if (!response.ok) {
    throw new Error(
      data.message || parseErrorDetail(data) || 'Failed to add role',
    );
  }

  return data;
}

export async function updateRole(roleId, form, meta = {}) {
  const payload = buildRoleUpdatePayload(form, {
    ...meta,
    role_id: meta.role_id || roleId,
  });

  const response = await fetch(
    `${BASE_URL}/update_role/${encodeURIComponent(roleId)}`,
    {
      method: 'PUT',
      headers: authHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(payload),
      credentials: 'include',
    },
  );

  const data = await response.json().catch(() => ({}));

  if (data?.role_id || data?.message) {
    return data;
  }

  if (!response.ok) {
    throw new Error(
      data.message || parseErrorDetail(data) || 'Failed to update role',
    );
  }

  return data;
}

export async function deleteRole(roleId) {
  const response = await fetch(
    `${BASE_URL}/delete_role/${encodeURIComponent(roleId)}`,
    {
      method: 'DELETE',
      headers: authHeaders(),
      credentials: 'include',
    },
  );

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.message || parseErrorDetail(data) || 'Failed to delete role',
    );
  }

  return data;
}
