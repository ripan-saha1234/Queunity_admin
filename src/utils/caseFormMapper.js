const EMPTY_LOCATION_DETAILS = {
  classroom: false,
  cafeteria: false,
  playground: false,
  hallway: false,
  bathroom: false,
  bus_area: false,
  sports_field: false,
  computer_lab: false,
  library: false,
  other: false,
};

const EMPTY_CHARITY = {
  involvement: '',
  charity_name: '',
  involvement_type: '',
  reason: '',
};

const EMPTY_POLICE = {
  involvement: 'not_reported',
  report_number: '',
  officer_name: '',
  station_department: '',
  date_reported: '',
  report_file_urls: [],
};

/** Maps GET /get_allcases/{id} response into CaseFormContext caseData shape. */
export function mapApiCaseToCaseData(api = {}) {
  return {
    case_name: api.case_name || '',
    school_id: api.school_id || '',
    school_name: api.school_name || '',
    offence_category: api.offence_category || '',
    offence_sub_category: api.offence_sub_category || '',
    incident_date: api.incident_date || '',
    incident_time: api.incident_time || '',
    location_mode: api.location_mode || '',
    location_details: {
      ...EMPTY_LOCATION_DETAILS,
      ...(api.location_details || {}),
    },
    location_other_description: api.location_other_description || '',
    incident_grade: api.incident_grade || '',
    anonymity_level: api.anonymity_level || '',
    privacy_level: api.privacy_level || '',
    suspects: Array.isArray(api.suspects) ? api.suspects : [],
    witnesses: Array.isArray(api.witnesses) ? api.witnesses : [],
    evidence: {
      has_evidence: Boolean(api.evidence?.has_evidence),
      items: Array.isArray(api.evidence?.items) ? api.evidence.items : [],
    },
    charity: {
      ...EMPTY_CHARITY,
      ...(api.charity || {}),
    },
    police: {
      ...EMPTY_POLICE,
      ...(api.police || {}),
    },
    resolution_desired: api.resolution_desired || '',
  };
}

/** Maps API case into step-0 local form fields used by add-cases.jsx. */
export function mapApiCaseToStepFormData(api = {}) {
  const schoolId = api.school_id || '';
  const isOther = schoolId === 'other';

  return {
    caseId: api.case_id || '',
    caseName: api.case_name || '',
    school: schoolId,
    schoolName: isOther ? api.school_name || '' : '',
    incidentDetails: '',
    offenceCategory: api.offence_category || '',
    offenceSubCategory: api.offence_sub_category || '',
    incidentDate: api.incident_date || '',
    incidentTime: api.incident_time || '',
    locationMode: api.location_mode || '',
    locationDetails: {
      ...EMPTY_LOCATION_DETAILS,
      ...(api.location_details || {}),
    },
    description: api.location_other_description || '',
    grade: api.incident_grade || '',
    anonymityLevel: api.anonymity_level || '',
    privacyLevel: api.privacy_level || '',
  };
}

/** Server-managed fields preserved on update. */
export function mapApiCaseToEditMeta(api = {}) {
  return {
    case_id: api.case_id || '',
    case_number: api.case_number ?? null,
    created_at: api.created_at || new Date().toISOString(),
    created_by: api.created_by || 'admin',
    isactive: api.isactive ?? true,
  };
}
