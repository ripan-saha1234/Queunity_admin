# Offense API Schema & Field Reference

This document describes the **Offense** module data model and the API endpoints the
admin frontend needs. The Offense module is a hierarchy:

```
Offense (category)
  └── Sub-Category
        └── Question Set  (Investigation Question Sets)
              └── Question  (single_choice | multi_choice | dropdown | descriptive | file_upload)
                    └── Option  (for choice / dropdown questions)
```

Field names below are taken from the frontend code
(`src/pages/cases/Offense/Offense.jsx`,
`Offense/SingleOffense/SingleOffense.jsx`,
`Offense/SingleOffense/CreateQuestionSet.jsx`,
`Offense/SingleOffense/ViewQuestion.jsx`,
`src/Modals/CaseModals/AddOffenceModal.jsx`, `EditOffenceModal.jsx`,
`src/Modals/OffenceModals/*`).

> NOTE: The frontend is not yet wired to an API (Add/Save/Create buttons only
> toggle modals or navigate). The recommended payloads below use **snake_case** to
> stay consistent with the Cases / Schools / Charity APIs.

---

## 1. Conventions

- Base URL is configured via `VITE_API_BASE_URL`.
- Requests/responses use `application/json`.
- Auth: `Authorization: Bearer <token>` header when a token is present.
- `string` fields default to `""` when empty.
- The Offense `offense_name` maps to the case payload's `offence_category`, and the
  Sub-Category `sub_category_name` maps to `offence_sub_category`
  (see `CASE_API_SCHEMA.md`).

---

## 2. Endpoint Summary

### Offense (category)

| Operation | Method | Endpoint | Purpose |
|---|---|---|---|
| Create offense | `POST` | `/add_offense` | Add a new offense |
| View single offense | `GET` | `/get_offense/{offense_id}` | Fetch one offense + sub-categories |
| Edit offense | `PUT` | `/update_offense/{offense_id}` | Rename an offense |
| Delete offense | `DELETE` | `/delete_offense/{offense_id}` | Delete an offense |
| List offenses | `GET` | `/list_offenses` | Table list (name + case count) |

### Sub-Category

| Operation | Method | Endpoint | Purpose |
|---|---|---|---|
| Create sub-category | `POST` | `/add_subcategory` | Add a sub-category to an offense |
| Edit sub-category | `PUT` | `/update_subcategory/{sub_category_id}` | Rename a sub-category |
| Delete sub-category | `DELETE` | `/delete_subcategory/{sub_category_id}` | Delete a sub-category |
| List sub-categories | `GET` | `/list_subcategories?offense_id={offense_id}` | Sub-categories of an offense |

### Question Set / Questions

| Operation | Method | Endpoint | Purpose |
|---|---|---|---|
| Create question set | `POST` | `/add_question_set` | Create a set with questions |
| View question set | `GET` | `/get_question_set/{question_set_id}` | Fetch a set + questions |
| Edit question set | `PUT` | `/update_question_set/{question_set_id}` | Update set + questions |
| Delete question set | `DELETE` | `/delete_question_set/{question_set_id}` | Delete a set |
| List question sets | `GET` | `/list_question_sets?offense_id={offense_id}` | Sets for an offense / sub-category |

---

## 3. Offense (Category) Schema

### Create / Edit payload

`POST /add_offense` and `PUT /update_offense/{offense_id}`:

```json
{
  "offense_name": "string"
}
```

### DB table (`offenses`)

| Column | Type | Notes |
|---|---|---|
| `offense_id` | string / PK | backend can auto-generate |
| `offense_name` | string | required, unique |
| `case_assigned_count` | integer | computed: number of cases using this offense |
| `created_at` | datetime | |
| `updated_at` | datetime | |
| `isactive` | boolean | soft-delete flag |

### List response — `GET /list_offenses`

Table columns: **Offense Name, No of cases assigned, Actions**.

```json
{
  "total": 6,
  "page": 1,
  "limit": 10,
  "items": [
    {
      "offense_id": "OFF-001",
      "offense_name": "Offense 1",
      "case_assigned_count": 5
    }
  ]
}
```

**Create response:**

```json
{ "message": "Offense added successfully", "offense_id": "OFF-001" }
```

---

## 4. Sub-Category Schema

A sub-category belongs to an offense. The single-offense page lists sub-categories
in a table with the same columns (name + cases assigned).

### Create / Edit payload

`POST /add_subcategory`:

```json
{
  "offense_id": "OFF-001",
  "sub_category_name": "string"
}
```

`PUT /update_subcategory/{sub_category_id}`:

```json
{
  "sub_category_name": "string"
}
```

### DB table (`offense_subcategories`)

| Column | Type | Notes |
|---|---|---|
| `sub_category_id` | string / PK | backend can auto-generate |
| `offense_id` | string / FK | parent offense |
| `sub_category_name` | string | required |
| `case_assigned_count` | integer | computed |
| `created_at` | datetime | |
| `updated_at` | datetime | |
| `isactive` | boolean | soft-delete flag |

### List response — `GET /list_subcategories?offense_id={offense_id}`

```json
{
  "offense_id": "OFF-001",
  "items": [
    {
      "sub_category_id": "SUB-001",
      "offense_id": "OFF-001",
      "sub_category_name": "Offense 1",
      "case_assigned_count": 5
    }
  ]
}
```

---

## 5. Question Set & Question Schema

