# Staffs API Schema & Field Reference

This document describes the **Staff** and **Role** data models and the API endpoints
the admin frontend needs (Create / View / Edit / Delete / List). The backend developer
can use this to build the database schema, tables, and API endpoints.

Field names below are taken from the frontend code:

- `src/pages/staffs/all-staffs/all-staffs.jsx`
- `src/pages/staffs/roles/roles.jsx`
- `src/Modals/StaffModals/AddStaffModal.jsx`
- `src/Modals/StaffModals/EditStaffModal.jsx`
- `src/Modals/StaffModals/ViewStaffModal.jsx`
- `src/Modals/StaffModals/AddRoleModal.jsx`
- `src/Modals/StaffModals/EditRoleModal.jsx`
- `src/Modals/StaffModals/ConfirmDeleteModal.jsx`

> NOTE: The Staffs and Roles pages currently use **local mock data** and are not yet
> wired to an API. The recommended payloads below use **snake_case** to stay consistent
> with the Cases / Schools / Charity / Offense APIs. A mapping table (frontend → payload)
> is provided in Section 5 so integration is easy.

---

## 1. Conventions

- Base URL is configured via `VITE_API_BASE_URL` (or a dedicated `VITE_STAFF_API_BASE_URL`
  if the staff service is separate).
- Requests/responses use `application/json` (staff photo upload uses `multipart/form-data`
  via the shared `/upload-image` endpoint).
- Auth: `Authorization: Bearer <token>` header when a token is present.
- `string` fields default to `""` when empty.
- Staff IDs shown in the UI look like `ST456666`; role IDs look like `RL1`. The backend
  should generate and return these.

---

## 2. Endpoint Summary

### Staff

| Operation | Method | Endpoint | Purpose |
|---|---|---|---|
| Upload staff photo | `POST` | `/upload-image` | Upload staff image, returns hosted URL |
| Create staff | `POST` | `/add_staff` | Create a new staff member |
| View single staff | `GET` | `/get_staff/{staff_id}` | Fetch full details of one staff member |
| Edit/update staff | `PUT` | `/update_staff/{staff_id}` | Update an existing staff member |
| Delete staff | `DELETE` | `/delete_staff/{staff_id}` | Delete (soft delete) a staff member |
| List all staff | `GET` | `/list_staffs` | Paginated list for the staffs table |

### Roles

| Operation | Method | Endpoint | Purpose |
|---|---|---|---|
| Create role | `POST` | `/add_role` | Create a new role with permissions |
| View single role | `GET` | `/get_role/{role_id}` | Fetch one role + permission rows |
| Edit/update role | `PUT` | `/update_role/{role_id}` | Update role name and permissions |
| Delete role | `DELETE` | `/delete_role/{role_id}` | Delete (soft delete) a role |
| List all roles | `GET` | `/list_roles` | Paginated list for the roles table |
| List roles (dropdown) | `GET` | `/list_roles?dropdown=true` | Lightweight list for Add/Edit Staff role select |

---

## 3. Full Staff Schema (Create / Edit payload)

Sent on **Create** (`POST /add_staff`) and **Edit** (`PUT /update_staff/{staff_id}`).

```json
{
  "staff_id": "string",
  "first_name": "string",
  "last_name": "string",
  "email": "string (email)",
  "phone_code": "string (e.g. +1)",
  "phone": "string",
  "role_id": "string",
  "photo_url": "string",
  "created_at": "string (ISO 8601 datetime)",
  "updated_at": "string (ISO 8601 datetime)",
  "isactive": "boolean"
}
```

### Suggested database table (`staffs`)

| Column | Type | Notes |
|---|---|---|
| `staff_id` | string / PK | e.g. `ST456666` (backend can auto-generate) |
| `first_name` | string | required |
| `last_name` | string | required |
| `email` | string | required, unique recommended |
| `phone_code` | string | e.g. `+1`, `+44`, `+91` |
| `phone` | string | required |
| `role_id` | string / FK | references `roles.role_id` |
| `photo_url` | string | from `/upload-image` |
| `created_at` | datetime | |
| `updated_at` | datetime | |
| `isactive` | boolean | soft-delete flag |

---

## 4. Full Role Schema (Create / Edit payload)

Sent on **Create** (`POST /add_role`) and **Edit** (`PUT /update_role/{role_id}`).

