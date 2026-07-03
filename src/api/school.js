import { getToken } from './token';

const BASE_URL = import.meta.env.VITE_SCHOOL_API_BASE_URL;

function authHeaders(extra = {}) {
  const token = getToken();
  const headers = { Accept: 'application/json', ...extra };
  if (token && token !== 'session-authenticated') {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

function toApiDateTime(date = new Date()) {
  return date.toISOString().slice(0, 19);
}

// Maps the add-school form state to the POST /add_school payload.
export function buildSchoolPayload(form) {
  const now = toApiDateTime();

  return {
    school_name: form.schoolName?.trim() || '',
    school_logo_url: form.schoolLogoUrl || '',
    school_type: form.schoolType || '',
    school_category: form.schoolCategory || '',
    faculty_count: form.facultyCount ? Number(form.facultyCount) : 0,
    student_count: form.studentCount ? Number(form.studentCount) : 0,
    address: {
      country: form.countryLabel || form.country || '',
      address_line1: form.addressLine1?.trim() || '',
      address_line2: form.addressLine2?.trim() || '',
      landmark: form.landmark?.trim() || '',
      city: form.city?.trim() || '',
      state: form.stateLabel || form.state || '',
      zip: form.zip?.trim() || '',
    },
    principal: {
      first_name: form.principalFirst?.trim() || '',
      last_name: form.principalLast?.trim() || '',
      email: form.principalEmail?.trim() || '',
      phone_code: form.phoneCode || '',
      phone: form.principalPhone?.trim() || '',
    },
    created_at: now,
    updated_at: now,
  };
}

export function validateSchoolForm(form) {
  if (!form.schoolName?.trim()) return 'School name is required';
  if (!form.schoolType) return 'School type is required';
  if (!form.schoolCategory) return 'School category is required';
  if (!form.country && !form.countryLabel?.trim()) return 'Country is required';
  if (!form.addressLine1?.trim()) return 'Address line 1 is required';
  if (!form.city?.trim()) return 'City is required';
  if (!form.state && !form.stateLabel?.trim()) return 'State is required';
  if (!form.zip?.trim()) return 'Zip code is required';
  if (!form.principalFirst?.trim()) return 'Principal first name is required';
  if (!form.principalLast?.trim()) return 'Principal last name is required';
  if (!form.principalEmail?.trim()) return 'Principal email is required';
  return null;
}

export function mapApiSchoolToForm(school, { countryOptions = [], stateOptions = [] } = {}) {
  const address = school.address || {};
  const principal = school.principal || {};

  const countryMatch = countryOptions.find(
    (opt) => opt.label === address.country || opt.value === address.country,
  );
  const stateMatch = stateOptions.find(
    (opt) => opt.label === address.state || opt.value === address.state,
  );

  return {
    schoolName: school.school_name || '',
    schoolType: school.school_type || '',
    schoolCategory: school.school_category || '',
    facultyCount: school.faculty_count != null ? String(school.faculty_count) : '',
    studentCount: school.student_count != null ? String(school.student_count) : '',
    country: countryMatch?.value || '',
    countryLabel: address.country || '',
    addressLine1: address.address_line1 || '',
    addressLine2: address.address_line2 || '',
    landmark: address.landmark || '',
    city: address.city || '',
    state: stateMatch?.value || '',
    stateLabel: address.state || '',
    zip: address.zip || '',
    principalFirst: principal.first_name || '',
    principalLast: principal.last_name || '',
    principalEmail: principal.email || '',
    phoneCode: principal.phone_code || '',
    principalPhone: principal.phone || '',
    logoFile: null,
    schoolLogoUrl: school.school_logo_url || '',
  };
}

export function buildSchoolUpdatePayload(form, meta = {}) {
  const payload = buildSchoolPayload(form);

  return {
    ...payload,
    created_at: meta.created_at ?? payload.created_at,
    updated_at: toApiDateTime(),
    isactive: meta.isactive ?? true,
  };
}

// POST /add_school — creates a new school.
export async function addSchool(form) {
  const payload = buildSchoolPayload(form);

  const response = await fetch(`${BASE_URL}/add_school`, {
    method: 'POST',
    headers: authHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const detail = Array.isArray(data.detail)
      ? data.detail.map((item) => item.msg || item.message).join(', ')
      : data.detail;
    throw new Error(data.message || detail || 'Failed to add school');
  }

  return data;
}

// GET /list_schools — paginated school list for the schools table.
export async function listSchools({ page = 1, pageSize = 10 } = {}) {
  const params = new URLSearchParams({
    page: String(page),
    page_size: String(pageSize),
  });

  const response = await fetch(`${BASE_URL}/list_schools?${params}`, {
    method: 'GET',
    headers: authHeaders(),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const detail = Array.isArray(data.detail)
      ? data.detail.map((item) => item.msg || item.message).join(', ')
      : data.detail;
    throw new Error(data.message || detail || 'Failed to fetch schools');
  }

  return data;
}

// DELETE /delete_school/{school_id}
export async function deleteSchool(schoolId) {
  const response = await fetch(
    `${BASE_URL}/delete_school/${encodeURIComponent(schoolId)}`,
    {
      method: 'DELETE',
      headers: authHeaders(),
    },
  );

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const detail = Array.isArray(data.detail)
      ? data.detail.map((item) => item.msg || item.message).join(', ')
      : data.detail;
    throw new Error(data.message || detail || 'Failed to delete school');
  }

  return data;
}

// GET /get_school/{school_id} — single school details for the view page.
export async function getSchoolById(schoolId) {
  const response = await fetch(
    `${BASE_URL}/get_school/${encodeURIComponent(schoolId)}`,
    {
      method: 'GET',
      headers: authHeaders(),
    },
  );

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const detail = Array.isArray(data.detail)
      ? data.detail.map((item) => item.msg || item.message).join(', ')
      : data.detail;
    throw new Error(data.message || detail || 'Failed to fetch school details');
  }

  return data;
}

// PUT /update_school/{school_id} — update an existing school.
export async function updateSchool(schoolId, form, meta = {}) {
  const payload = buildSchoolUpdatePayload(form, meta);

  const response = await fetch(
    `${BASE_URL}/update_school/${encodeURIComponent(schoolId)}`,
    {
      method: 'PUT',
      headers: authHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(payload),
    },
  );

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const detail = Array.isArray(data.detail)
      ? data.detail.map((item) => item.msg || item.message).join(', ')
      : data.detail;
    throw new Error(data.message || detail || 'Failed to update school');
  }

  return data;
}
