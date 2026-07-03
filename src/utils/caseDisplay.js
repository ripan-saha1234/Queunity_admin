import { charityInvolvementTypeOptions } from '../pages/cases/add-cases/options';

export const RESOLUTION_LABELS = {
  school_discretion: 'School administration may handle it at their discretion.',
  discipline_per_policy: 'I want the student disciplined according to the school conduct policy.',
  class_wide_intervention:
    'I do not want the student to be disciplined, but I would like a class-wide intervention (without identifying anyone).',
  discipline_and_restorative:
    'I want the student to be disciplined and have a restorative circle.',
};

export const RESOLUTION_NOTES = {
  school_discretion: 'Note: Restorative circle or conference',
  discipline_per_policy: 'Note: No restorative justice required',
  class_wide_intervention:
    'Note: School is doing an announcement to all the students (classroom or entire school)',
  discipline_and_restorative: 'Note: Restorative circle & justice required',
};

const ANONYMITY_LABELS = {
  complete_anonymous: 'Complete anonymous',
  student_subject_only: 'Student subject only',
  hide_from_parents: 'Hide from parents',
  no_hide_identity: "Student don't want to hide identity",
};

const PRIVACY_LABELS = {
  level_1: 'Level 1 (Default)',
  level_2: 'Level 2',
};

const PRIVACY_NOTES = {
  level_1: 'Note: Only principal',
  level_2: 'Note: Principal + School representative + Counsellor',
};

const CHARITY_INVOLVEMENT_LABELS = {
  already_informed: 'Already informed',
  inform_now: 'Inform now',
  maybe_later: 'Maybe later',
  no: 'No',
};

const POLICE_INVOLVEMENT_LABELS = {
  already_reported: 'Already reported to police',
  maybe_later: 'Maybe later',
  not_reported: 'Not reported',
};

const LOCATION_LABELS = {
  classroom: 'Classroom',
  cafeteria: 'Cafeteria',
  playground: 'Playground',
  hallway: 'Hallway',
  bathroom: 'Bathroom',
  bus_area: 'Bus area',
  sports_field: 'Sports field',
  computer_lab: 'Computer lab',
  library: 'Library',
  other: 'Other',
};

const RELATIONSHIP_LABELS = {
  schoolmate: 'Schoolmate',
  external_student: 'External',
  other: 'Other',
};

const CHARITY_TYPE_LABELS = Object.fromEntries(
  charityInvolvementTypeOptions.map((opt) => [opt.value, opt.label]),
);

export const humanize = (value) =>
  !value
    ? '-'
    : String(value)
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());

export function formatIncidentDate(dateStr) {
  if (!dateStr?.trim()) return '-';
  const [year, month, day] = dateStr.split('-');
  if (!year || !month || !day) return dateStr;
  return `${day}/${month}/${year}`;
}

export function formatIncidentTime(timeStr) {
  if (!timeStr?.trim()) return '-';
  const [hours, minutes] = timeStr.split(':').map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return timeStr;
  const period = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 || 12;
  return `${hour12}:${String(minutes).padStart(2, '0')} ${period}`;
}

export function formatCreatedAt(value) {
  if (!value) return { date: '-', time: '-' };

  const trimmed = String(value).trim();
  const [datePart, timePart] = trimmed.split(/\s+/);

  if (datePart && timePart && /^\d{4}-\d{2}-\d{2}$/.test(datePart)) {
    return {
      date: formatIncidentDate(datePart),
      time: formatIncidentTime(timePart),
    };
  }

  const date = new Date(trimmed);
  if (Number.isNaN(date.getTime())) return { date: '-', time: '-' };

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const period = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;

  return {
    date: `${day}/${month}/${year}`,
    time: `${hours}:${minutes} ${period}`,
  };
}

export function formatLocationDetails(locationDetails, otherDescription) {
  if (!locationDetails) return '-';

  const selected = Object.entries(locationDetails)
    .filter(([key, value]) => value && key !== 'other')
    .map(([key]) => LOCATION_LABELS[key] || humanize(key));

  if (locationDetails.other) {
    selected.push(otherDescription?.trim() || 'Other');
  }

  return selected.length ? selected.join(', ') : '-';
}

export function getAnonymityLabel(value) {
  return ANONYMITY_LABELS[value] || humanize(value);
}

export function getPrivacyDisplay(value) {
  return {
    title: PRIVACY_LABELS[value] || humanize(value),
    note: PRIVACY_NOTES[value] || '',
  };
}

export function getCharityInvolvementLabel(value) {
  return CHARITY_INVOLVEMENT_LABELS[value] || humanize(value);
}

export function getCharityTypeLabel(value) {
  return CHARITY_TYPE_LABELS[value] || humanize(value);
}

