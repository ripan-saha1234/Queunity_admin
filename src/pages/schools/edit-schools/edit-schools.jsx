import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import usePageHeader from "../../../hooks/use-page-header";
import { useToast } from "../../../components/toast/ToastProvider";
import {
  getSchoolById,
  mapApiSchoolToForm,
  updateSchool,
  validateSchoolForm,
} from "../../../api/school";
import { uploadImage } from "../../../api/cases";
import InputCommon from "../../../components/input_common";
import NewCommonMultiFileUpload from "../../../components/NewCommonMultiFileUpload";
import { WizardSection } from "../../../components/WizardSection";
import { SectionRequired } from "../../../components/SectionRequired";
import { ChoiceRadio } from "../../../components/ChoiceRadio";
import "../../cases/add-cases/add-cases.css";
import "./edit-schools.css";

const EMPTY_FORM = {
  schoolName: "",
  schoolType: "",
  schoolCategory: "",
  facultyCount: "",
  studentCount: "",
  country: "",
  countryLabel: "",
  addressLine1: "",
  addressLine2: "",
  landmark: "",
  city: "",
  state: "",
  stateLabel: "",
  zip: "",
  principalFirst: "",
  principalLast: "",
  principalEmail: "",
  phoneCode: "",
  principalPhone: "",
  logoFile: null,
  schoolLogoUrl: "",
};

function EditSchools() {
  const navigate = useNavigate();
  const { schoolId } = useParams();
  const { showToast } = useToast();
  const [form, setForm] = useState(EMPTY_FORM);
  const [schoolMeta, setSchoolMeta] = useState({
    school_id: "",
    created_at: "",
    isactive: true,
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

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

  useEffect(() => {
    if (!schoolId) {
      setError("School ID is missing");
      setLoading(false);
      return;
    }

    let cancelled = false;

    const loadSchool = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getSchoolById(schoolId);
        if (cancelled) return;

        setSchoolMeta({
          school_id: data.school_id || schoolId,
          created_at: data.created_at || "",
          isactive: data.isactive ?? true,
        });
        setForm(mapApiSchoolToForm(data, { countryOptions, stateOptions }));
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Failed to load school details");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadSchool();

    return () => {
      cancelled = true;
    };
  }, [schoolId, countryOptions, stateOptions]);

  const handleSaveSchool = useCallback(async () => {
    if (!schoolId) {
      showToast("School ID is missing", "error");
      return;
    }

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
        countryOptions.find((opt) => opt.value === form.country)?.label ||
        form.countryLabel ||
        form.country;
      const stateLabel =
        stateOptions.find((opt) => opt.value === form.state)?.label ||
        form.stateLabel ||
        form.state;

      const response = await updateSchool(
        schoolId,
        {
          ...form,
          schoolLogoUrl,
          countryLabel,
          stateLabel,
        },
        schoolMeta,
      );

      showToast(response?.message || "School updated successfully", "success");
      navigate(`/schools/details/${schoolId}`);
    } catch (err) {
      showToast(err?.message || "Failed to update school", "error");
    } finally {
      setSubmitting(false);
    }
  }, [form, schoolId, schoolMeta, navigate, showToast, countryOptions, stateOptions]);

  const headerButtons = useMemo(
    () => [
      {
        type: "button",
        text: "Cancel",
        onClick: () => navigate(schoolId ? `/schools/details/${schoolId}` : "/schools"),
        backgroundColor: "transparent",
        textColor: "#141414",
        borderColor: "transparent",
        disabled: submitting || loading,
      },
      {
        type: "button",
        text: submitting ? "Saving..." : "Save",
        onClick: handleSaveSchool,
        backgroundColor: "#95C63D",
        textColor: "#141414",
        borderColor: "#9FC53D",
        disabled: submitting || loading,
      },
    ],
    [navigate, schoolId, handleSaveSchool, submitting, loading],
  );

  usePageHeader({
    title: "Edit School",
    breadcrumbs: [
      { title: "Schools", link: "/schools" },
      {
        title: form.schoolName || "Edit School",
        link: schoolId ? `/schools/edit-schools/${schoolId}` : "/schools",
      },
    ],
    buttons: headerButtons,
  });

  const updateField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <div className="edit-schools-page">
        <div className="table1-no-data-container">
          <p>Loading school details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="edit-schools-page">
        <div className="table1-no-data-container">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-schools-page">
      <div className="edit-schools-main-grid">
        <div className="edit-schools-col-left">
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
              {form.schoolLogoUrl && !form.logoFile ? (
                <div style={{ marginBottom: 12 }}>
                  <img
                    src={form.schoolLogoUrl}
                    alt="Current school logo"
                    style={{
                      width: 100,
                      height: 100,
                      objectFit: "cover",
                      borderRadius: 8,
                      border: "1px solid #e0e0e0",
                    }}
                  />
                </div>
              ) : null}
              <NewCommonMultiFileUpload
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  updateField("logoFile", file);
                }}
              />
            </div>

            <div>
              <SectionRequired>School type</SectionRequired>
              <div className="edit-schools-radio-row">
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
              <div className="edit-schools-radio-row">
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

          <section className="edit-schools-plain-section">
            <h3 className="edit-schools-plain-section-title">Other Details</h3>
            <div className="edit-schools-plain-section-body">
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

        <div className="edit-schools-col-right">
          <div className="edit-schools-card">
            <div className="edit-schools-card-block">
              <h3 className="edit-schools-card-heading">Address</h3>
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
              <div className="edit-schools-grid-2">
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
              <div className="edit-schools-grid-2">
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
              <div className="edit-schools-grid-2">
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

            <div className="edit-schools-card-block">
              <h3 className="edit-schools-card-heading">Principal Name</h3>
              <div className="edit-schools-grid-2">
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
              <div className="edit-schools-grid-2 edit-schools-principal-bottom-row">
                <InputCommon
                  label="Email"
                  name="principalEmail"
                  type="email"
                  required
                  value={form.principalEmail}
                  placeholder="bidishabhowmick@gmail.com"
                  onChange={(e) => updateField("principalEmail", e.target.value)}
                />
                <div className="edit-schools-phone-field">
                  <label className="edit-schools-phone-label edit-schools-phone-label-required">
                    Phone no.
                  </label>
                  <div className="edit-schools-phone-composite">
                    <div className="edit-schools-phone-code-wrap">
                      <InputCommon
                        name="phoneCode"
                        type="select"
                        value={form.phoneCode}
                        onChange={(e) => updateField("phoneCode", e.target.value)}
                        options={phoneCodeOptions}
                        placeholder="+1"
                      />
                    </div>
                    <div className="edit-schools-phone-number-wrap">
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

export default EditSchools;
