# Case API Schema & Field Reference

This document describes the **Case** data model and the API endpoints the admin
frontend needs (Create / View / Edit / Delete / List). The backend developer can
use this to build the database schema, tables, and API endpoints so the frontend
integration is straightforward.

All field names and types below are taken directly from the frontend code
(`src/context/CaseFormContext.jsx`, the suspect/witness/evidence forms, and
`src/api/cases.js`).

---

## 1. Conventions

- Base URL is configured in the frontend via `VITE_API_BASE_URL`.
- All requests/responses use `application/json` (except image upload which uses `multipart/form-data`).
- Auth: `Authorization: Bearer <token>` header (when a token is present).
- `string` fields default to `""` (empty string) when not filled.
- Nested objects (`schoolmate`, `external_student`, `other`, `physical_details`,
  `vehicle_details`, `other_details`) are **nullable** — only the relevant one is
  populated; the rest are sent as `null`. **The schema MUST allow `null` for these.**
- `age` and `height_cm` may be a `number` or `null`.

---

## 2. Endpoint Summary

| Operation | Method | Endpoint | Purpose |
|---|---|---|---|
| Upload image/file | `POST` | `/upload-image` | Upload a single file, returns hosted URL |
| Create case | `POST` | `/add_case` | Create a new case |
| View single case | `GET` | `/get_case/{case_id}` | Fetch full details of one case |
| Edit/update case | `PUT` | `/update_case/{case_id}` | Update an existing case |
| Delete case | `DELETE` | `/delete_case/{case_id}` | Delete (soft delete) a case |
| List all cases | `GET` | `/list_cases` | Paginated list for the cases table |

---

## 3. Full Case Schema (Create / Edit payload)

This is the complete object sent on **Create** (`POST /add_case`) and **Edit**
(`PUT /update_case/{case_id}`).

