import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import usePageHeader from "../../../hooks/use-page-header";
import { useToast } from "../../../components/toast/ToastProvider";
import {
  getCharityById,
  mapApiCharityToForm,
  updateCharity,
  validateCharityForm,
} from "../../../api/charity";
import { uploadImage } from "../../../api/cases";
import InputCommon from "../../../components/input_common";
import NewCommonMultiFileUpload from "../../../components/NewCommonMultiFileUpload";
import { WizardSection } from "../../../components/WizardSection";
import { SectionRequired } from "../../../components/SectionRequired";
import { ChoiceRadio } from "../../../components/ChoiceRadio";
import "../../cases/add-cases/add-cases.css";
import "./edit-charity.css";

async function uploadFiles(files) {
  const list = Array.from(files || []);
  if (!list.length) return [];
  return Promise.all(list.map((file) => uploadImage(file)));
}

const EMPTY_FORM = {
  charityName: "",
  charityType: "non_profit",
  charityCategory: "",
  memberCount: "",
  beneficiaryCount: "",
  country: "",
  countryLabel: "",
  addressLine1: "",
  addressLine2: "",
  landmark: "",
  city: "",
  state: "",
  stateLabel: "",
  zip: "",
  contactFirst: "",
  contactLast: "",
  contactEmail: "",
  phoneCode: "+1",
  contactPhone: "",
  description: "",
  logoFile: null,
  charityLogoUrl: "",
  galleryUrls: [],
  documentUrls: [],
  galleryFiles: [],
  documentFiles: [],
};

