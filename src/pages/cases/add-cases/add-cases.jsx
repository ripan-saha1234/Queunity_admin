import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import usePageHeader from "../../../hooks/use-page-header";
import { getCaseById } from "../../../api/cases";
import { mapApiCaseToStepFormData } from "../../../utils/caseFormMapper";
import { getCaseWizardPath } from "../../../utils/caseRoutes";
import CommonInput from "../../../components/common-input";
import CommonSelect from "../../../components/common-select";
import CommonButton from "../../../components/common-button";
import InputCommon from "../../../components/input_common";
import "./add-cases.css";
import { WizardSection } from "../../../components/WizardSection";
import { SectionRequired } from "../../../components/SectionRequired";
import { ChoiceRadio } from "../../../components/ChoiceRadio";
import { ChoiceCheckbox } from "../../../components/ChoiceCheckbox";
import { AddSuspectsScreen } from "./AddSuspectsScreen";
import { AddWitness } from "./AddWitness/AddWitness";
import CharityPoliceForm from "./CharityPolice/CharityPoliceForm";
import ResolutionDesired from "./ResolutionDesired/ResolutionDesired";
import AllEvidence from './Evidence/AllEvidence.jsx'
import icon from '../../../Assets/Icon (1).svg'
import icon2 from '../../../Assets/Icon (2).svg'
import icon3 from '../../../Assets/Icon (3).svg'
import icon4 from '../../../Assets/Icon (4).svg'
import EvidenceForm from "./Evidence/EvidenceForm.jsx";
import SummaryCaseModal from "../../../Modals/CaseModals/SummaryCaseModal";
import { useCaseForm } from "../../../context/CaseFormContext";

