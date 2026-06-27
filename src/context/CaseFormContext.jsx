import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { addCase, uploadImage } from "../api/cases";

const DRAFT_KEY = "queunity_add_case_draft_v3";

export const emptyCaseData = {
  // Step 0 - basic / incident / anonymity / privacy
  case_name: "",
  school_id: "",
  school_name: "",
  offence_category: "",
  offence_sub_category: "",
  incident_date: "",
  incident_time: "",
  location_mode: "",
  location_details: {
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
  },
  location_other_description: "",
  incident_grade: "",
  anonymity_level: "",
  privacy_level: "",

  // Collected lists / sections
  suspects: [],
  witnesses: [],
  evidence: {
    has_evidence: false,
    items: [],
  },
  charity: {
    involvement: "",
    charity_name: "",
    involvement_type: "",
    reason: "",
  },
  police: {
    involvement: "not_reported",
    report_number: "",
    officer_name: "",
    station_department: "",
    date_reported: "",
    report_file_urls: [],
  },
  resolution_desired: "",
};

function loadDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return { ...emptyCaseData };
    const parsed = JSON.parse(raw);
    return { ...emptyCaseData, ...parsed };
  } catch {
    return { ...emptyCaseData };
  }
}

function fileNameFromUrl(url) {
  if (!url || typeof url !== "string") return "";
  try {
    const clean = url.split("?")[0];
    return clean.substring(clean.lastIndexOf("/") + 1) || clean;
  } catch {
    return url;
  }
}

// Build the image_details[] aggregation expected by the API by scanning every
// place that holds an uploaded file URL.
function deriveImageDetails(caseData) {
  const details = [];

  (caseData.suspects || []).forEach((suspect, index) => {
    (suspect?.physical_details?.photo_urls || []).forEach((url) => {
      if (url)
        details.push({
          url,
          filename: fileNameFromUrl(url),
          type: "physical",
          section: "suspect",
          index,
        });
    });
    (suspect?.vehicle_details?.image_urls || []).forEach((url) => {
      if (url)
        details.push({
          url,
          filename: fileNameFromUrl(url),
          type: "vehicle",
          section: "suspect",
          index,
        });
    });
  });

  (caseData.witnesses || []).forEach((witness, index) => {
    (witness?.physical_details?.photo_urls || []).forEach((url) => {
      if (url)
        details.push({
          url,
          filename: fileNameFromUrl(url),
          type: "physical",
          section: "witness",
          index,
        });
    });
    (witness?.vehicle_details?.image_urls || []).forEach((url) => {
      if (url)
        details.push({
          url,
          filename: fileNameFromUrl(url),
          type: "vehicle",
          section: "witness",
          index,
        });
    });
  });

  (caseData.evidence?.items || []).forEach((item, index) => {
    if (item?.file_url)
      details.push({
        url: item.file_url,
        filename: item.filename || fileNameFromUrl(item.file_url),
        type: "evidence",
        section: "evidence",
        index,
      });
  });

  (caseData.police?.report_file_urls || []).forEach((url, index) => {
    if (url)
      details.push({
        url,
        filename: fileNameFromUrl(url),
        type: "police_report",
        section: "police",
        index,
      });
  });

  return details;
}

const CaseFormContext = createContext(null);

export function CaseFormProvider({ children }) {
  const [caseData, setCaseData] = useState(loadDraft);

  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(caseData));
    } catch {
      // ignore persistence errors (e.g. storage full / private mode)
    }
  }, [caseData]);

  const updateBasic = (patch) => {
    setCaseData((prev) => {
      // Bail out when the patch does not actually change anything. This avoids a
      // redundant whole-app re-render (the provider wraps the entire tree) when a
      // freshly-mounted step syncs values that already match the store, which
      // would otherwise interrupt the in-flight react-router navigation.
      const changed = Object.keys(patch).some((key) => prev[key] !== patch[key]);
      return changed ? { ...prev, ...patch } : prev;
    });
  };

  const addSuspect = (suspect) => {
    setCaseData((prev) => ({ ...prev, suspects: [...prev.suspects, suspect] }));
  };

  const removeSuspect = (index) => {
    setCaseData((prev) => ({
      ...prev,
      suspects: prev.suspects.filter((_, i) => i !== index),
    }));
  };

  const addWitness = (witness) => {
    setCaseData((prev) => ({ ...prev, witnesses: [...prev.witnesses, witness] }));
  };

  const removeWitness = (index) => {
    setCaseData((prev) => ({
      ...prev,
      witnesses: prev.witnesses.filter((_, i) => i !== index),
    }));
  };

  const setEvidence = (evidence) => {
    setCaseData((prev) => ({ ...prev, evidence }));
  };

  const setCharity = (charity) => {
    setCaseData((prev) => ({ ...prev, charity: { ...prev.charity, ...charity } }));
  };

  const setPolice = (police) => {
    setCaseData((prev) => ({ ...prev, police: { ...prev.police, ...police } }));
  };

  const setResolution = (resolution_desired) => {
    setCaseData((prev) => ({ ...prev, resolution_desired }));
  };

  const resetDraft = () => {
    setCaseData({ ...emptyCaseData });
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {
      // ignore
    }
  };

  // Upload a single file and return its hosted URL.
  const uploadFile = async (file) => {
    return uploadImage(file);
  };

  const buildPayload = () => {
    return {
      case_id: "ABC_1234",
      case_number: "1234",
      case_name: caseData.case_name,
      school_id: caseData.school_id,
      school_name: caseData.school_name,
      offence_category: caseData.offence_category,
      offence_sub_category: caseData.offence_sub_category,
      incident_date: caseData.incident_date,
      incident_time: caseData.incident_time,
      location_mode: caseData.location_mode,
      location_details: caseData.location_details,
      location_other_description: caseData.location_other_description,
      incident_grade: caseData.incident_grade,
      anonymity_level: caseData.anonymity_level,
      privacy_level: caseData.privacy_level,
      suspects: caseData.suspects,
      witnesses: caseData.witnesses,
      evidence: caseData.evidence,
      charity: caseData.charity,
      police: caseData.police,
      resolution_desired: caseData.resolution_desired,
      image_details: deriveImageDetails(caseData),
      created_at: new Date().toISOString(),
      created_by: "admin",
      system_info: "Windows 10 / Chrome",
      system_ip: "192.168.1.10",
      isactive: true
    };
  };

  const submitCase = async () => {
    const payload = buildPayload();
    return addCase(payload);
  };

  const value = useMemo(
    () => ({
      caseData,
      updateBasic,
      addSuspect,
      removeSuspect,
      addWitness,
      removeWitness,
      setEvidence,
      setCharity,
      setPolice,
      setResolution,
      resetDraft,
      uploadFile,
      buildPayload,
      submitCase,
    }),
    [caseData],
  );

  return (
    <CaseFormContext.Provider value={value}>{children}</CaseFormContext.Provider>
  );
}

export function useCaseForm() {
  const context = useContext(CaseFormContext);
  if (!context) {
    throw new Error("useCaseForm must be used within a CaseFormProvider");
  }
  return context;
}
