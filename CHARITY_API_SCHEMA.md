# Charity API Schema & Field Reference

This document describes the **Charity** data model and the API endpoints the admin
frontend needs (Create / View / Edit / Delete / List + View Cases). The backend
developer can use this to build the database schema, tables, and API endpoints.

Field names below are taken from the frontend code
(`src/pages/charity-section/add-charity/add-charity.jsx`,
`edit-charity/edit-charity.jsx`, `all-charity/all-charity.jsx`,
`chairty-details/charity-details.jsx`,
`view-cases-charity/view-cases-chairty.jsx`).

> NOTE: The frontend forms currently use **camelCase** field names and are not yet
> wired to an API (the Add/Save buttons only navigate). The recommended payload
> below uses **snake_case** to stay consistent with the Cases & Schools APIs. A
> mapping table (frontend → payload) is provided in Section 4.

---

## 1. Conventions

- Base URL is configured via `VITE_API_BASE_URL`.
- Requests/responses use `application/json` (logo / gallery / document uploads use `multipart/form-data`).
- Auth: `Authorization: Bearer <token>` header when a token is present.
- `string` fields default to `""` when empty.

---

## 2. Endpoint Summary

| Operation | Method | Endpoint | Purpose |
|---|---|---|---|
| Upload logo/gallery/doc | `POST` | `/upload-image` | Upload a file, returns hosted URL |
| Create charity | `POST` | `/add_charity` | Create a new charity |
| View single charity | `GET` | `/get_charity/{charity_id}` | Fetch full details of one charity |
| Edit/update charity | `PUT` | `/update_charity/{charity_id}` | Update an existing charity |
| Delete charity | `DELETE` | `/delete_charity/{charity_id}` | Delete (soft delete) a charity |
| List all charities | `GET` | `/list_charities` | Paginated list for the charity table |
| View cases of charity | `GET` | `/list_cases?charity_id={charity_id}` | Cases linked to a charity |

---

## 3. Full Charity Schema (Create / Edit payload)

Sent on **Create** (`POST /add_charity`) and **Edit** (`PUT /update_charity/{charity_id}`).

```json
{
  "charity_id": "string",
  "charity_name": "string",
  "charity_logo_url": "string",
  "description": "string",
  "charity_type": "string (e.g. non_profit)",
  "charity_category": "string (public | private | community)",
  "member_count": "number",
  "beneficiary_count": "number",

  "address": {
    "country": "string",
    "address_line1": "string",
    "address_line2": "string",
    "landmark": "string",
    "city": "string",
    "state": "string",
    "zip": "string"
  },

  "contact_person": {
    "first_name": "string",
    "last_name": "string",
    "email": "string (email)",
    "phone_code": "string (e.g. +1)",
    "phone": "string"
  },

  "gallery_urls": ["string"],
  "document_urls": ["string"],

  "created_at": "string (ISO 8601 datetime)",
  "updated_at": "string (ISO 8601 datetime)",
  "created_by": "string",
  "isactive": "boolean"
}
```

> The `address` and `contact_person` blocks can be **flat fields** instead of nested
> objects if the backend prefers — see the mapping table for both naming styles.

### Suggested database tables

**`charities`**

| Column | Type | Notes |
|---|---|---|
| `charity_id` | string / PK | e.g. `CH456666` (backend can auto-generate) |
| `charity_name` | string | required |
| `charity_logo_url` | string | from `/upload-image` |
| `description` | text | mission / description (required) |
| `charity_type` | string | e.g. `non_profit` |
| `charity_category` | enum | `public` / `private` / `community` |
| `member_count` | integer | number of team members |
| `beneficiary_count` | integer | number of beneficiaries |
| `country` | string | |
| `address_line1` | string | required |
| `address_line2` | string | |
| `landmark` | string | |
| `city` | string | required |
| `state` | string | required |
| `zip` | string | required |
| `contact_first_name` | string | required |
| `contact_last_name` | string | required |
| `contact_email` | string | required |
| `contact_phone_code` | string | e.g. `+1` |
| `contact_phone` | string | |
| `created_at` | datetime | |
| `updated_at` | datetime | |
| `created_by` | string | |
| `isactive` | boolean | soft-delete flag |

**`charity_gallery`** — one row per image (`charity_id` FK, `url`).
**`charity_documents`** — one row per certificate/registration file (`charity_id` FK, `url`).