function AddCases() {
  // Steps are indexed from 0 to 5.
  const stepsCount = 6;
  const location = useLocation();
  const navigate = useNavigate();
  const { caseId } = useParams();
  const isEditMode = Boolean(caseId);
  const {
    caseData,
    updateBasic,
    submitCase,
    resetDraft,
    loadCaseForEdit,
    isEditing,
    editMeta,
  } = useCaseForm();

  const [loadingCase, setLoadingCase] = useState(isEditMode);
  const [loadError, setLoadError] = useState("");

  const initialStepIndex = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const raw = params.get("step");
    const parsed = raw == null ? 0 : Number(raw);

    if (!Number.isFinite(parsed)) return 0;
    return Math.max(0, Math.min(stepsCount - 1, parsed));
  }, [location.search, stepsCount]);

  const [stepIndex, setStepIndex] = useState(initialStepIndex);
  useEffect(() => {
    setStepIndex(initialStepIndex);
  }, [initialStepIndex]);

  const progress = useMemo(() => {
    if (stepsCount <= 0) return 0;
    return Math.min(100, ((stepIndex + 1) / stepsCount) * 100);
  }, [stepIndex, stepsCount]);

  // Ensure the step content starts at the top (the scroll container is in CommonLayout).
  useEffect(() => {
    const el = document.querySelector(".common-layout-content");
    if (el) el.scrollTop = 0;
  }, [stepIndex]);

  const [summaryCaseOpen, setSummaryCaseOpen] = useState(false);
  useEffect(() => {
    if (stepIndex !== stepsCount - 1) setSummaryCaseOpen(false);
  }, [stepIndex, stepsCount]);

  const [formData, setFormData] = useState(() => ({
    caseId: caseData.case_id || "",
    caseName: caseData.case_name || "",
    school: caseData.school_id || "",
    schoolName: caseData.school_id === "other" ? caseData.school_name || "" : "",
    incidentDetails: "",
    offenceCategory: caseData.offence_category || "",
    offenceSubCategory: caseData.offence_sub_category || "",
    incidentDate: caseData.incident_date || "",
    incidentTime: caseData.incident_time || "",
    locationMode: caseData.location_mode || "",
    locationDetails: caseData.location_details || {
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
    description: caseData.location_other_description || "",
    grade: caseData.incident_grade || "",
    anonymityLevel: caseData.anonymity_level || "",
    privacyLevel: caseData.privacy_level || "",
  }));

  useEffect(() => {
    if (!caseId) return undefined;

    let active = true;
    setLoadingCase(true);
    setLoadError("");

    getCaseById(caseId)
      .then((data) => {
        if (!active) return;
        loadCaseForEdit(data);
        setFormData(mapApiCaseToStepFormData(data));
      })
      .catch((err) => {
        if (!active) return;
        setLoadError(err?.message || "Failed to load case for editing");
      })
      .finally(() => {
        if (active) setLoadingCase(false);
      });

    return () => {
      active = false;
    };
    // Fetch once per caseId only — do not add loadCaseForEdit (causes infinite loop).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caseId]);

  const offenceCategoryOptions = useMemo(
    () => [
      { label: "Verbal Bullying", value: "verbal_bullying" },
      { label: "Physical Bullying", value: "physical_bullying" },
    ],
    [],
  );

  const schoolOptions = useMemo(
    () => [
      { label: "Green Valley Public School", value: "green_valley_public_school" },
      { label: "Sunrise International School", value: "sunrise_international_school" },
      { label: "Oxford Senior Secondary School", value: "oxford_senior_secondary_school" },
      { label: "Other", value: "other" },
    ],
    [],
  );

  const offenceSubCategoryOptions = useMemo(
    () => [
      { label: "Teasing", value: "teasing" },
      { label: "Name Calling", value: "name_calling" },
    ],
    [],
  );

  const gradeOptions = useMemo(
    () => [
      { label: "Class 8", value: "class_8" },
      { label: "Class 9", value: "class_9" },
      { label: "Class 10", value: "class_10" },
    ],
    [],
  );

  const locationDetailOptions = useMemo(
    () => [
      { label: "Classroom", value: "classroom" },
      { label: "Cafeteria", value: "cafeteria" },
      { label: "Playground", value: "playground" },
      { label: "Hallway", value: "hallway" },
      { label: "Bathroom", value: "bathroom" },
      { label: "Bus area", value: "bus_area" },
      { label: "Sports field", value: "sports_field" },
      { label: "Computer lab", value: "computer_lab" },
      { label: "Library", value: "library" },
      { label: "Other", value: "other" },
    ],
    [],
  );

  const headerButtons = useMemo(() => {
    const isLastStep = stepIndex >= stepsCount - 1;
    return [
      {
        type: "wizard",
        progress,
        prevDisabled: stepIndex === 0,
        nextDisabled: false,
        prevText: isLastStep ? "Previous" : undefined,
        nextText: isLastStep ? (isEditMode ? "Update" : "Submit") : undefined,
        onPrev: () => {
          if (isLastStep) navigate(getCaseWizardPath(4, caseId));
          else setStepIndex((s) => Math.max(0, s - 1));
        },
        onNext: () => {
          if (isLastStep) setSummaryCaseOpen(true);
          else setStepIndex((s) => Math.min(stepsCount - 1, s + 1));
        },
      },
    ];
  }, [progress, stepIndex, stepsCount, navigate, caseId, isEditMode]);

  const pageTitle = isEditMode ? "Edit Case" : "Add Case";
  const formPath = isEditMode
    ? `/cases/edit-cases/${caseId}`
    : "/cases/add-cases";

  usePageHeader({
    title: pageTitle,
    breadcrumbs: [
      { title: "Cases", link: "/cases" },
      { title: pageTitle, link: formPath },
    ],
    buttons: headerButtons,
  });

  // Keep the shared case-form store in sync with this step's local UI state so
  // the final payload (and the separate suspect/witness routes) see the data.
  useEffect(() => {
    const schoolLabel =
      schoolOptions.find((opt) => opt.value === formData.school)?.label || "";
    const normalizedGrade = /^Grade\s+(\d+)/i.test(formData.grade || "")
      ? `class_${formData.grade.match(/\d+/)[0]}`
      : formData.grade;

    updateBasic({
      case_name: formData.caseName,
      school_id: formData.school,
      school_name:
        formData.school === "other" ? formData.schoolName || "" : schoolLabel,
      offence_category: formData.offenceCategory,
      offence_sub_category: formData.offenceSubCategory,
      incident_date: formData.incidentDate,
      incident_time: formData.incidentTime,
      location_mode: formData.locationMode,
      location_details: formData.locationDetails,
      location_other_description: formData.locationDetails.other
        ? formData.description
        : "",
      incident_grade: normalizedGrade,
      anonymity_level: formData.anonymityLevel,
      privacy_level: formData.privacyLevel,
    });
    // updateBasic intentionally excluded from deps to avoid an update loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, schoolOptions]);

  const handleSubmitCase = async () => {
    const response = await submitCase();
    resetDraft();
    return response;
  };

  if (loadingCase) {
    return (
      <div className="add-cases-page">
        <div className="table1-no-data-container">
          <p>Loading case...</p>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="add-cases-page">
        <div className="table1-no-data-container">
          <p>{loadError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="add-cases-page">
      {summaryCaseOpen && (
        <SummaryCaseModal
          setsummaryCase={setSummaryCaseOpen}
          onSubmit={handleSubmitCase}
          isEditMode={isEditMode || isEditing}
        />
      )}
      <div className="add-cases-form">
        {stepIndex === 0 && (
          <>
            <WizardSection
              iconBg="linear-gradient(135deg, #51A2FF 0%, #00D3F3 100%)"
              icon={<img src={icon} alt="" />}
              title="Basic Details"
              subtitle="Start with the basics"
            >
              <CommonInput
                label="Case ID"
                name="caseId"
                value={formData.caseId || editMeta?.case_id || caseId || ""}
                disabled={true}
                placeholder="Case ID"
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, caseId: e.target.value }))
                }

              />
              <CommonInput
                label="Case Name"
                name="caseName"
                value={formData.caseName}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, caseName: e.target.value }))
                }
                placeholder="Case Name"
              />
              <CommonSelect
                label="Select School"
                name="school"
                value={formData.school}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, school: e.target.value }))
                }
                options={schoolOptions}
                placeholder="Select school"
                searchPlaceholder="Search school..."
              />
              {formData.school === "other" && (
                <CommonInput
                  label="School Name"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, schoolName: e.target.value }))
                  }
                  placeholder="Enter school name"
                />
              )}
            </WizardSection>

            <WizardSection
              iconBg=" linear-gradient(135deg, #FF8904 0%, #FF6467 100%)"
              icon={<img src={icon2} alt="" />}
              title="Incident Details"
              subtitle="When & where it happened"
            >
              <div className="add-cases-grid-2">
                {/* <CommonSelect
                  label="Offence Category"
                  name="offenceCategory"
                  value={formData.offenceCategory}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      offenceCategory: e.target.value,
                    }))
                  }
                  required
                  options={offenceCategoryOptions}
                  placeholder="Select category"
                />

                <CommonSelect
                  label="Offence Sub-Category"
                  name="offenceSubCategory"
                  value={formData.offenceSubCategory}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      offenceSubCategory: e.target.value,
                    }))
                  }
                  required
                  options={offenceSubCategoryOptions}
                  placeholder="Select sub-category"
                />
              </div>

              <div className="add-cases-grid-2">
                <CommonInput
                  label="Date"
                  name="incidentDate"
                  type="date"
                  required
                  value={formData.incidentDate}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      incidentDate: e.target.value,
                    }))
                  }
                />
                <CommonInput
                  label="Time"
                  name="incidentTime"
                  type="time"
                  required
                  value={formData.incidentTime}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      incidentTime: e.target.value,
                    }))
                  }
                /> */}
                <InputCommon
                  label="Offence Category"
                  name="offenceCategory"
                  type="select"
                  value={formData.offenceCategory}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      offenceCategory: e.target.value,
                    }))
                  }
                  required
                  options={offenceCategoryOptions}
                  placeholder="Select category"
                />

                <InputCommon
                  label="Offence Sub-Category"
                  name="offenceSubCategory"
                  type="select"
                  value={formData.offenceSubCategory}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      offenceSubCategory: e.target.value,
                    }))
                  }
                
                  options={offenceSubCategoryOptions}
                  placeholder="Select sub-category"
                />
                <InputCommon
                  label="Date"
                  name="incidentDate"
                  type="date"
                  value={formData.incidentDate}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      incidentDate: e.target.value,
                    }))
                  }
                  required
                />
                <InputCommon
                  label="Time"
                  name="incidentTime"
                  type="time"
                  value={formData.incidentTime}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      incidentTime: e.target.value,
                    }))
                  }
                  required
                />


              </div>

              <div className="add-cases-location-block">
                <SectionRequired>Location</SectionRequired>
                <div className="add-cases-location-radio-row">
                  <ChoiceRadio
                    name="locationMode"
                    label="Within School"
                    value="within_school"
                    checked={formData.locationMode === "within_school"}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, locationMode: value }))
                    }
                  />
                  <ChoiceRadio
                    name="locationMode"
                    label="Outside School"
                    value="outside_school"
                    checked={formData.locationMode === "outside_school"}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, locationMode: value }))
                    }
                  />
                </div>

                {formData.locationMode === "within_school" && (
                  <>
                    <SectionRequired>Add More details</SectionRequired>

                    <div className="add-cases-location-checkbox-grid">
                      {locationDetailOptions.map((opt) => (
                        <ChoiceRadio
                          key={opt.value}
                          name="locationDetails"
                          label={opt.label}
                          value={opt.value}
                          checked={formData.locationDetails[opt.value] === true}
                          onChange={(value) => {
                            const nextLocationDetails = {};
                            locationDetailOptions.forEach((detailOpt) => {
                              nextLocationDetails[detailOpt.value] =
                                detailOpt.value === value;
                            });
                            setFormData((prev) => ({
                              ...prev,
                              locationDetails: nextLocationDetails,
                              description: value === "other" ? prev.description : "",
                            }));
                          }}
                        />
                      ))}
                    </div>
                    {formData.locationDetails.other && (
                      <div style={{ marginTop: "20px" }}>
                        <CommonInput
                          label="Description"
                          name="description"
                          value={formData.description}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              description: e.target.value,
                            }))
                          }
                          placeholder="Enter description"
                        />
                      </div>
                    )}
                  </>
                )}
              </div>

              {formData.locationMode === "within_school" &&
                formData.locationDetails.classroom &&
                !formData.locationDetails.other && (
                <div className="add-cases-grade">
                  <CommonSelect
                    label="Grade"
                    name="grade"
                    value={formData.grade}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        grade: e.target.value,
                      }))
                    }
                    options={gradeOptions}
                    placeholder="Select grade"
                  />
                </div>
              )}
            </WizardSection>
          </>
        )}

        {stepIndex == 1 && <AddSuspectsScreen />}
        {stepIndex == 2 && <AddWitness />}
        {stepIndex == 3 && <EvidenceForm/>}
        {stepIndex == 4 && <CharityPoliceForm/>}
        {stepIndex == 5 && <ResolutionDesired/>}

        {stepIndex === 0 && (
          <>
            <WizardSection
              iconBg=" linear-gradient(135deg, #C27AFF 0%, #FB64B6 100%)
"
              icon={<img src={icon3} alt="" />}
              title="Anonymity Level"
              subtitle="Choose your privacy"
            >
              <div className="add-cases-question-options">
                <ChoiceRadio
                  name="anonymityLevel"
                  label="Complete anonymous"
                  value="complete_anonymous"
                  checked={formData.anonymityLevel === "complete_anonymous"}
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      anonymityLevel: value,
                    }))
                  }
                />
                <ChoiceRadio
                  name="anonymityLevel"
                  label="Student subject only"
                  value="student_subject_only"
                  checked={
                    formData.anonymityLevel === "student_subject_only"
                  }
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      anonymityLevel: value,
                    }))
                  }
                />
                <ChoiceRadio
                  name="anonymityLevel"
                  label="Hide from parents"
                  value="hide_from_parents"
                  checked={formData.anonymityLevel === "hide_from_parents"}
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      anonymityLevel: value,
                    }))
                  }
                />
                <ChoiceRadio
                  name="anonymityLevel"
                  label="Student don't want to hide identity"
                  value="no_hide_identity"
                  checked={formData.anonymityLevel === "no_hide_identity"}
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      anonymityLevel: value,
                    }))
                  }
                />
              </div>
            </WizardSection>

            <WizardSection
              iconBg=" linear-gradient(135deg, #05DF72 0%, #00D492 100%)