export function getPoliceInvolvementLabel(value) {
  return POLICE_INVOLVEMENT_LABELS[value] || humanize(value);
}

export function getResolutionDisplay(value) {
  return {
    title: RESOLUTION_LABELS[value] || humanize(value),
    note: RESOLUTION_NOTES[value] || '',
  };
}

export function buildIncidentDetails(caseData) {
  if (!caseData) return [];

  return [
    { title: 'Case Name', para: caseData.case_name || '-' },
    { title: 'School', para: caseData.school_name || humanize(caseData.school_id) },
    { title: 'Offence Category', para: humanize(caseData.offence_category) },
    { title: 'Offence Sub-Category', para: humanize(caseData.offence_sub_category) },
    { title: 'Incident Date', para: formatIncidentDate(caseData.incident_date) },
    { title: 'Incident Time', para: formatIncidentTime(caseData.incident_time) },
    { title: 'Location', para: humanize(caseData.location_mode) },
    {
      title: 'Location Details',
      para: formatLocationDetails(
        caseData.location_details,
        caseData.location_other_description,
      ),
    },
    { title: 'Grade', para: humanize(caseData.incident_grade) },
  ];
}

function buildSuspectDetails(suspect) {
  if (suspect.do_you_know_the_suspect) {
    const type = RELATIONSHIP_LABELS[suspect.suspect_relationship_type] || 'Known';
    const details = [{ label: 'Type', value: type }];

    if (suspect.suspect_relationship_type === 'schoolmate' && suspect.schoolmate) {
      details.push({ label: 'Student Name', value: suspect.schoolmate.student_name || '-' });
    } else if (suspect.suspect_relationship_type === 'external_student' && suspect.external_student) {
      details.push({ label: 'Student Name', value: suspect.external_student.student_name || '-' });
      details.push({ label: 'School', value: suspect.external_student.school_name || '-' });
    } else if (suspect.suspect_relationship_type === 'other' && suspect.other) {
      details.push({ label: 'Suspect Name', value: suspect.other.suspect_name || '-' });
      details.push({ label: 'Organization', value: suspect.other.organization || '-' });
    }
    return details;
  }

  const details = [];
  if (suspect.physical_details) {
    details.push({
      label: 'Physical Details',
      value: `Height - ${suspect.physical_details.height_cm || '-'}cm | Build - ${suspect.physical_details.build || '-'}`,
    });
  }
  if (suspect.vehicle_details) {
    details.push({
      label: 'Vehicle Details',
      value: `Type - ${suspect.vehicle_details.vehicle_type || '-'}, Color - ${suspect.vehicle_details.color || '-'}`,
    });
  }
  if (suspect.other_details?.description) {
    details.push({ label: 'Other Details', value: suspect.other_details.description });
  }
  return details.length ? details : [{ label: 'Details', value: '-' }];
}

function buildWitnessDetails(witness) {
  if (witness.do_you_know_the_witness) {
    const type = RELATIONSHIP_LABELS[witness.witness_relationship_type] || 'Known';
    const details = [{ label: 'Type', value: type }];

    if (witness.witness_relationship_type === 'schoolmate' && witness.schoolmate) {
      details.push({ label: 'Student Name', value: witness.schoolmate.student_name || '-' });
      details.push({ label: 'Grade', value: witness.schoolmate.grade || '-' });
    } else if (witness.witness_relationship_type === 'external_student' && witness.external_student) {
      details.push({ label: 'School', value: witness.external_student.school_name || '-' });
      details.push({ label: 'Grade', value: witness.external_student.grade || '-' });
    } else if (witness.witness_relationship_type === 'other' && witness.other) {
      details.push({ label: 'Witness Name', value: witness.other.witness_name || '-' });
      details.push({ label: 'Organization', value: witness.other.organization || '-' });
    }
    return details;
  }

  const details = [];
  if (witness.physical_details) {
    details.push({
      label: 'Physical Details',
      value: `Height - ${witness.physical_details.height_cm || '-'}cm | Build - ${witness.physical_details.build || '-'}`,
    });
  }
  if (witness.vehicle_details) {
    details.push({
      label: 'Vehicle Details',
      value: `Type - ${witness.vehicle_details.vehicle_type || '-'}, Color - ${witness.vehicle_details.color || '-'}`,
    });
  }
  if (witness.other_details?.description) {
    details.push({ label: 'Other Details', value: witness.other_details.description });
  }
  return details.length ? details : [{ label: 'Details', value: '-' }];
}

export function mapSuspectsToCards(suspects = []) {
  return suspects.map((suspect, index) => ({
    id: index + 1,
    title: `Suspect #${index + 1}`,
    status: suspect.do_you_know_the_suspect ? 'Known Suspect' : 'Unknown Suspect',
    statusClass: suspect.do_you_know_the_suspect ? 'statusKnown_11' : 'statusUnknown_12',
    details: buildSuspectDetails(suspect),
  }));
}

