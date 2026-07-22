import { getToken } from './token';
import { listRoles, mapRoleToRow } from './roles';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function authHeaders(extra = {}) {
  const token = getToken();
  const headers = { Accept: 'application/json', ...extra };
  if (token && token !== 'session-authenticated') {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

function parseErrorDetail(data) {
  if (Array.isArray(data?.detail)) {
    return data.detail.map((item) => item.msg || item.message).join(', ');
  }
  return data?.detail;
}

export function buildStaffPayload(form) {
  return {
    first_name: form.firstName?.trim() || '',
    last_name: form.lastName?.trim() || '',
    email: form.email?.trim() || '',
    phone_code: form.phoneCode || '',
    phone: form.phone?.trim() || '',
    role_id: form.role || form.roleId || '',
    photo_url: form.photoUrl || '',
    isactive: true,
  };
}

export function buildStaffUpdatePayload(form, meta = {}) {
  return {
    first_name: form.firstName?.trim() || '',
    last_name: form.lastName?.trim() || '',
    email: form.email?.trim() || '',
    phone_code: form.phoneCode || '',
    phone: form.phone?.trim() || '',
    role_id: form.role || form.roleId || meta.role_id || '',
    photo_url: form.photoUrl ?? meta.photo_url ?? '',
    isactive: meta.isactive ?? true,
  };
}

export function validateStaffForm(form) {
  if (!form.firstName?.trim()) return 'First name is required';
  if (!form.lastName?.trim()) return 'Last name is required';
  if (!form.email?.trim()) return 'Email is required';
  if (!form.phone?.trim()) return 'Phone number is required';
  if (!form.role?.trim() && !form.roleId?.trim()) return 'Role is required';
  return null;
}

export function mapStaffToRow(item) {
  const staffId = item.staff_id || item.staffId || '';
  const firstName = item.first_name || item.firstName || '';
  const lastName = item.last_name || item.lastName || '';
  const fullName =
    item.staff_name ||
    `${firstName} ${lastName}`.trim() ||
    '-';
  const phoneCode = item.phone_code || item.phoneCode || '';
  const phoneNumber = item.phone || item.phoneNumber || '';
  const phoneDisplay =
    item.phone_display ||
    [phoneCode, phoneNumber].filter(Boolean).join(' ').trim() ||
    '-';

  return {
    staffId,
    companyName: {
      name: fullName,
      id: staffId ? `#${staffId}` : '',
    },
    role: item.role_name || item.role || '-',
    roleId: item.role_id || item.roleId || '',
    email: item.email || '-',
    phone: phoneDisplay,
    phoneCode,
    phoneNumber,
    firstName,
    lastName,
    photoUrl: item.photo_url || item.photoUrl || '',
    isactive: item.isactive ?? true,
  };
}

export async function listStaffs({ page = 1, pageSize = 10 } = {}) {
  const params = new URLSearchParams({
    page: String(page),
    page_size: String(pageSize),
  });

  const response = await fetch(
    `${BASE_URL}/get_all_staff_pagination?${params}`,
    {
      method: 'GET',
      headers: authHeaders(),
      credentials: 'include',
    },
  );

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.message || parseErrorDetail(data) || 'Failed to fetch staff',
    );
  }

  const items =
    data.data ??
    data.items ??
    data.staff_list ??
    data.staffs ??
    (Array.isArray(data) ? data : []);
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

export async function getStaffById(staffId) {
  const params = new URLSearchParams({
    staff_id: String(staffId),
  });

  const response = await fetch(`${BASE_URL}/get_staff?${params}`, {
    method: 'GET',
    headers: authHeaders(),
    credentials: 'include',
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.message || parseErrorDetail(data) || 'Failed to fetch staff details',
    );
  }

  if (!data || data === null || (typeof data === 'object' && !data.staff_id && !data.first_name && !data.email)) {
    throw new Error('Staff not found');
  }

  return data;
}

async function resolveStaffRoleName(staffData, roleNameFallback = '') {
  if (staffData?.role_name) return staffData.role_name;
  if (staffData?.role) return staffData.role;
  if (roleNameFallback) return roleNameFallback;

  const roleId = staffData?.role_id || staffData?.roleId;
  if (!roleId) return '';

  try {
    const response = await listRoles({ page: 1, pageSize: 100 });
    const match = (response.data ?? []).find(
      (item) => (item.role_id || item.roleId) === roleId,
    );
    return match ? mapRoleToRow(match).role : '';
  } catch {
    return '';
  }
}

export async function getStaffDetails(staffId, { roleNameFallback } = {}) {
  const data = await getStaffById(staffId);
  const role_name = await resolveStaffRoleName(data, roleNameFallback);
  return mapStaffToRow({ ...data, role_name });
}

export async function addStaff(form) {
  const payload = buildStaffPayload(form);

  const response = await fetch(`${BASE_URL}/add_staff`, {
    method: 'POST',
    headers: authHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(payload),
    credentials: 'include',
  });

  const data = await response.json().catch(() => ({}));

  if (data?.staff_id || data?.message) {
    return data;
  }

  if (!response.ok) {
    throw new Error(
      data.message || parseErrorDetail(data) || 'Failed to add staff',
    );
  }

  return data;
}

export async function updateStaff(staffId, form, meta = {}) {
  const payload = buildStaffUpdatePayload(form, {
    ...meta,
    role_id: meta.role_id || form.role || form.roleId,
  });

  const response = await fetch(
    `${BASE_URL}/update_staff/${encodeURIComponent(staffId)}`,
    {
      method: 'PUT',
      headers: authHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(payload),
      credentials: 'include',
    },
  );

  const data = await response.json().catch(() => ({}));

  if (data?.staff_id || data?.message) {
    return data;
  }

  if (!response.ok) {
    throw new Error(
      data.message || parseErrorDetail(data) || 'Failed to update staff',
    );
  }

  return data;
}

export async function deleteStaff(staffId) {
  const response = await fetch(
    `${BASE_URL}/delete_staff/{staff_id?staff_id=${encodeURIComponent(staffId)}`,
    {
      method: 'DELETE',
      headers: authHeaders(),
      credentials: 'include',
    },
  );

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.message || parseErrorDetail(data) || 'Failed to delete staff',
    );
  }

  if (data.status === false) {
    throw new Error(data.message || 'Failed to delete staff');
  }

  return data;
}