```json
{
  "case_id": "string",
  "case_number": "number",
  "case_name": "string",
  "school_id": "string",
  "school_name": "string",
  "offence_category": "string",
  "offence_sub_category": "string",
  "incident_date": "string (YYYY-MM-DD)",
  "incident_time": "string (HH:MM)",
  "location_mode": "string",
  "location_details": {
    "classroom": "boolean",
    "cafeteria": "boolean",
    "playground": "boolean",
    "hallway": "boolean",
    "bathroom": "boolean",
    "bus_area": "boolean",
    "sports_field": "boolean",
    "computer_lab": "boolean",
    "library": "boolean",
    "other": "boolean"
  },
  "location_other_description": "string",
  "incident_grade": "string",
  "anonymity_level": "string",
  "privacy_level": "string",

  "suspects": [
    {
      "do_you_know_the_suspect": "boolean",
      "suspect_relationship_type": "string | null  (schoolmate | external_student | other)",
      "schoolmate": {
        "student_name": "string",
        "student_details": "string"
      },
      "external_student": {
        "school_name": "string",
        "city": "string",
        "state": "string",
        "student_name": "string",
        "grade": "string",
        "gender": "string",
        "student_details": "string",
        "how_suspect_identified": "string"
      },
      "other": {
        "organization": "string",
        "suspect_type": "string",
        "suspect_name": "string",
        "age": "number | null",
        "gender": "string",
        "relationship_to_student": "string",
        "contact_country_code": "string",
        "contact_phone": "string",
        "how_you_know_suspect": "string",
        "was_suspect_on_school_ground": "boolean",
        "where_on_campus_were_they_seen": "string"
      },
      "physical_details": {
        "height_cm": "number | null",
        "build": "string",
        "skin_tone": "string",
        "clothing_type": "string",
        "hair": "string",
        "eyes": "string",
        "mouth": "string",
        "shoulders": "string",
        "hands_and_arms": "string",
        "torso": "string",
        "legs": "string",
        "feet": "string",
        "accessories": "string",
        "additional_info": "string",
        "photo_urls": ["string"]
      },
      "vehicle_details": {
        "vehicle_type": "string",
        "color": "string",
        "brand": "string",
        "model": "string",
        "marking": "string",
        "damage": "string",
        "registration_no": "string",
        "additional_info": "string",
        "direction_of_travel": "string",
        "last_seen_location": "string",
        "image_urls": ["string"]
      },
      "other_details": {
        "description": "string"
      }
    }
  ],

  "witnesses": [
    {
      "do_you_know_the_witness": "boolean",
      "witness_relationship_type": "string | null  (schoolmate | external_student | other)",
      "schoolmate": {
        "student_name": "string",
        "grade": "string",
        "incident_visibility": "string",
        "witness_reliability": "string",
        "observation_description": "string",
        "relationship_to_victim": "string"
      },
      "external_student": {
        "school_name": "string",
        "city": "string",
        "state": "string",
        "grade": "string",
        "gender": "string",
        "age": "number | null",
        "how_witness_identified": "string",
        "student_details": "string"
      },
      "other": {
        "organization": "string",
        "witness_type": "string",
        "witness_name": "string",
        "age": "number | null",
        "gender": "string",
        "relationship_to_student": "string",
        "contact_country_code": "string",
        "contact_phone": "string",
        "connection_to_incident": "string",
        "present_during_incident": "string"
      },
      "physical_details": {
        "height_cm": "number | null",
        "build": "string",
        "skin_tone": "string",
        "clothing_type": "string",
        "hair": "string",
        "eyes": "string",
        "mouth": "string",
        "shoulders": "string",
        "hands_and_arms": "string",
        "torso": "string",
        "legs": "string",
        "feet": "string",
        "accessories": "string",
        "additional_info": "string",
        "photo_urls": ["string"]
      },
      "vehicle_details": {
        "vehicle_type": "string",
        "color": "string",
        "brand": "string",
        "model": "string",
        "marking": "string",
        "damage": "string",
        "registration_no": "string",
        "additional_info": "string",
        "direction_of_travel": "string",
        "last_seen_location": "string",
        "image_urls": ["string"]
      },
      "other_details": {
        "description": "string"
      }
    }
  ],

  "evidence": {
    "has_evidence": "boolean",
    "items": [
      {
        "title": "string",
        "description": "string",
        "file_url": "string",
        "filename": "string",
        "file_type": "string (image | video | audio | document)"
      }
    ]
  },

  "charity": {
    "involvement": "string",
    "charity_name": "string",
    "involvement_type": "string",
    "reason": "string"
  },

  "police": {
    "involvement": "string (default: not_reported)",
    "report_number": "string",
    "officer_name": "string",
    "station_department": "string",
    "date_reported": "string",
    "report_file_urls": ["string"]
  },

  "resolution_desired": "string",

  "image_details": [
    {
      "url": "string",
      "filename": "string",
      "type": "string (physical | vehicle | evidence | police_report)",
      "section": "string (suspect | witness | evidence | police)",
      "index": "number"
    }
  ],

  "created_at": "string (ISO 8601 datetime)",
  "created_by": "string",
  "system_info": "string",
  "system_ip": "string",
  "isactive": "boolean"
}
```

### Suggested database tables

A normalized layout (backend dev can adjust):

- `cases` — top-level case fields + `location_details` (as JSON or flattened) + `charity`, `police`, metadata (`created_at`, `created_by`, `system_info`, `system_ip`, `status`, `isactive`).
- `case_suspects` — one row per suspect, FK `case_id`, with nested objects stored as JSON columns (`schoolmate`, `external_student`, `other`, `physical_details`, `vehicle_details`, `other_details`).
- `case_witnesses` — same pattern as suspects.
- `case_evidence` — one row per evidence item, FK `case_id`.
- `case_images` — one row per `image_details` entry, FK `case_id`.

> If using a document DB (e.g. MongoDB), the whole object above can be stored as a single document.

---

## 4. Create Case

**`POST /add_case`**

- **Body:** the full Case Schema (Section 3).
- **Notes:**
  - If the backend generates `case_id` / `case_number`, ignore them from the
    request and return the generated values.
  - Default `status` to `"Open"` and `isactive` to `true` on create.

