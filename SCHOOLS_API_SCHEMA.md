# Schools API Schema & Field Reference

This document describes the **School** data model and the API endpoints the admin
frontend needs (Create / View / Edit / Delete / List). The backend developer can
use this to build the database schema, tables, and API endpoints.

Field names below are taken from the frontend code
(`src/pages/schools/add-schools/add-schools.jsx`,
`edit-schools/edit-schools.jsx`, `all-schools/all-schools.jsx`,
`schools-details/schools-details.jsx`).

> NOTE: The frontend forms currently use **camelCase** field names and are not yet
> wired to an API (the Add/Save buttons only navigate). The recommended payload
> below uses **snake_case** to stay consistent with the Cases API. A mapping table
> (frontend → payload) is provided in Section 4 so integration is easy.

---

## 1. Conventions

- Base URL is configured via `VITE_API_BASE_URL`.
- Requests/responses use `application/json` (logo upload uses `multipart/form-data`).
- Auth: `Authorization: Bearer <token>` header when a token is present.
- `string` fields default to `""` when empty.

---

## 2. Endpoint Summary

| Operation | Method | Endpoint | Purpose |
|---|---|---|---|
| Upload logo/file | `POST` | `/upload-image` | Upload school logo, returns hosted URL |
| Create school | `POST` | `/add_school` | Create a new school |
| View single school | `GET` | `/get_school/{school_id}` | Fetch full details of one school |
| Edit/update school | `PUT` | `/update_school/{school_id}` | Update an existing school |
| Delete school | `DELETE` | `/delete_school/{school_id}` | Delete (soft delete) a school |
| List all schools | `GET` | `/list_schools` | Paginated list for the schools table |

---

## 3. Full School Schema (Create / Edit payload)

Sent on **Create** (`POST /add_school`) and **Edit** (`PUT /update_school/{school_id}`).

```json
{
  "school_id": "string",
  "school_name": "string",
  "school_logo_url": "string",
  "school_type": "string (primary | middle | high | k12)",
  "school_category": "string (public | private | charter)",
  "faculty_count": "number",
  "student_count": "number",

  "address": {
    "country": "string",
    "address_line1": "string",
    "address_line2": "string",
    "landmark": "string",
    "city": "string",
    "state": "string",
    "zip": "string"
  },

  "principal": {
    "first_name": "string",
    "last_name": "string",
    "email": "string (email)",
    "phone_code": "string (e.g. +1)",
    "phone": "string"
  },

  "created_at": "string (ISO 8601 datetime)",
  "updated_at": "string (ISO 8601 datetime)",
  
}
```

> The address and principal blocks can be **flat fields** instead of nested objects
> if the backend prefers — see the mapping table for both naming styles.

### Suggested database table (`schools`)

| Column | Type | Notes |
|---|---|---|
| `school_id` | string / PK | e.g. `SC456666` (backend can auto-generate) |
| `school_name` | string | required |
| `school_logo_url` | string | from `/upload-image` |
| `school_type` | enum | `primary` / `middle` / `high` / `k12` |
| `school_category` | enum | `public` / `private` / `charter` |
| `faculty_count` | integer | |
| `student_count` | integer | |
| `country` | string | |
| `address_line1` | string | required |
| `address_line2` | string | |
| `landmark` | string | |
| `city` | string | required |
| `state` | string | required |
| `zip` | string | required |
| `principal_first_name` | string | required |
| `principal_last_name` | string | required |
| `principal_email` | string | required |
| `principal_phone_code` | string | e.g. `+1` |
| `principal_phone` | string | |
| `created_at` | datetime | |
| `updated_at` | datetime | |


---

## 4. Field Mapping (Frontend form → Payload)

| Frontend field (camelCase) | Type | Required | Payload field (snake_case) | Allowed values |
|---|---|---|---|---|
| `schoolName` | text | ✅ | `school_name` | |
| (logo upload) | file | ❌ | `school_logo_url` | hosted URL |
| `schoolType` | radio | ✅ | `school_type` | `primary`, `middle`, `high`, `k12` |
| `schoolCategory` | radio | ✅ | `school_category` | `public`, `private`, `charter` |
| `facultyCount` | number | ❌ | `faculty_count` | |
| `studentCount` | number | ❌ | `student_count` | |
| `country` | select | ✅ | `address.country` | `us` (United States) |
| `addressLine1` | text | ✅ | `address.address_line1` | |
| `addressLine2` | text | ❌ | `address.address_line2` | |
| `landmark` | text | ❌ | `address.landmark` | |
| `city` | text | ✅ | `address.city` | |
| `state` | select | ✅ | `address.state` | `s1`, `s2`, `s3` |
| `zip` | text | ✅ | `address.zip` | |
| `principalFirst` | text | ✅ | `principal.first_name` | |
| `principalLast` | text | ✅ | `principal.last_name` | |
| `principalEmail` | email | ✅ | `principal.email` | |
| `phoneCode` | select | ❌ | `principal.phone_code` | `+1`, `+44`, `+91` |
| `principalPhone` | text | ❌ | `principal.phone` | |

