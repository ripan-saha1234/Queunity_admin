import { getToken } from './token';
import { generateCharityId } from '../utils/randomId';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

export function buildCharityPayload(form) {
  const now = toApiDateTime();

  return {
    charity_id: generateCharityId(),
    charity_name: form.charityName?.trim() || '',
    charity_logo_url: form.charityLogoUrl || '',
    description: form.description?.trim() || '',
    charity_type: form.charityType || 'non_profit',
    charity_category: form.charityCategory || '',
    member_count: form.memberCount ? Number(form.memberCount) : 0,
    beneficiary_count: form.beneficiaryCount ? Number(form.beneficiaryCount) : 0,
    address: {
      country: form.countryLabel || form.country || '',
      address_line1: form.addressLine1?.trim() || '',
      address_line2: form.addressLine2?.trim() || '',
      landmark: form.landmark?.trim() || '',
      city: form.city?.trim() || '',
      state: form.stateLabel || form.state || '',
      zip: form.zip?.trim() || '',
    },
    contact_person: {
      first_name: form.contactFirst?.trim() || '',
      last_name: form.contactLast?.trim() || '',
      email: form.contactEmail?.trim() || '',
      phone_code: form.phoneCode || '',
      phone: form.contactPhone?.trim() || '',
    },
    gallery_urls: form.galleryUrls || [],
    document_urls: form.documentUrls || [],
    created_at: now,
    updated_at: now,
    created_by: 'admin',
    isactive: true,
  };
}

export function validateCharityForm(form) {
  if (!form.charityName?.trim()) return 'Charity name is required';
  if (!form.description?.trim()) return 'Description is required';
  if (!form.charityCategory) return 'Charity category is required';
  if (!form.country && !form.countryLabel?.trim()) return 'Country is required';
  if (!form.addressLine1?.trim()) return 'Address line 1 is required';
  if (!form.city?.trim()) return 'City is required';
  if (!form.state && !form.stateLabel?.trim()) return 'State is required';
  if (!form.zip?.trim()) return 'Zip code is required';
  if (!form.contactFirst?.trim()) return 'Contact first name is required';
  if (!form.contactLast?.trim()) return 'Contact last name is required';
  if (!form.contactEmail?.trim()) return 'Contact email is required';
  return null;
}

export function mapApiCharityToForm(charity, { countryOptions = [], stateOptions = [] } = {}) {
  const address = charity.address || {};
  const contact = charity.contact_person || {};

  const countryMatch = countryOptions.find(
    (opt) => opt.label === address.country || opt.value === address.country,
  );
  const stateMatch = stateOptions.find(
    (opt) => opt.label === address.state || opt.value === address.state,
  );

  return {
    charityName: charity.charity_name || '',
    charityType: charity.charity_type || 'non_profit',
    charityCategory: charity.charity_category || '',
    memberCount: charity.member_count != null ? String(charity.member_count) : '',
    beneficiaryCount:
      charity.beneficiary_count != null ? String(charity.beneficiary_count) : '',
    country: countryMatch?.value || '',
    countryLabel: address.country || '',
    addressLine1: address.address_line1 || '',
    addressLine2: address.address_line2 || '',
    landmark: address.landmark || '',
    city: address.city || '',
    state: stateMatch?.value || '',
    stateLabel: address.state || '',
    zip: address.zip || '',
    contactFirst: contact.first_name || '',
    contactLast: contact.last_name || '',
    contactEmail: contact.email || '',
    phoneCode: contact.phone_code || '',
    contactPhone: contact.phone || '',
    description: charity.description || '',
    logoFile: null,
    charityLogoUrl: charity.charity_logo_url || '',
    galleryUrls: charity.gallery_urls || [],
    documentUrls: charity.document_urls || [],
    galleryFiles: [],
    documentFiles: [],
  };
}

export function buildCharityUpdatePayload(form, meta = {}) {
  const payload = buildCharityPayload(form);

  return {
    ...payload,
    charity_id: meta.charity_id || payload.charity_id,
    created_at: meta.created_at ?? payload.created_at,
    updated_at: toApiDateTime(),
    created_by: meta.created_by ?? 'admin',
    isactive: meta.isactive ?? true,
  };
}

// POST /add_charity — creates a new charity.
export async function addCharity(form) {
  const payload = buildCharityPayload(form);

  const response = await fetch(`${BASE_URL}/add_charity`, {
    method: 'POST',
    headers: authHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(payload),
    credentials: 'include',
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const detail = Array.isArray(data.detail)
      ? data.detail.map((item) => item.msg || item.message).join(', ')
      : data.detail;
    throw new Error(data.message || detail || 'Failed to add charity');
  }

  return data;
}

// GET /list_charities — paginated charity list for the charity table.
export async function listCharities({ page = 1, pageSize = 10 } = {}) {
  const params = new URLSearchParams({
    page: String(page),
    page_size: String(pageSize),
  });

  const response = await fetch(`${BASE_URL}/list_charities?${params}`, {
    method: 'GET',
    headers: authHeaders(),
    credentials: 'include',
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const detail = Array.isArray(data.detail)
      ? data.detail.map((item) => item.msg || item.message).join(', ')
      : data.detail;
    throw new Error(data.message || detail || 'Failed to fetch charities');
  }

  return data;
}

// DELETE /delete_charity/{charity_id}
export async function deleteCharity(charityId) {
  const response = await fetch(
    `${BASE_URL}/delete_charity/${encodeURIComponent(charityId)}`,
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
    throw new Error(data.message || detail || 'Failed to delete charity');
  }

  return data;
}

// GET /get_charity/{charity_id} — single charity details for the view page.
export async function getCharityById(charityId) {
  const response = await fetch(
    `${BASE_URL}/get_charity/${encodeURIComponent(charityId)}`,
    {
      method: 'GET',
      headers: authHeaders(),
    },
  );

  const data = await response.json().catch(() => ({}));

  // Backend may return 302 with the charity object still in the body.
  if (data?.charity_id) {
    return data;
  }

  if (!response.ok) {
    const detail = Array.isArray(data.detail)
      ? data.detail.map((item) => item.msg || item.message).join(', ')
      : data.detail;
    throw new Error(data.message || detail || 'Failed to fetch charity details');
  }

  return data;
}

// PUT /update_charity/{charity_id} — update an existing charity.
export async function updateCharity(charityId, form, meta = {}) {
  const payload = buildCharityUpdatePayload(form, {
    ...meta,
    charity_id: charityId,
  });

  const response = await fetch(
    `${BASE_URL}/update_charity/${encodeURIComponent(charityId)}`,
    {
      method: 'PUT',
      headers: authHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(payload),
      credentials: 'include',
    },
  );

  const data = await response.json().catch(() => ({}));

  if (data?.charity_id || data?.message) {
    return data;
  }

  if (!response.ok) {
    const detail = Array.isArray(data.detail)
      ? data.detail.map((item) => item.msg || item.message).join(', ')
      : data.detail;
    throw new Error(data.message || detail || 'Failed to update charity');
  }

  return data;
}