**Response `200/201`:**

```json
{
  "message": "Case added successfully",
  "case_id": "CASE-20260627-001",
  "case_number": 100245
}
```

---

## 5. View Single Case

**`GET /get_case/{case_id}`**

Returns the **entire case object** (everything from Section 3) plus server-side
metadata.

**Response `200`:**

```json
{
  "case_id": "CASE-20260627-001",
  "case_number": 100245,
  "status": "Open",
  "...": "all fields from Section 3",
  "created_at": "2026-06-27T15:09:20.837Z",
  "updated_at": "2026-06-27T16:00:00.000Z",
  "created_by": "admin",
  "isactive": true
}
```

**Error `404`:**

```json
{ "detail": "Case not found" }
```

---

## 6. Edit / Update Case

**`PUT /update_case/{case_id}`**

- **Body:** the full Case Schema (Section 3) — same shape as Create, with updated values.
- Backend should update `updated_at`.
- (Optional) Support `PATCH` for partial updates if needed later.

**Response `200`:**

```json
{
  "message": "Case updated successfully",
  "case_id": "CASE-20260627-001"
}
```

---

## 7. Delete Case

**`DELETE /delete_case/{case_id}`**

- Recommended: **soft delete** by setting `isactive = false` (so records are retained).
- Hard delete only if explicitly required.

**Response `200`:**

```json
{
  "message": "Case deleted successfully",
  "case_id": "CASE-20260627-001"
}
```

**Error `404`:**

```json
{ "detail": "Case not found" }
```

---

## 8. List All Cases

**`GET /list_cases`**

Used to populate the cases table. Should return a **summarized** list (not the full
nested objects) for performance, with pagination and search support.

**Query parameters:**

| Param | Type | Description |
|---|---|---|
| `page` | number | Page number (default `1`) |
| `limit` | number | Items per page (default `10`) |
| `search` | string | Filter by case id / offence |
| `status` | string | Optional filter (`Open` / `Closed`) |

**Response `200`:**

```json
{
  "total": 42,
  "page": 1,
  "limit": 10,
  "items": [
    {
      "case_id": "CASE-20260627-001",
      "case_number": 100245,
      "offence_category": "Bullying",
      "offence_sub_category": "Physical Assault",
      "incident_date": "2026-06-24",
      "incident_time": "13:45",
      "status": "Open",
      "isactive": true,
      "created_at": "2026-06-27T15:09:20.837Z"
    }
  ]
}
```

> The cases table currently displays: **Case ID, Offense, Date, Time, Status, Actions**.
> The list fields above cover all of those columns.

---

## 9. Image / File Upload (already implemented)

**`POST /upload-image`**

- **Body:** `multipart/form-data` with a single `file` field.
- **Response:**

```json
{
  "message": "Uploaded",
  "filename": "playground_cctv.mp4",
  "url": "https://example.com/uploads/playground_cctv.mp4"
}
```

The frontend uploads each file first, then puts the returned `url` into the case
payload (`photo_urls`, `image_urls`, `evidence.items[].file_url`, etc.).

---

## 10. Open Decisions for Backend Dev

1. **Who generates `case_id` / `case_number`?** Frontend currently sends them, but
   it is cleaner for the backend to generate and return them.
2. **Nullable nested objects:** `schoolmate`, `external_student`, `other`,
   `physical_details`, `vehicle_details`, `other_details` can be `null` — schema
   must allow this.
3. **`status` field:** not currently sent by the frontend; backend should set
   default `"Open"` and allow updates (`Open` / `Closed`).
4. **`file_type` value format:** frontend sends short types (`image`, `video`,
   `audio`, `document`). Confirm if backend prefers MIME types instead.

---

## 11. Submitted Case View — All Fields

This is the **detail / view page** for a submitted case
(`/cases/case-submitted/{case_id}` → `SubmitedCase.jsx`). It uses the **full case
object** returned by `GET /get_case/{case_id}` (Section 5) plus a few server-managed
fields. Below is the complete list of fields the view needs, grouped by the UI
sections that render them.