---

## 5. Create School

**`POST /add_school`**

- **Body:** the full School Schema (Section 3).
- Backend may auto-generate `school_id`; default `isactive` to `true`.

**Response `200/201`:**

```json
{
  "message": "School added successfully",
  "school_id": "SC456666"
}
```

---

## 6. View Single School

**`GET /get_school/{school_id}`**

Returns the **entire school object** (Section 3) plus case statistics shown on the
school details page.

**Response `200`:**

```json
{
  "school_id": "SC456666",
  "school_name": "Elite High School",
  "school_logo_url": "https://example.com/logos/elite.png",
  "school_type": "primary",
  "school_category": "public",
  "faculty_count": 20,
  "student_count": 400,
  "address": {
    "country": "United States",
    "address_line1": "1234 Lorem Street",
    "address_line2": "Card Square",
    "landmark": "Near Lorem Park",
    "city": "Card Square",
    "state": "State 1",
    "zip": "78960"
  },
  "principal": {
    "first_name": "Bidisha",
    "last_name": "Bhowmick",
    "email": "bidishabhowmick@gmail.com",
    "phone_code": "+1",
    "phone": "929 329 36456"
  },
  "case_stats": {
    "total_cases": 2847,
    "active_cases": 182,
    "resolved": 2531,
    "pending_review": 134
  },
  "created_at": "2026-06-27T15:09:20.837Z",
  "updated_at": "2026-06-27T16:00:00.000Z",
  "created_by": "admin",
  "isactive": true
}
```

> **`case_stats`** powers the cards on the school details page
> (`Total Cases`, `Active Cases`, `Resolved`, `Pending Review`). The backend should
> compute these from the cases belonging to this school.

**Error `404`:**

```json
{ "detail": "School not found" }
```

---

## 7. Edit / Update School

**`PUT /update_school/{school_id}`**

- **Body:** the full School Schema (Section 3) with updated values.
- Backend should update `updated_at`.

**Response `200`:**

```json
{
  "message": "School updated successfully",
  "school_id": "SC456666"
}
```

---

## 8. Delete School

**`DELETE /delete_school/{school_id}`**

- Recommended: **soft delete** (`isactive = false`).

**Response `200`:**

```json
{
  "message": "School deleted successfully",
  "school_id": "SC456666"
}
```

---

## 9. List All Schools

**`GET /list_schools`**

Populates the schools table. Columns shown: **School Name (+ id + logo), Principal
Name, Email, Phone, Actions**.

**Query parameters:**

| Param | Type | Description |
|---|---|---|
| `page` | number | Page number (default `1`) |
| `limit` | number | Items per page (default `10`) |
| `search` | string | Filter by school name / principal / email / phone |

**Response `200`:**

```json
{
  "total": 25,
  "page": 1,
  "limit": 10,
  "items": [
    {
      "school_id": "SC456666",
      "school_name": "Elite High School",
      "school_logo_url": "https://example.com/logos/elite.png",
      "principal_name": "Bidisha Bhowmick",
      "email": "bidishabhowmick@gmail.com",
      "phone": "+1 1234567890"
    }
  ]
}
```

> `principal_name` here is the full name (first + last) for table display, and
> `phone` is the combined `phone_code + phone`. Backend can either store these
> combined or concatenate them in the list response.

---

## 10. Logo / File Upload (already implemented)

**`POST /upload-image`** — `multipart/form-data` with a `file` field.

```json
{
  "message": "Uploaded",
  "filename": "elite-logo.png",
  "url": "https://example.com/logos/elite-logo.png"
}
```

The frontend uploads the logo first, then sends the returned `url` as
`school_logo_url` in the school payload.

---

## 11. Open Decisions for Backend Dev

1. **Who generates `school_id`?** Frontend shows ids like `SC456666`; cleaner for
   the backend to generate and return them.
2. **Nested vs flat:** `address` and `principal` are shown as nested objects here,
   but can be flat columns/fields — confirm preference (mapping table covers both).
3. **`country` / `state` values:** frontend currently uses codes (`us`, `s1`, `s2`,
   `s3`). Decide whether to store codes or full names, and align the dropdown
   option lists with the backend.
4. **`case_stats`:** computed values for the details page — confirm the exact
   definitions of `active_cases` vs `pending_review`.