```json
{
  "role_id": "string",
  "role_name": "string",
  "permission_rows": [
    {
      "module": "string (Schools | CMS | Offense | Camera)",
      "add": "boolean",
      "edit": "boolean",
      "view": "boolean",
      "delete": "boolean"
    }
  ],
  "created_at": "string (ISO 8601 datetime)",
  "updated_at": "string (ISO 8601 datetime)",
  "isactive": "boolean"
}
```

### Suggested database tables

**`roles`**

| Column | Type | Notes |
|---|---|---|
| `role_id` | string / PK | e.g. `RL1` (backend can auto-generate) |
| `role_name` | string | required, unique recommended |
| `created_at` | datetime | |
| `updated_at` | datetime | |
| `isactive` | boolean | soft-delete flag |

**`role_permissions`**

| Column | Type | Notes |
|---|---|---|
| `id` | integer / PK | auto-increment |
| `role_id` | string / FK | references `roles.role_id` |
| `module` | string | `Schools`, `CMS`, `Offense`, or `Camera` |
| `can_add` | boolean | maps to `add` |
| `can_edit` | boolean | maps to `edit` |
| `can_view` | boolean | maps to `view` |
| `can_delete` | boolean | maps to `delete` |

> A role can have **multiple permission rows** (one per module). The frontend allows
> adding/removing rows in the Add/Edit Role modals.

---

## 5. Field Mapping (Frontend form → Payload)

### Staff — Add / Edit modal

| Frontend field (camelCase) | Type | Required | Payload field (snake_case) | Allowed values / notes |
|---|---|---|---|---|
| `firstName` | text | ✅ | `first_name` | |
| `lastName` | text | ✅ | `last_name` | |
| `email` | email | ✅ | `email` | |
| `phoneCode` | select | ✅ | `phone_code` | `+1`, `+44`, `+91` |
| `phone` | text | ✅ | `phone` | |
| `role` | select | ✅ | `role_id` | frontend currently uses `role1` / `role2` / `role3` as placeholder values; should be replaced with real `role_id` from `GET /list_roles` |
| `imageFiles` | file[] | ❌ | `photo_url` | upload via `/upload-image` first, then send URL |

### Staff — List table display fields

The staffs table (`all-staffs.jsx`) expects each row shaped like this for rendering:

| Frontend table field | Source from API | Notes |
|---|---|---|
| `staffId` | `staff_id` | row key for actions |
| `companyName.name` | `first_name` + `last_name` | full display name (legacy key name in UI) |
| `companyName.id` | `#` + `staff_id` | e.g. `#ST456666` |
| `role` | `role_name` | resolved from `role_id` join |
| `email` | `email` | |
| `phone` | `phone_code` + ` ` + `phone` | combined for display, e.g. `+1 923 245 6980` |

### Staff — View modal

| Frontend field | Source from API |
|---|---|
| `staff.companyName.name` | `first_name` + `last_name` |
| `staff.companyName.id` | `#` + `staff_id` |
| `staff.phone` | `phone_code` + ` ` + `phone` |
| `staff.email` | `email` |
| `staff.role` | `role_name` |
| `staff.photoUrl` | `photo_url` |

### Role — Add / Edit modal

| Frontend field (camelCase) | Type | Required | Payload field (snake_case) | Allowed values |
|---|---|---|---|---|
| `roleName` | select | ✅ | `role_name` | e.g. `Role 1`, `Role 2`, `Role 3`, `Role 4` |
| `permissionRows` | array | ✅ | `permission_rows` | see below |
| `permissionRows[].module` | select | ✅ | `permission_rows[].module` | `Schools`, `CMS`, `Offense`, `Camera` |
| `permissionRows[].add` | checkbox | ❌ | `permission_rows[].add` | boolean |
| `permissionRows[].edit` | checkbox | ❌ | `permission_rows[].edit` | boolean |
| `permissionRows[].view` | checkbox | ❌ | `permission_rows[].view` | boolean |
| `permissionRows[].delete` | checkbox | ❌ | `permission_rows[].delete` | boolean |

### Role — List table display fields

| Frontend table field | Source from API | Notes |
|---|---|---|
| `roleId` | `role_id` | row key for actions |
| `role` | `role_name` | |
| `permissions` | derived string | pipe-separated module names, e.g. `Schools \| CMS \| Offense` |
| `permissionRows` | `permission_rows` | full array for edit modal pre-fill |