### 11.1 Server-managed fields (added on top of Section 3)

| Field | Type | Notes |
|---|---|---|
| `case_id` | string | e.g. `CASE-20260627-001` |
| `case_number` | number | e.g. `100245` |
| `status` | string | `Open` \| `In Progress` \| `Resolved` \| `Closed` |
| `created_at` | string (ISO 8601) | shown as "Created date" + "Creation time" |
| `updated_at` | string (ISO 8601) | last modification time |
| `created_by` | string | reporter / admin identifier |
| `isactive` | boolean | soft-delete flag |

### 11.2 Header block

- `case_id` / `case_number` (title)
- `created_at` (split into created date + creation time)
- `status` (badge: `In Progress` shown red, `Resolved` shown green, etc.)

### 11.3 Incident Details section

- `offence_category`
- `offence_sub_category`
- `incident_date`
- `incident_time`
- `location_mode`
- `location_details` (the 10 booleans)
- `location_other_description`
- `incident_grade`

### 11.4 "Other Details" cards (each opens a detail view / modal)

| Card | Fields shown |
|---|---|
| **Anonymity Level** | `anonymity_level` |
| **Privacy Level** | `privacy_level` |
| **Suspects** | full `suspects[]` array (Section 3) — opens `/cases/submitted-suspect/{case_id}` |
| **Witnesses** | full `witnesses[]` array (Section 3) — opens `/cases/submitted-witness/{case_id}` |
| **Evidence** | full `evidence` object (Section 3) — opens `/cases/submitted-evidence/{case_id}` |
| **Charity** | `charity` object (`involvement`, `charity_name`, `involvement_type`, `reason`) |
| **Police** | `police` object (`involvement`, `report_number`, `officer_name`, `station_department`, `date_reported`, `report_file_urls`) |
| **Resolution** | `resolution_desired` |

### 11.5 Full response example

```json
{
  "case_id": "CASE-20260627-001",
  "case_number": 100245,
  "status": "Resolved",
  "case_name": "Bullying Incident in School Playground",
  "school_id": "SCH-1001",
  "school_name": "Green Valley High School",
  "offence_category": "Bullying",
  "offence_sub_category": "Physical Assault",
  "incident_date": "2026-06-24",
  "incident_time": "13:45",
  "location_mode": "On Campus",
  "location_details": {
    "classroom": false, "cafeteria": false, "playground": true,
    "hallway": false, "bathroom": false, "bus_area": false,
    "sports_field": false, "computer_lab": false, "library": false, "other": false
  },
  "location_other_description": "",
  "incident_grade": "Grade 8",
  "anonymity_level": "Anonymous",
  "privacy_level": "Confidential",
  "suspects": [ "... full suspect objects (Section 3) ..." ],
  "witnesses": [ "... full witness objects (Section 3) ..." ],
  "evidence": { "has_evidence": true, "items": [ "... (Section 3) ..." ] },
  "charity": { "involvement": "No", "charity_name": "", "involvement_type": "", "reason": "" },
  "police": {
    "involvement": "No", "report_number": "", "officer_name": "",
    "station_department": "", "date_reported": "", "report_file_urls": []
  },
  "resolution_desired": "Request disciplinary action and counseling.",
  "image_details": [ "... (Section 3) ..." ],
  "created_at": "2026-06-27T15:09:20.837Z",
  "updated_at": "2026-06-27T16:00:00.000Z",
  "created_by": "teacher.smith@greenvalley.edu",
  "system_info": "Mozilla/5.0 ...",
  "system_ip": "192.168.1.120",
  "isactive": true
}
```

> In short: the **Submitted Case view returns the entire create payload (Section 3)
> back**, plus `status`, `updated_at`. The same response also feeds the
> sub-pages (suspect / witness / evidence detail screens) and the
> charity / police / resolution / anonymity / privacy modals.