export function mapWitnessesToCards(witnesses = []) {
  return witnesses.map((witness, index) => ({
    id: index + 1,
    title: `Witness #${index + 1}`,
    status: witness.do_you_know_the_witness ? 'Known Witness' : 'Unknown Witness',
    statusClass: witness.do_you_know_the_witness ? 'statusKnown_11' : 'statusUnknown_12',
    details: buildWitnessDetails(witness),
  }));
}

export function mapEvidenceToCards(evidence) {
  const items = evidence?.items || [];
  return items.map((item, index) => ({
    id: index + 1,
    title: item.title || `Evidence #${index + 1}`,
    img: item.file_type === 'image' && item.file_url ? item.file_url : '/Image (Vehicle 2).png',
    details: item.description || '-',
  }));
}

export function getCaseDisplayTitle(caseData) {
  if (!caseData) return '';
  return caseData.case_id || String(caseData.case_number || '');
}

export function displayValue(value) {
  if (value === null || value === undefined || value === '') return '-';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  return String(value);
}

export function buildPhysicalDetailFields(physical) {
  if (!physical) return [];

  return [
    {
      title: 'Height',
      para: physical.height_cm != null ? `${physical.height_cm}cm` : '-',
    },
    { title: 'Build', para: displayValue(physical.build) },
    { title: 'Skin Tone', para: displayValue(physical.skin_tone) },
    { title: 'Clothing', para: displayValue(physical.clothing_type) },
    { title: 'Hair', para: displayValue(physical.hair) },
    { title: 'Eyes', para: displayValue(physical.eyes) },
    { title: 'Mouth', para: displayValue(physical.mouth) },
    { title: 'Shoulders', para: displayValue(physical.shoulders) },
    { title: 'Hands & Arms', para: displayValue(physical.hands_and_arms) },
    { title: 'Torso', para: displayValue(physical.torso) },
    { title: 'Legs', para: displayValue(physical.legs) },
    { title: 'Feet', para: displayValue(physical.feet) },
    { title: 'Accessories', para: displayValue(physical.accessories) },
    { title: 'Additional Info', para: displayValue(physical.additional_info) },
  ];
}

export function buildVehicleDetailFields(vehicle) {
  if (!vehicle) return [];

  return [
    { title: 'Type', para: humanize(vehicle.vehicle_type) },
    { title: 'Brand', para: displayValue(vehicle.brand) },
    { title: 'Model', para: displayValue(vehicle.model) },
    { title: 'Color', para: displayValue(vehicle.color) },
    { title: 'Marking', para: displayValue(vehicle.marking) },
    { title: 'Damage', para: displayValue(vehicle.damage) },
    { title: 'Registration No.', para: displayValue(vehicle.registration_no) },
    { title: 'Additional Info', para: displayValue(vehicle.additional_info) },
    { title: 'Direction of travel', para: humanize(vehicle.direction_of_travel) },
  ];
}

export function buildSuspectSchoolmateView(schoolmate) {
  if (!schoolmate) {
    return { fields: [], wideFields: [] };
  }

  return {
    fields: [
      { title: 'Relationship', para: 'Schoolmate' },
      { title: 'Student Name', para: displayValue(schoolmate.student_name) },
    ],
    wideFields: [
      { title: 'Student Details', para: displayValue(schoolmate.student_details) },
    ],
  };
}

export function buildSuspectExternalView(external) {
  if (!external) {
    return { fields: [], wideFields: [] };
  }

  return {
    fields: [
      { title: 'Relationship', para: 'External Student' },
      { title: 'Name', para: displayValue(external.student_name) },
      { title: 'Grade', para: humanize(external.grade) },
      { title: 'Gender', para: humanize(external.gender) },
      { title: 'School', para: displayValue(external.school_name) },
      { title: 'City', para: displayValue(external.city) },
      { title: 'State', para: displayValue(external.state) },
    ],
    wideFields: [
      { title: 'Student Details', para: displayValue(external.student_details) },
      {
        title: 'How the suspect was identified',
        para: displayValue(external.how_suspect_identified),
      },
    ],
  };
}

