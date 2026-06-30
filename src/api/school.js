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
  if (!form.country) return 'Country is required';
  if (!form.addressLine1?.trim()) return 'Address line 1 is required';
  if (!form.city?.trim()) return 'City is required';
  if (!form.state) return 'State is required';
  if (!form.zip?.trim()) return 'Zip code is required';
  if (!form.principalFirst?.trim()) return 'Principal first name is required';
  if (!form.principalLast?.trim()) return 'Principal last name is required';
  if (!form.principalEmail?.trim()) return 'Principal email is required';
  return null;
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