> The frontend builds the `permissions` display string by joining module names with
> ` | `. The backend can either return a pre-built `permissions` string or let the
> frontend derive it from `permission_rows`.

---

## 6. Create Staff

**`POST /add_staff`**

- **Body:** Staff Schema (Section 3), excluding `staff_id` if backend auto-generates it.
- Upload photo first via `POST /upload-image`, then pass returned `url` as `photo_url`.
- Backend should validate that `role_id` exists and is active.

**Request example:**

```json
{
  "first_name": "Bidisha",
  "last_name": "Bhowmick",
  "email": "bidishabhowmick@gmail.com",
  "phone_code": "+1",
  "phone": "923 245 6980",
  "role_id": "RL1",
  "photo_url": "https://example.com/staff/bidisha.png"
}
```

**Response `200/201`:**

```json
{
  "message": "Staff added successfully",
  "staff_id": "ST456666"
}
```

---

## 7. View Single Staff

**`GET /get_staff/{staff_id}`**

Returns the full staff object for the View Staff modal.

**Response `200`:**

```json
{
  "staff_id": "ST456666",
  "first_name": "Bidisha",
  "last_name": "Bhowmick",
  "email": "bidishabhowmick@gmail.com",
  "phone_code": "+1",
  "phone": "923 245 6980",
  "role_id": "RL1",
  "role_name": "Role 1",
  "photo_url": "https://example.com/staff/bidisha.png",
  "created_at": "2026-06-27T15:09:20.837Z",
  "updated_at": "2026-06-27T16:00:00.000Z",
  "isactive": true
}
```

**Error `404`:**

```json
{ "detail": "Staff not found" }
```

---

## 8. Edit / Update Staff

**`PUT /update_staff/{staff_id}`**

- **Body:** Staff Schema (Section 3) with updated values.
- Backend should update `updated_at`.
- If a new photo is uploaded, frontend sends the new `photo_url`; omit or keep existing
  URL if unchanged.

**Response `200`:**

```json
{
  "message": "Staff updated successfully",
  "staff_id": "ST456666"
}
```

---

## 9. Delete Staff

**`DELETE /delete_staff/{staff_id}`**

- Recommended: **soft delete** (`isactive = false`).
- Frontend shows a confirmation modal before calling this endpoint.

**Response `200`:**

```json
{
  "message": "Staff deleted successfully",
  "staff_id": "ST456666"
}
```

---

## 10. List All Staff

**`GET /list_staffs`**

Populates the staffs table. Columns shown: **Staff Name (+ id), Role, Email, Phone,
Actions** (View / Edit / Delete).

**Query parameters:**

| Param | Type | Description |
|---|---|---|
| `page` | number | Page number (default `1`) |
| `page_size` / `limit` | number | Items per page (default `10`) |
| `search` | string | Filter by staff name / role / email / phone |

**Response `200`:**

```json
{
  "total": 25,
  "page": 1,
  "page_size": 10,
  "items": [
    {
      "staff_id": "ST456666",
      "first_name": "Somali",
      "last_name": "Goswami",
      "staff_name": "Somali Goswami",
      "role_id": "RL1",
      "role_name": "Role 1",
      "email": "bidishabhhowmick@gmail.com",
      "phone_code": "+1",
      "phone": "1234567890",
      "phone_display": "+1 1234567890",
      "photo_url": "https://example.com/staff/somali.png"
    }
  ]
}
```

> `staff_name` and `phone_display` are convenience fields for the table. The frontend
> can also build them from `first_name` + `last_name` and `phone_code` + `phone`.

---

## 11. Create Role

**`POST /add_role`**

- **Body:** Role Schema (Section 4), excluding `role_id` if backend auto-generates it.
- At least one `permission_rows` entry is expected.

**Request example:**

```json
{
  "role_name": "Role 1",
  "permission_rows": [
    {
      "module": "Schools",
      "add": true,
      "edit": false,
      "view": true,
      "delete": false
    },
    {
      "module": "CMS",
      "add": true,
      "edit": true,
      "view": true,
      "delete": false
    }
  ]
}
```

**Response `200/201`:**

```json
{
  "message": "Role added successfully",
  "role_id": "RL1"
}
```

---

## 12. View Single Role

**`GET /get_role/{role_id}`**

Returns the full role object for the Edit Role modal.

**Response `200`:**

