import { useEffect, useMemo, useState } from "react";
import usePageHeader from "../../../hooks/use-page-header";
import CommonInput from "../../../components/common-input";
import CommonSelect from "../../../components/common-select";
import CommonButton from "../../../components/common-button";
import InputCommon from "../../../components/input_common";
import "./add-cases.css";

function ProgressRing({ progress }) {
  const size = 58;
  const radius = 22;
  const stroke = 6;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const dashOffset =
    circumference - (Math.max(0, Math.min(100, progress)) / 100) * circumference;

  return (
    <div className="add-cases-progress-ring-wrap">
      <svg width={size} height={size} viewBox="0 0 58 58" className="add-cases-progress-ring">
        <circle
          cx="29"
          cy="29"
          r={normalizedRadius}
          fill="none"
          stroke="#E6E6E6"
          strokeWidth={stroke}
        />
        <circle
          cx="29"
          cy="29"
          r={normalizedRadius}
          fill="none"
          stroke="#95C63D"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform="rotate(-90 29 29)"
        />
      </svg>
      <div className="add-cases-progress-ring-text">{progress}%</div>
    </div>
  );
}

function WizardSection({ iconBg, icon, title, subtitle, children }) {
  return (
    <section className="add-cases-section">
      <div className="add-cases-section-header">
        <div className="add-cases-section-icon">

          {icon}

        </div>

        <div className="add-cases-section-header-text">
          <h3 className="add-cases-section-title">{title}</h3>
          {subtitle ? <p className="add-cases-section-subtitle">{subtitle}</p> : null}
        </div>
      </div>
      <div className="add-cases-section-body">{children}</div>
    </section>
  );
}

function SectionRequired({ children }) {
  return <div className="add-cases-required-label">{children}</div>;
}

function ChoiceRadio({ name, label, value, checked, onChange }) {
  return (
    <label className="add-cases-choice add-cases-choice-radio">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
      />
      <span className="add-cases-choice-control" aria-hidden="true" />
      <span className="add-cases-choice-label">{label}</span>
    </label>
  );
}

function ChoiceCheckbox({ name, label, value, checked, onChange }) {
  return (
    <label className="add-cases-choice add-cases-choice-checkbox">
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
      />
      <span className="add-cases-choice-control" aria-hidden="true" />
      <span className="add-cases-choice-label">{label}</span>
    </label>
  );
}

function SuspectsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#95C63D" />
      <path
        d="M8.5 20c.8-2.4 6.2-2.4 7 0"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
        stroke="#ffffff"
        strokeWidth="2"
      />
    </svg>
  );
}

function AddSuspectsScreen() {
  return (
    <div className="add-suspects-screen">
      <div className="add-suspects-card">
        <div className="add-suspects-card-left">
          <div className="add-suspects-icon">
            <img src="/suspects-icon.svg" alt="" />
          </div>
          <div className="add-suspects-card-text">
            <div className="add-suspects-title">Add Suspects</div>
            <div className="add-suspects-subtitle">0 suspect recorded</div>
          </div>
        </div>

        <div className="add-suspects-card-right">
          <CommonButton
            text="Add Suspect"
            img=""
            backgroundColor="transparent"
            color="#141414"
            borderColor="#95C63D"
            onClick={() => { }}
          />
        </div>
      </div>
    </div>
  );
}

function CircleIcon({ children }) {
  return <span className="add-cases-circle-icon">{children}</span>;
}

function CalendarIcon({ color = "#1E90FF" }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 3v2M17 3v2M4 8h16M6.5 21h11c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-11c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AlertIcon({ color = "#FF7A59" }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 9v4"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 17h.01"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M10.3 4.6 2.6 18a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 4.6a2 2 0 0 0-3.4 0Z"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FingerprintIcon({ color = "#AA3BFF" }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 10.5c0-2.5 2-4.5 4.5-4.5S16 8 16 10.5V15c0 2.2-1.8 4-4 4-2.2 0-4-1.8-4-4V10.5Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M5 12v3c0 4 3.1 7 7 7s7-3 7-7v-5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EyeIcon({ color = "#006D70" }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        stroke={color}
        strokeWidth="2"
      />
    </svg>
  );
}

function AddCases() {
  // Match the screenshot default state.
  const [stepIndex, setStepIndex] = useState(0);
  const stepsCount = 10;
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
              title="Basic DetailsAAA"
              subtitle="Start with the basics"
            >
              <CommonInput
                label="Case Name"
                name="caseName"
                value={formData.caseName}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, caseName: e.target.value }))
                }
                placeholder=""
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
                    <ChoiceCheckbox
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

        {stepIndex >= 1 && <AddSuspectsScreen />}

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