export function buildSuspectOtherView(other) {
  if (!other) {
    return { summary: { fields: [], wideFields: [] }, identifying: { fields: [], wideFields: [] } };
  }

  const contact = [other.contact_country_code, other.contact_phone].filter(Boolean).join(' ');

  return {
    summary: {
      fields: [
        { title: 'Relationship', para: 'Other' },
        { title: 'Organization', para: displayValue(other.organization) },
        { title: 'Suspect Type', para: humanize(other.suspect_type) },
      ],
      wideFields: [
        { title: 'How you know suspect', para: displayValue(other.how_you_know_suspect) },
      ],
    },
    identifying: {
      fields: [
        { title: 'Suspect Name', para: displayValue(other.suspect_name) },
        { title: 'Age', para: displayValue(other.age) },
        {
          title: 'Relationship to student (if any)',
          para: humanize(other.relationship_to_student),
        },
        { title: 'Gender', para: humanize(other.gender) },
        { title: 'Contact info', para: contact || '-' },
      ],
      wideFields: [
        {
          title: 'Was the suspect on school grounds',
          para: displayValue(other.was_suspect_on_school_ground),
        },
        {
          title: 'Where on campus were they seen?',
          para: displayValue(other.where_on_campus_were_they_seen),
        },
      ],
    },
  };
}

export function buildWitnessSchoolmateView(schoolmate) {
  if (!schoolmate) {
    return { fields: [], wideFields: [] };
  }

  return {
    fields: [
      { title: 'Relationship', para: 'Schoolmate' },
      { title: 'Name', para: displayValue(schoolmate.student_name) },
      { title: 'Grade', para: humanize(schoolmate.grade) },
      { title: 'Incident Visibility', para: humanize(schoolmate.incident_visibility) },
      { title: 'Witness Reliability', para: humanize(schoolmate.witness_reliability) },
      {
        title: 'Relationship to Victim',
        para: humanize(schoolmate.relationship_to_victim),
      },
    ],
    wideFields: [
      {
        title: 'Observation Description',
        para: displayValue(schoolmate.observation_description),
      },
    ],
  };
}

export function buildWitnessExternalView(external) {
  if (!external) {
    return { fields: [], wideFields: [] };
  }

  return {
    fields: [
      { title: 'Relationship', para: 'External Student' },
      { title: 'School', para: displayValue(external.school_name) },
      { title: 'City', para: displayValue(external.city) },
      { title: 'State', para: displayValue(external.state) },
      { title: 'Grade', para: humanize(external.grade) },
      { title: 'Gender', para: humanize(external.gender) },
      { title: 'Age', para: displayValue(external.age) },
    ],
    wideFields: [
      { title: 'Student Details', para: displayValue(external.student_details) },
      {
        title: 'How the witness was identified',
        para: displayValue(external.how_witness_identified),
      },
    ],
  };
}

export function buildWitnessOtherView(other) {
  if (!other) {
    return { summary: { fields: [], wideFields: [] }, identifying: { fields: [], wideFields: [] } };
  }

  const contact = [other.contact_country_code, other.contact_phone].filter(Boolean).join(' ');

  return {
    summary: {
      fields: [
        { title: 'Relationship', para: 'Other' },
        { title: 'Organization', para: displayValue(other.organization) },
        { title: 'Witness Type', para: humanize(other.witness_type) },
      ],
      wideFields: [
        { title: 'Connection to incident', para: displayValue(other.connection_to_incident) },
      ],
    },
    identifying: {
      fields: [
        { title: 'Witness Name', para: displayValue(other.witness_name) },
        { title: 'Age', para: displayValue(other.age) },
        {
          title: 'Relationship to student (if any)',
          para: humanize(other.relationship_to_student),
        },
        { title: 'Gender', para: humanize(other.gender) },
        { title: 'Contact info', para: contact || '-' },
        {
          title: 'Present during incident',
          para: humanize(other.present_during_incident),
        },
      ],
      wideFields: [],
    },
  };
}

export function buildUnknownPersonView(person) {
  const physical = person?.physical_details;
  const vehicle = person?.vehicle_details;
  const other = person?.other_details;

  const hasPhysicalData =
    (physical?.photo_urls?.length ?? 0) > 0 ||
    (physical &&
      Object.entries(physical).some(([key, value]) => {
        if (key === 'photo_urls') return false;
        return value !== null && value !== undefined && value !== '';
      }));

  const hasVehicleData =
    (vehicle?.image_urls?.length ?? 0) > 0 ||
    (vehicle &&
      Object.entries(vehicle).some(([key, value]) => {
        if (key === 'image_urls') return false;
        return value !== null && value !== undefined && value !== '';
      }));

  return {
    physical: hasPhysicalData
      ? {
          fields: buildPhysicalDetailFields(physical),
          photoUrls: physical.photo_urls || [],
        }
      : null,
    vehicle: hasVehicleData
      ? {
          fields: buildVehicleDetailFields(vehicle),
          photoUrls: vehicle.image_urls || [],
          lastSeenLocation: displayValue(vehicle.last_seen_location),
        }
      : null,
    other: other?.description ? { description: other.description } : null,
  };
}