Investigation Question Sets group questions (e.g. `Identifying info`,
`Suspect Details`, `Witness Details`). Each question has a **type** and, for choice
/ dropdown types, a list of **options**.

### Question types

| Type value | UI label | Has options? | Extra fields |
|---|---|---|---|
| `single_choice` | Single Choice | ✅ | — |
| `multi_choice` | Multi-Choice | ✅ | — |
| `dropdown` | Dropdown | ✅ | — |
| `descriptive` | Descriptive | ❌ | — |
| `file_upload` | File Upload | ❌ | `allowed_file_formats[]` (`pdf`, `jpg`, `png`, `jpeg`) |

### Create / Edit payload

`POST /add_question_set` and `PUT /update_question_set/{question_set_id}`:

```json
{
  "offense_id": "OFF-001",
  "sub_category_id": "SUB-001",
  "name": "Suspect Details",
  "questions": [
    {
      "question_text": "Did you see the suspect?",
      "type": "single_choice",
      "required": true,
      "order": 1,
      "options": [
        { "text": "Yes", "order": 1 },
        { "text": "No", "order": 2 }
      ],
      "allowed_file_formats": []
    },
    {
      "question_text": "Describe what happened",
      "type": "descriptive",
      "required": true,
      "order": 2,
      "options": [],
      "allowed_file_formats": []
    },
    {
      "question_text": "Upload any evidence",
      "type": "file_upload",
      "required": false,
      "order": 3,
      "options": [],
      "allowed_file_formats": ["pdf", "jpg", "png", "jpeg"]
    }
  ]
}
```

> `sub_category_id` may be `null` if question sets are attached directly to an
> offense rather than a sub-category — confirm the desired level (see Open
> Decisions).

### DB tables

**`question_sets`**

| Column | Type | Notes |
|---|---|---|
| `question_set_id` | string / PK | |
| `offense_id` | string / FK | parent offense |
| `sub_category_id` | string / FK \| null | optional parent sub-category |
| `name` | string | e.g. "Suspect Details" |
| `order` | integer | display order |
| `created_at` / `updated_at` | datetime | |
| `isactive` | boolean | |

**`questions`**

| Column | Type | Notes |
|---|---|---|
| `question_id` | string / PK | |
| `question_set_id` | string / FK | parent set |
| `question_text` | string | required |
| `type` | enum | `single_choice` / `multi_choice` / `dropdown` / `descriptive` / `file_upload` |
| `required` | boolean | |
| `order` | integer | display order |
| `allowed_file_formats` | string[] / JSON | only for `file_upload` |

**`question_options`**

| Column | Type | Notes |
|---|---|---|
| `option_id` | string / PK | |
| `question_id` | string / FK | parent question |
| `text` | string | option label |
| `order` | integer | display order |

> If using a document DB, store `questions[]` (with nested `options[]`) inside the
> question set document.

### View response — `GET /get_question_set/{question_set_id}`

Returns the set with nested questions and options (same shape as the create
payload, plus ids):

```json
{
  "question_set_id": "QS-001",
  "offense_id": "OFF-001",
  "sub_category_id": "SUB-001",
  "name": "Suspect Details",
  "questions": [
    {
      "question_id": "Q-001",
      "question_text": "Did you see the suspect?",
      "type": "single_choice",
      "required": true,
      "order": 1,
      "options": [
        { "option_id": "OPT-001", "text": "Yes", "order": 1 },
        { "option_id": "OPT-002", "text": "No", "order": 2 }
      ],
      "allowed_file_formats": []
    }
  ]
}
```

### List response — `GET /list_question_sets?offense_id={offense_id}`

```json
{
  "offense_id": "OFF-001",
  "items": [
    { "question_set_id": "QS-001", "name": "Identifying info", "question_count": 3 },
    { "question_set_id": "QS-002", "name": "Suspect Details", "question_count": 5 },
    { "question_set_id": "QS-003", "name": "Witness Details", "question_count": 4 }
  ]
}
```

---

## 6. Field Mapping (Frontend → Payload)

| UI element | Where | Payload field |
|---|---|---|
| Offense Name | Add/Edit Offense modal | `offense_name` |
| Sub-Category Name | Add Sub-Category modal | `sub_category_name` |
| Question Set Name | Create Question Set page | `name` |
| Question | question modals | `questions[].question_text` |
| Option 1 / 2 / 3 ... | single/multi/dropdown modals | `questions[].options[].text` |
| File format checkboxes (pdf/jpg/png/jpeg) | File Upload modal | `questions[].allowed_file_formats[]` |
| Question type (button used) | Create Question Set page | `questions[].type` |

---

## 7. Open Decisions for Backend Dev

1. **Question set level:** Question sets currently appear under an offense
   (`/single-offense/{id}` → View Question). Decide whether a set belongs to the
   **offense** or to a **sub-category** (schema supports both via
   `offense_id` + optional `sub_category_id`).
2. **`case_assigned_count`:** computed value (how many cases use this offense /
   sub-category) — confirm exact definition.
3. **ID generation:** frontend uses ids like `OFF-001` only as examples; backend
   can generate its own format.
4. **Offense ↔ Case link:** the case payload stores `offence_category` /
   `offence_sub_category` as **strings**. Decide whether to also store
   `offense_id` / `sub_category_id` on the case so `case_assigned_count` and
   filtering are reliable.
5. **Multiple options:** the "Add Option" button allows a variable number of
   options — the `options[]` array should accept any length (min 2 for
   choice/dropdown recommended).