```json
{
  "role_id": "RL1",
  "role_name": "Role 1",
  "permission_rows": [
    {
      "module": "Schools",
      "add": true,
      "edit": false,
      "view": true,
      "delete": false
    }
  ],
  "permissions": "Schools",
  "created_at": "2026-06-27T15:09:20.837Z",
  "updated_at": "2026-06-27T16:00:00.000Z",
  "isactive": true
}
```

**Error `404`:**

```json
{ "detail": "Role not found" }
```

---

## 13. Edit / Update Role

**`PUT /update_role/{role_id}`**

- **Body:** Role Schema (Section 4) with updated values.
- Backend should replace `permission_rows` for the role (delete old rows, insert new ones).

**Response `200`:**

```json
{
  "message": "Role updated successfully",
  "role_id": "RL1"
}
```

---

## 14. Delete Role

**`DELETE /delete_role/{role_id}`**

- Recommended: **soft delete** (`isactive = false`).
- Backend should reject deletion if staff members are still assigned to this role, or
  reassign them first.

**Response `200`:**

```json
{
  "message": "Role deleted successfully",
  "role_id": "RL1"
}
```

**Error `409` (role in use):**

```json
{
  "detail": "Cannot delete role: staff members are still assigned to this role"
}
```

---

## 15. List All Roles

**`GET /list_roles`**

Populates the roles table. Columns shown: **Role, Permissions, Actions** (Edit / Delete).

**Query parameters:**

| Param | Type | Description |
|---|---|---|
| `page` | number | Page number (default `1`) |
| `page_size` / `limit` | number | Items per page (default `10`) |
| `search` | string | Filter by role name / permissions text |
| `dropdown` | boolean | If `true`, return a lightweight list for staff role dropdowns |

**Response `200` (table list):**

```json
{
  "total": 4,
  "page": 1,
  "page_size": 10,
  "items": [
    {
      "role_id": "RL1",
      "role_name": "Role 1",
      "permissions": "Schools | CMS | Offense",
      "permission_rows": [
        {
          "module": "Schools",
          "add": true,
          "edit": false,
          "view": true,
          "delete": false
        }
      ]
    }
  ]
}
```

**Response `200` (dropdown — `?dropdown=true`):**

```json
{
  "items": [
    { "role_id": "RL1", "role_name": "Role 1" },
    { "role_id": "RL2", "role_name": "Role 2" },
    { "role_id": "RL3", "role_name": "Role 3" }
  ]
}
```

---

## 16. Staff Photo Upload (shared endpoint)

**`POST /upload-image`** — `multipart/form-data` with a `file` field.

Used by Add/Edit Staff modals before create/update.

**Validation (frontend):**

- Allowed types: **PNG**, **JPEG**
- Max size per file: **200 KB**

**Response `200`:**

```json
{
  "message": "Uploaded",
  "filename": "staff-photo.png",
  "url": "https://example.com/staff/staff-photo.png"
}
```

The frontend uploads the image first, then sends the returned `url` as `photo_url` in
the staff payload.

---

## 17. Frontend Routes (for context)

| Route | Page | Purpose |
|---|---|---|
| `/staffs` | All Staffs | Staff list + Add / View / Edit / Delete |
| `/roles` | Roles | Role list + Add / Edit / Delete |

After login, the app navigates to `/staffs` (`authentication.jsx`).

---

## 18. Open Decisions for Backend Dev

1. **Who generates `staff_id` / `role_id`?** Frontend mock data uses `ST456666` and
   `RL1`; cleaner for the backend to generate and return them.
2. **`role_name` vs free-text:** The Add/Edit Role modal currently uses a fixed dropdown
   (`Role 1`–`Role 4`). Confirm whether role names are free-text or from a predefined
   list.
3. **Permission modules:** Current modules are `Schools`, `CMS`, `Offense`, `Camera`.
   Confirm the full list and whether new modules can be added without a frontend change.
4. **Delete role with assigned staff:** Block delete, soft-delete only, or cascade /
   reassign — confirm business rule.
5. **Staff login / auth:** Staff members may need credentials for admin access. If so,
   clarify whether `POST /add_staff` should also create a user account (email + password)
   or link to an existing `users` table.
6. **`companyName` in frontend:** The staff table uses `companyName` as the display-name
   key (historical naming). API should use `first_name` / `last_name` / `staff_name`; the
   frontend mapper will translate.
7. **Search & filter:** Search is currently client-side. The filter icon on both pages is
   not wired yet — confirm if server-side filters (by role, date, status) are needed.