> If using a document DB, store `gallery_urls` and `document_urls` as arrays on the charity document.

---

## 4. Field Mapping (Frontend form → Payload)

| Frontend field (camelCase) | Type | Required | Payload field (snake_case) | Allowed values |
|---|---|---|---|---|
| `charityName` | text | ✅ | `charity_name` | |
| (logo upload) | file | ❌ | `charity_logo_url` | hosted URL |
| `description` | textarea | ✅ | `description` | |
| `charityType` | (state) | ❌ | `charity_type` | `non_profit` (shown on details page) |
| `charityCategory` | radio | ✅ | `charity_category` | `public`, `private`, `community` |
| `memberCount` | number | ❌ | `member_count` | (Team Members) |
| `beneficiaryCount` | number | ❌ | `beneficiary_count` | (Beneficiaries) |
| `country` | select | ✅ | `address.country` | `us` (United States) |
| `addressLine1` | text | ✅ | `address.address_line1` | |
| `addressLine2` | text | ❌ | `address.address_line2` | |
| `landmark` | text | ❌ | `address.landmark` | |
| `city` | text | ✅ | `address.city` | |
| `state` | select | ✅ | `address.state` | `s1`, `s2`, `s3` |
| `zip` | text | ✅ | `address.zip` | |
| `contactFirst` | text | ✅ | `contact_person.first_name` | |
| `contactLast` | text | ✅ | `contact_person.last_name` | |
| `contactEmail` | email | ✅ | `contact_person.email` | |
| `phoneCode` | select | ❌ | `contact_person.phone_code` | `+1`, `+44`, `+91` |
| `contactPhone` | text | ❌ | `contact_person.phone` | |
| (gallery upload) | file[] | ❌ | `gallery_urls` | array of hosted URLs |
| (document upload) | file[] | ❌ | `document_urls` | array of hosted URLs |

> **Note:** `charityType`, `memberCount`, and `beneficiaryCount` exist in the form
> state and are shown on the details page (`Charity Type`, `Number of Team Members`,
> `Number of Beneficiaries`), but their input fields are not rendered in the current
> Add form. Keep them in the schema — the frontend will populate them.

---

## 5. Create Charity

**`POST /add_charity`**

- **Body:** the full Charity Schema (Section 3).
- Backend may auto-generate `charity_id`; default `isactive` to `true`.

**Response `200/201`:**

```json
{
  "message": "Charity added successfully",
  "charity_id": "CH456666"
}
```

---

## 6. View Single Charity

**`GET /get_charity/{charity_id}`**

Returns the **entire charity object** (Section 3). Powers the charity details page
(detail cards, description/mission, gallery, documents).

**Response `200`:**

```json
{
  "charity_id": "CH456666",
  "charity_name": "Hope Foundation",
  "charity_logo_url": "https://example.com/logos/hope.png",
  "description": "Hope Foundation is a non-profit organization that helps the needy.",
  "charity_type": "non_profit",
  "charity_category": "public",
  "member_count": 20,
  "beneficiary_count": 400,
  "address": {
    "country": "United States",
    "address_line1": "1234 Lorem Street",
    "address_line2": "Card Square",
    "landmark": "Near Lorem Park",
    "city": "Card Square",
    "state": "State 1",
    "zip": "78960"
  },
  "contact_person": {
    "first_name": "Bidisha",
    "last_name": "Bhowmick",
    "email": "bidishabhowmick@gmail.com",
    "phone_code": "+1",
    "phone": "929 329 36456"
  },
  "gallery_urls": [
    "https://example.com/gallery/hope1.jpg",
    "https://example.com/gallery/hope2.jpg"
  ],
  "document_urls": [
    "https://example.com/docs/registration.pdf"
  ],
  "created_at": "2026-06-27T15:09:20.837Z",
  "updated_at": "2026-06-27T16:00:00.000Z",
  "created_by": "admin",
  "isactive": true
}
```

**Error `404`:**

```json
{ "detail": "Charity not found" }
```

### Details page field mapping

| Details card | API field |
|---|---|
| Charity ID | `charity_id` |
| Charity Type | `charity_type` |
| Document | `document_urls` |
| Number of Team Members | `member_count` |
| Number of Beneficiaries | `beneficiary_count` |
| Country | `address.country` |
| Address | `address.*` (combined) |
| Phone number | `contact_person.phone_code` + `contact_person.phone` |
| Description or Mission | `description` |
| Gallery | `gallery_urls` |

