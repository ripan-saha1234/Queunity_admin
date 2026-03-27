import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import usePageHeader from "../../../hooks/use-page-header";
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

function AddCases() {
  // Match the screenshot default state.
  const stepsCount = 10;
  const location = useLocation();

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
    // 10% at step 0, 20% at step 1, ...
    return Math.min(100, (stepIndex + 1) * 10);
  }, [stepIndex, stepsCount]);

  // Ensure the step content starts at the top (the scroll container is in CommonLayout).
  useEffect(() => {
    const el = document.querySelector(".common-layout-content");
    if (el) el.scrollTop = 0;
  }, [stepIndex]);

  const [formData, setFormData] = useState({
    caseName: "Case 11489",
    offenceCategory: "verbal_bullying",
    offenceSubCategory: "teasing",
    incidentDate: "2026-06-12",
    incidentTime: "21:30",
    locationMode: "within_school",
    locationDetails: {
      classroom: true,
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
    grade: "class_8",
    anonymityLevel: "complete_anonymous",
    privacyLevel: "level_1",
  });

  const offenceCategoryOptions = useMemo(
    () => [
      { label: "Verbal Bullying", value: "verbal_bullying" },
      { label: "Physical Bullying", value: "physical_bullying" },
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

  const headerButtons = useMemo(
    () => [
      {
        type: "wizard",
        progress,
        prevDisabled: stepIndex === 0,
        nextDisabled: stepIndex >= stepsCount - 1,
        onPrev: () => setStepIndex((s) => Math.max(0, s - 1)),
        onNext: () => setStepIndex((s) => Math.min(stepsCount - 1, s + 1)),
      },
    ],
    [progress, stepIndex, stepsCount],
  );

  usePageHeader({
    title: "Add Case",
    breadcrumbs: [
      { title: "Cases", link: "/cases" },
      { title: "Add Case", link: "/cases/add-cases" },
    ],
    buttons: headerButtons,
  });

  return (
    <div className="add-cases-page">
      <div className="add-cases-form">
        {stepIndex === 0 && (
          <>
            <WizardSection
              iconBg="#FFFFFF"
              icon={<img src="/basic-details-icon.svg" alt="" />}
              title="Basic Details"
              subtitle="Start with the basics"
            >
              <CommonInput
              label="Case ID"
              name="caseId"
              value={formData.caseId}
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
            </WizardSection>

            <WizardSection
              iconBg="#FFE4D9"
              icon={<img src="/incident-details-icon.svg" alt="" />}
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
                  required
                  options={offenceSubCategoryOptions}
                  placeholder="Select sub-category"
                />
                <InputCommon
                  label="Date"
                  name="incidentTime"
                  type="date"
                  value={formData.incidentTime}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      incidentTime: e.target.value,
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

                <SectionRequired>Add More details</SectionRequired>

                <div className="add-cases-location-checkbox-grid">
                  {locationDetailOptions.map((opt) => (
                    <ChoiceRadio
                      key={opt.value}
                      name="locationDetails"
                      label={opt.label}
                      value={opt.value}
                      checked={!!formData.locationDetails[opt.value]}
                      onChange={(value) => {
                        setFormData((prev) => ({
                          ...prev,
                          locationDetails: {
                            ...prev.locationDetails,
                            [value]: !prev.locationDetails[value],
                          },
                        }));
                      }}
                    />
                  ))}
                </div>
              </div>

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
            </WizardSection>
          </>
        )}

        {stepIndex == 1 && <AddSuspectsScreen />}
        {stepIndex == 2 && <AddWitness/>}

        {stepIndex === 0 && (
          <>
            <WizardSection
              iconBg="#F0D9FF"
              icon={<img src="/anonymity-level-icon.svg" alt="" />}
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
              iconBg="#D6F7F4"
              icon={<img src="/privacy-level-icon.svg" alt="" />}
              title="Privacy Level"
              subtitle="Who can see this"
            >
              <div className="add-cases-privacy-options">
                <label className="add-cases-privacy-radio">
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

                <label className="add-cases-privacy-radio">
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