"
              icon={<img src={icon4} alt="" />}
              title="Privacy Level"
              subtitle="Who can see this"
            >
              <div className="add-cases-privacy-options">
                <label className="add-cases-choice add-cases-choice-radio" style={{
                  alignItems: 'start',
                  gap: '10px'
                }}>
                  <input
                    type="radio"
                    name="privacyLevel"
                    value="level_1"
                    checked={formData.privacyLevel === "level_1"}
                    onChange={() =>
                      setFormData((prev) => ({
                        ...prev,
                        privacyLevel: "level_1",
                      }))
                    }
                  />
                  <span
                    className="add-cases-choice-control add-cases-choice-control-radio"
                    aria-hidden="true"
                  />
                  <div className="add-cases-privacy-text">
                    <div className="add-cases-privacy-title">
                      Level 1 (Default)
                    </div>
                    <div className="add-cases-privacy-note">
                      Note: Only principal
                    </div>
                  </div>
                </label>

                <label className="add-cases-choice add-cases-choice-radio" style={{
                  alignItems:'start',
                  gap:'10px'
                }}>
                  <input
                    type="radio"
                    name="privacyLevel"
                    value="level_2"
                    checked={formData.privacyLevel === "level_2"}
                    onChange={() =>
                      setFormData((prev) => ({
                        ...prev,
                        privacyLevel: "level_2",
                      }))
                    }
                  />
                  <span
                    className="add-cases-choice-control add-cases-choice-control-radio"
                    aria-hidden="true"
                  />
                  <div className="add-cases-privacy-text">
                    <div className="add-cases-privacy-title">Level 2</div>
                    <div className="add-cases-privacy-note">
                      Note: Principal+ School representative+ Counsellor
                    </div>
                  </div>
                </label>
              </div>
            </WizardSection>
          </>
        )}
      </div>
    </div>
  );
}

export default AddCases;