function EditCharity() {
  const navigate = useNavigate();
  const { charityId } = useParams();
  const { showToast } = useToast();
  const [form, setForm] = useState(EMPTY_FORM);
  const [charityMeta, setCharityMeta] = useState({
    created_at: "",
    created_by: "admin",
    isactive: true,
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const el = document.querySelector(".common-layout-content");
    if (el) el.scrollTop = 0;
  }, []);

  const countryOptions = useMemo(() => [{ label: "United States", value: "us" }], []);
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
    if (!charityId) {
      setError("Charity ID is missing");
      setLoading(false);
      return;
    }

    let cancelled = false;

    const loadCharity = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getCharityById(charityId);
        if (cancelled) return;

        setCharityMeta({
          created_at: data.created_at || "",
          created_by: data.created_by || "admin",
          isactive: data.isactive ?? true,
        });
        setForm(mapApiCharityToForm(data, { countryOptions, stateOptions }));
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Failed to load charity details");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadCharity();

    return () => {
      cancelled = true;
    };
  }, [charityId, countryOptions, stateOptions]);

  const handleSaveCharity = useCallback(async () => {
    if (!charityId) {
      showToast("Charity ID is missing", "error");
      return;
    }

    const validationError = validateCharityForm(form);
    if (validationError) {
      showToast(validationError, "error");
      return;
    }

    setSubmitting(true);
    try {
      let charityLogoUrl = form.charityLogoUrl || "";
      if (form.logoFile) {
        charityLogoUrl = await uploadImage(form.logoFile);
      }

      const newGalleryUrls = await uploadFiles(form.galleryFiles);
      const newDocumentUrls = await uploadFiles(form.documentFiles);

      const countryLabel =
        countryOptions.find((opt) => opt.value === form.country)?.label ||
        form.countryLabel ||
        form.country;
      const stateLabel =
        stateOptions.find((opt) => opt.value === form.state)?.label ||
        form.stateLabel ||
        form.state;

      const response = await updateCharity(
        charityId,
        {
          ...form,
          charityLogoUrl,
          galleryUrls: [...(form.galleryUrls || []), ...newGalleryUrls],
          documentUrls: [...(form.documentUrls || []), ...newDocumentUrls],
          countryLabel,
          stateLabel,
        },
        charityMeta,
      );

      showToast(response?.message || "Charity updated successfully", "success");
      navigate(`/charity/details/${charityId}`);
    } catch (err) {
      showToast(err?.message || "Failed to update charity", "error");
    } finally {
      setSubmitting(false);
    }
  }, [form, charityId, charityMeta, navigate, showToast, countryOptions, stateOptions]);

  const headerButtons = useMemo(
    () => [
      {
        type: "button",
        text: "Cancel",
        onClick: () =>
          navigate(charityId ? `/charity/details/${charityId}` : "/charity"),
        backgroundColor: "transparent",
        textColor: "#141414",
        borderColor: "transparent",
        disabled: submitting || loading,
      },
      {
        type: "button",
        text: submitting ? "Saving..." : "Save",
        onClick: handleSaveCharity,
        backgroundColor: "#95C63D",
        textColor: "#141414",
        borderColor: "#9FC53D",
        disabled: submitting || loading,
      },
    ],
    [navigate, charityId, handleSaveCharity, submitting, loading],
  );

  usePageHeader({
    title: "Edit Charity",
    breadcrumbs: [
      { title: "Charity", link: "/charity" },
      {
        title: form.charityName || "Edit Charity",
        link: charityId ? `/charity/edit-charity/${charityId}` : "/charity",
      },
    ],
    buttons: headerButtons,
  });

  const updateField = (name, value) => setForm((prev) => ({ ...prev, [name]: value }));

  if (loading) {
    return (
      <div className="edit-charity-page">
        <div className="table1-no-data-container">
          <p>Loading charity details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="edit-charity-page">
        <div className="table1-no-data-container">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-charity-page">
      <div className="edit-charity-main-grid">
        <div className="edit-charity-col-left">
          <WizardSection title="Basic Details">
            <InputCommon
              label="Charity Name"
              name="charityName"
              type="text"
              required
              value={form.charityName}
              placeholder="Hope Foundation"
              onChange={(e) => updateField("charityName", e.target.value)}
            />

            <div className="charity-radio-main" style={{ marginTop: 20 }}>
              <label>Upload Charity Logo</label>
              {form.charityLogoUrl && !form.logoFile ? (
                <div style={{ marginBottom: 12 }}>
                  <img
                    src={form.charityLogoUrl}
                    alt="Current charity logo"
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

            <div className="edit-charity-description-field">
              <label className="edit-charity-description-label">Description</label>
              <textarea
                name="description"
                className="edit-charity-description-textarea"
                required
                value={form.description}
                placeholder="Describe the charity mission and work"
                onChange={(e) => updateField("description", e.target.value)}
              />
            </div>

            <div>
              <SectionRequired>Charity category</SectionRequired>
              <div className="edit-charity-radio-row">
                <ChoiceRadio
                  name="charityCategory"
                  label="Public"
                  value="public"
                  checked={form.charityCategory === "public"}
                  onChange={(v) => updateField("charityCategory", v)}
                />
                <ChoiceRadio
                  name="charityCategory"
                  label="Private"
                  value="private"
                  checked={form.charityCategory === "private"}
                  onChange={(v) => updateField("charityCategory", v)}
                />
                <ChoiceRadio
                  name="charityCategory"
                  label="Community"
                  value="community"
                  checked={form.charityCategory === "community"}
                  onChange={(v) => updateField("charityCategory", v)}
                />
              </div>
            </div>
          </WizardSection>

          <div className="charity-radio-main" style={{ marginTop: 20 }}>
            <label>Gallery</label>
            <NewCommonMultiFileUpload
              existingUrls={form.galleryUrls}
              onChange={(e) => {
                updateField("galleryFiles", Array.from(e.target.files || []));
              }}
            />
          </div>
        </div>

        <div className="edit-charity-col-right">
          <div className="edit-charity-card">
            <div className="edit-charity-card-block">
              <h3 className="edit-charity-card-heading">Address</h3>
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
              <div className="edit-charity-grid-2">
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
              <div className="edit-charity-grid-2">
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
              <div className="edit-charity-grid-2">
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

            <div className="edit-charity-card-block">
              <h3 className="edit-charity-card-heading">Contact Person</h3>
              <div className="edit-charity-grid-2">
                <InputCommon
                  label="First Name"
                  name="contactFirst"
                  type="text"
                  required
                  value={form.contactFirst}
                  placeholder="Arpa"
                  onChange={(e) => updateField("contactFirst", e.target.value)}
                />
                <InputCommon
                  label="Last Name"
                  name="contactLast"
                  type="text"
                  required
                  value={form.contactLast}
                  placeholder="Sengupta"
                  onChange={(e) => updateField("contactLast", e.target.value)}
                />
              </div>
              <div className="edit-charity-grid-2 edit-charity-contact-bottom-row">
                <InputCommon
                  label="Email"
                  name="contactEmail"
                  type="email"
                  required
                  value={form.contactEmail}
                  placeholder="bidishabhowmick@gmail.com"
                  onChange={(e) => updateField("contactEmail", e.target.value)}
                />
                <div className="edit-charity-phone-field">
                  <label className="edit-charity-phone-label edit-charity-phone-label-required">
                    Phone no.
                  </label>
                  <div className="edit-charity-phone-composite">
                    <div className="edit-charity-phone-code-wrap">
                      <InputCommon
                        name="phoneCode"
                        type="select"
                        value={form.phoneCode}
                        onChange={(e) => updateField("phoneCode", e.target.value)}
                        options={phoneCodeOptions}
                        placeholder="+1"
                      />
                    </div>
                    <div className="edit-charity-phone-number-wrap">
                      <InputCommon
                        name="contactPhone"
                        type="text"
                        value={form.contactPhone}
                        placeholder="923 245 6980"
                        onChange={(e) => updateField("contactPhone", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="charity-radio-main" style={{ marginTop: 20 }}>
              <label>Upload Document (Certificate / Registration)</label>
              <NewCommonMultiFileUpload
                existingUrls={form.documentUrls}
                onChange={(e) => {
                  updateField("documentFiles", Array.from(e.target.files || []));
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCharity;
