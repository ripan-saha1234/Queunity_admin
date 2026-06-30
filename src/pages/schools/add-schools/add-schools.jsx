import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import usePageHeader from "../../../hooks/use-page-header";
import { useToast } from "../../../components/toast/ToastProvider";
import { addSchool, validateSchoolForm } from "../../../api/school";
import { uploadImage } from "../../../api/cases";
import InputCommon from "../../../components/input_common";
import NewCommonMultiFileUpload from "../../../components/NewCommonMultiFileUpload";
import { WizardSection } from "../../../components/WizardSection";
import { SectionRequired } from "../../../components/SectionRequired";
import { ChoiceRadio } from "../../../components/ChoiceRadio";
import "../../cases/add-cases/add-cases.css";
import "./add-schools.css";

function AddSchools() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    schoolName: "",
    schoolType: "",
    schoolCategory: "",
    facultyCount: "",
    studentCount: "",
    country: "",
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    city: "",
    state: "",
    zip: "",
    principalFirst: "",
    principalLast: "",
    principalEmail: "",
    phoneCode: "",
    principalPhone: "",
    logoFile: null,
    schoolLogoUrl: "",
  });

  useEffect(() => {
    const el = document.querySelector(".common-layout-content");
    if (el) el.scrollTop = 0;
  }, []);

  const countryOptions = useMemo(
    () => [{ label: "United States", value: "us" }],
    [],
  );

  const stateOptions = useMemo(
    () => [
      { label: "State 1", value: "s1" },
      { label: "State 2", value: "s2" },
      { label: "State 3", value: "s3" },
    ],
    [],
  );

  const phoneCodeOptions = useMemo(
    () => [
      { label: "+1", value: "+1" },
      { label: "+44", value: "+44" },
      { label: "+91", value: "+91" },
    ],
    [],
  );

  const handleAddSchool = useCallback(async () => {
    const validationError = validateSchoolForm(form);
    if (validationError) {
      showToast(validationError, "error");
      return;
    }

    setSubmitting(true);
    try {
      let schoolLogoUrl = form.schoolLogoUrl || "";

      if (form.logoFile) {
        schoolLogoUrl = await uploadImage(form.logoFile);
      }

      const countryLabel =
        countryOptions.find((opt) => opt.value === form.country)?.label || form.country;
      const stateLabel =
        stateOptions.find((opt) => opt.value === form.state)?.label || form.state;

      const response = await addSchool({
        ...form,
        schoolLogoUrl,
        countryLabel,
        stateLabel,
      });

      showToast(response?.message || "School added successfully", "success");
      navigate("/schools");
    } catch (error) {
      showToast(error?.message || "Failed to add school", "error");
    } finally {
      setSubmitting(false);
    }
  }, [form, navigate, showToast, countryOptions, stateOptions]);

  const headerButtons = useMemo(
    () => [
      {
        type: "button",
        text: "Cancel",
        onClick: () => navigate("/schools"),
        backgroundColor: "transparent",
        textColor: "#141414",
        borderColor: "transparent",
        disabled: submitting,
      },
      {
        type: "button",
        text: submitting ? "Adding..." : "Add",
        onClick: handleAddSchool,
        backgroundColor: "#95C63D",
        textColor: "#141414",
        borderColor: "#9FC53D",
        disabled: submitting,
      },
    ],
    [navigate, handleAddSchool, submitting],
  );

  usePageHeader({
    title: "Add School",
    breadcrumbs: [
      { title: "Schools", link: "/schools" },
      { title: "Add Schools", link: "/schools/add-schools" },
    ],
    buttons: headerButtons,
  });

  const updateField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="add-schools-page">
      <div className="add-schools-main-grid">
        <div className="add-schools-col-left">
          <WizardSection title="Basic Details">
            <InputCommon
              label="School Name"
              name="schoolName"
              type="text"
              required
              value={form.schoolName}
              placeholder="Elite High School"
              onChange={(e) => updateField("schoolName", e.target.value)}
            />

            <div className="radio_main" style={{ marginTop: 20 }}>
              <label>Upload School Logo</label>
              <NewCommonMultiFileUpload
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  updateField("logoFile", file);
                }}
              />
            </div>

            <div>
              <SectionRequired>School type</SectionRequired>
              <div className="add-schools-radio-row">
                <ChoiceRadio
                  name="schoolType"
                  label="Primary"
                  value="primary"
                  checked={form.schoolType === "primary"}
                  onChange={(v) => updateField("schoolType", v)}
                />
                <ChoiceRadio
                  name="schoolType"
                  label="Middle"
                  value="middle"
                  checked={form.schoolType === "middle"}
                  onChange={(v) => updateField("schoolType", v)}
                />
                <ChoiceRadio
                  name="schoolType"
                  label="High"
                  value="high"
                  checked={form.schoolType === "high"}
                  onChange={(v) => updateField("schoolType", v)}
                />
                <ChoiceRadio
                  name="schoolType"
                  label="K-12"
                  value="k12"
                  checked={form.schoolType === "k12"}
                  onChange={(v) => updateField("schoolType", v)}
                />
              </div>
            </div>

            <div>
              <SectionRequired>School category</SectionRequired>
              <div className="add-schools-radio-row">
                <ChoiceRadio
                  name="schoolCategory"
                  label="Public"
                  value="public"
                  checked={form.schoolCategory === "public"}
                  onChange={(v) => updateField("schoolCategory", v)}
                />
                <ChoiceRadio
                  name="schoolCategory"
                  label="Private"
                  value="private"
                  checked={form.schoolCategory === "private"}
                  onChange={(v) => updateField("schoolCategory", v)}
                />
                <ChoiceRadio
                  name="schoolCategory"
                  label="Charter"
                  value="charter"
                  checked={form.schoolCategory === "charter"}
                  onChange={(v) => updateField("schoolCategory", v)}
                />
              </div>
            </div>
          </WizardSection>

          <section className="add-schools-plain-section">
            <h3 className="add-schools-plain-section-title">Other Details</h3>
            <div className="add-schools-plain-section-body">
              <InputCommon
                label="Number of Faculty Members"
                name="facultyCount"
                type="number"
                value={form.facultyCount}
                placeholder="20"
                onChange={(e) => updateField("facultyCount", e.target.value)}
              />
              <InputCommon
                label="Number of Students"
                name="studentCount"
                type="number"
                value={form.studentCount}
                placeholder="400"
                onChange={(e) => updateField("studentCount", e.target.value)}
              />
            </div>
          </section>
        </div>

        <div className="add-schools-col-right">
          <div className="add-schools-card">
            <div className="add-schools-card-block">
              <h3 className="add-schools-card-heading">Address</h3>
              <InputCommon
                label="Country"
                name="country"
                type="select"
                required
                value={form.country}
                onChange={(e) => updateField("country", e.target.value)}
                options={countryOptions}
                placeholder="Select country"
              />
              <div className="add-schools-grid-2">
                <InputCommon
                  label="Address Line 1"
                  name="addressLine1"
                  type="text"
                  required
                  value={form.addressLine1}
                  placeholder="1234 Lorem Street"
                  onChange={(e) => updateField("addressLine1", e.target.value)}
                />
                <InputCommon
                  label="Address Line 2"
                  name="addressLine2"
                  type="text"
                  value={form.addressLine2}
                  placeholder="Card Square"
                  onChange={(e) => updateField("addressLine2", e.target.value)}
                />
              </div>
              <div className="add-schools-grid-2">
                <InputCommon
                  label="Landmark"
                  name="landmark"
                  type="text"
                  value={form.landmark}
                  placeholder="Near Lorem Park"
                  onChange={(e) => updateField("landmark", e.target.value)}
                />
                <InputCommon
                  label="City"
                  name="city"
                  type="text"
                  required
                  value={form.city}
                  placeholder="Card Square"
                  onChange={(e) => updateField("city", e.target.value)}
                />
              </div>
              <div className="add-schools-grid-2">
                <InputCommon
                  label="State"
                  name="state"
                  type="select"
                  required
                  value={form.state}
                  onChange={(e) => updateField("state", e.target.value)}
                  options={stateOptions}
                  placeholder="Select state"
                />
                <InputCommon
                  label="Zip code/ Postal"
                  name="zip"
                  type="text"
                  required
                  value={form.zip}
                  placeholder="78960"
                  onChange={(e) => updateField("zip", e.target.value)}
                />
              </div>
            </div>

            <div className="add-schools-card-block">
              <h3 className="add-schools-card-heading">Principal Name</h3>
              <div className="add-schools-grid-2">
                <InputCommon
                  label="First Name"
                  name="principalFirst"
                  type="text"
                  required
                  value={form.principalFirst}
                  placeholder="Arpa"
                  onChange={(e) => updateField("principalFirst", e.target.value)}
                />
                <InputCommon
                  label="Last Name"
                  name="principalLast"
                  type="text"
                  required
                  value={form.principalLast}
                  placeholder="Sengupta"
                  onChange={(e) => updateField("principalLast", e.target.value)}
                />
              </div>
              <div className="add-schools-grid-2 add-schools-principal-bottom-row">
                <InputCommon
                  label="Email"
                  name="principalEmail"
                  type="email"
                  required
                  value={form.principalEmail}
                  placeholder="bidishabhowmick@gmail.com"
                  onChange={(e) => updateField("principalEmail", e.target.value)}
                />
                <div className="add-schools-phone-field">
                  <label className="add-schools-phone-label add-schools-phone-label-required">
                    Phone no.
                  </label>
                  <div className="add-schools-phone-composite">
                    <div className="add-schools-phone-code-wrap">
                      <InputCommon
                        name="phoneCode"
                        type="select"
                        value={form.phoneCode}
                        onChange={(e) => updateField("phoneCode", e.target.value)}
                        options={phoneCodeOptions}
                        placeholder="+1"
                      />
                    </div>
                    <div className="add-schools-phone-number-wrap">
                      <InputCommon
                        name="principalPhone"
                        type="text"
                        value={form.principalPhone}
                        placeholder="923 245 6980"
                        onChange={(e) => updateField("principalPhone", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddSchools;