---

## 7. Edit / Update Charity

**`PUT /update_charity/{charity_id}`**

- **Body:** the full Charity Schema (Section 3) with updated values.
- Backend should update `updated_at`.

**Response `200`:**

```json
{
  "message": "Charity updated successfully",
  "charity_id": "CH456666"
}
```

---

## 8. Delete Charity

**`DELETE /delete_charity/{charity_id}`**

- Recommended: **soft delete** (`isactive = false`).

**Response `200`:**

```json
{
  "message": "Charity deleted successfully",
  "charity_id": "CH456666"
}
```

---

## 9. List All Charities

**`GET /list_charities`**

Populates the charity table. Columns shown: **Charity Name (+ id + logo), Contact
Name, Email, Phone, Actions**.

**Query parameters:**

| Param | Type | Description |
|---|---|---|
| `page` | number | Page number (default `1`) |
| `limit` | number | Items per page (default `10`) |
| `search` | string | Filter by charity name / contact / email / phone |

**Response `200`:**

```json
{
  "total": 6,
  "page": 1,
  "limit": 10,
  "items": [
    {
      "charity_id": "CH456666",
      "charity_name": "Hope Foundation",
      "charity_logo_url": "https://example.com/logos/hope.png",
      "contact_name": "Bidisha Bhowmick",
      "email": "bidishabhowmick@gmail.com",
      "phone": "+1 1234567890"
    }
  ]
}
```

> `contact_name` is the full contact person name (first + last) for table display,
> and `phone` is the combined `phone_code + phone`.

---

## 10. View Cases of a Charity

**`GET /list_cases?charity_id={charity_id}`**

Clicking **View Cases** on the charity details page navigates to
`/charity/details/{charity_id}/view-cases` (`ViewCasesChairty.jsx`) and shows a
table of all cases linked to that charity.

This reuses the **Cases list endpoint** (see `CASE_API_SCHEMA.md` Section 8), just
with a `charity_id` filter — **not a new endpoint**.

**Query parameters:** `charity_id` (required), `page`, `limit`, `search`.

**Response — same shape as the cases list:**

```json
{
  "total": 6,
  "page": 1,
  "limit": 10,
  "items": [
    {
      "case_id": "CASE-20260627-001",
      "case_number": 100245,
      "offence_category": "Offense 1",
      "incident_date": "2025-10-27",
      "incident_time": "10:07 AM",
      "status": "Open"
    }
  ]
}
```

**Column mapping (table → API):**

| Table column | API field |
|---|---|
| Cases ID | `case_id` (or `case_number`) |
| Offense | `offence_category` |
| Date | `incident_date` |
| Time | `incident_time` |
| Status | `status` |

**Row actions:** View → `GET /get_case/{case_id}`; Edit → `PUT /update_case/{case_id}`;
Delete → `DELETE /delete_case/{case_id}`.

---

## 11. Logo / Gallery / Document Upload (already implemented)

**`POST /upload-image`** — `multipart/form-data` with a `file` field.

```json
{
  "message": "Uploaded",
  "filename": "hope-logo.png",
  "url": "https://example.com/logos/hope-logo.png"
}
```

The frontend uploads each file first, then sends the returned `url`(s) as
`charity_logo_url`, `gallery_urls[]`, or `document_urls[]` in the charity payload.

---

## 12. Open Decisions for Backend Dev

1. **Who generates `charity_id`?** Frontend shows ids like `CH456666`; cleaner for
   the backend to generate and return them.
2. **Nested vs flat:** `address` and `contact_person` shown as nested objects here,
   but can be flat columns/fields — confirm preference (mapping table covers both).
3. **`country` / `state` values:** frontend uses codes (`us`, `s1`, `s2`, `s3`).
   Decide whether to store codes or full names, and align dropdown options.
4. **`charity_type` field:** present in form state (`non_profit`) and shown on the
   details page, but no input renders it yet. Confirm the allowed values.
5. **Case ↔ Charity link:** the case payload already has a `charity` object
   (`involvement`, `charity_name`, ...). Decide how a case is associated to a
   charity record (e.g. store `charity_id` on the case) so `/list_cases?charity_id=`
   works.
