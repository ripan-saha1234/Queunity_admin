import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import usePageHeader from "../../../hooks/use-page-header";
import { useToast } from "../../../components/toast/ToastProvider";
import { addCharity, validateCharityForm } from "../../../api/charity";
import { uploadImage } from "../../../api/cases";
import InputCommon from "../../../components/input_common";
import NewCommonMultiFileUpload from "../../../components/NewCommonMultiFileUpload";
import { WizardSection } from "../../../components/WizardSection";
import { SectionRequired } from "../../../components/SectionRequired";
import { ChoiceRadio } from "../../../components/ChoiceRadio";
import "../../cases/add-cases/add-cases.css";
import "./add-charity.css";

async function uploadFiles(files) {
  const list = Array.from(files || []);
  if (!list.length) return [];
  return Promise.all(list.map((file) => uploadImage(file)));
}

function AddCharity() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    charityName: "",
    charityType: "non_profit",
    charityCategory: "",
    memberCount: "",
    beneficiaryCount: "",
    country: "",
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    city: "",
    state: "",
    zip: "",
    contactFirst: "",
    contactLast: "",
    contactEmail: "",
    phoneCode: "+1",
    contactPhone: "",
    description: "",
    logoFile: null,
    galleryFiles: [],
    documentFiles: [],
  });

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

  const handleAddCharity = useCallback(async () => {
    const validationError = validateCharityForm(form);
    if (validationError) {
      showToast(validationError, "error");
      return;
    }

    setSubmitting(true);
    try {
      let charityLogoUrl = "";
      if (form.logoFile) {
        charityLogoUrl = await uploadImage(form.logoFile);
      }

      const galleryUrls = await uploadFiles(form.galleryFiles);
      const documentUrls = await uploadFiles(form.documentFiles);

      const countryLabel =
        countryOptions.find((opt) => opt.value === form.country)?.label || form.country;
      const stateLabel =
        stateOptions.find((opt) => opt.value === form.state)?.label || form.state;

      const response = await addCharity({
        ...form,
        charityLogoUrl,
        galleryUrls,
        documentUrls,
        countryLabel,
        stateLabel,
      });

      showToast(response?.message || "Charity added successfully", "success");
      navigate("/charity", { state: { refreshCharities: true } });
    } catch (error) {
      showToast(error?.message || "Failed to add charity", "error");
    } finally {
      setSubmitting(false);
    }
  }, [form, navigate, showToast, countryOptions, stateOptions]);

  const headerButtons = useMemo(
    () => [
      {
        type: "button",
        text: "Cancel",
        onClick: () => navigate("/charity"),
        backgroundColor: "transparent",
        textColor: "#141414",
        borderColor: "transparent",
        disabled: submitting,
      },
      {
        type: "button",
        text: submitting ? "Adding..." : "Add",
        onClick: handleAddCharity,
        backgroundColor: "#95C63D",
        textColor: "#141414",
        borderColor: "#9FC53D",
        disabled: submitting,
      },
    ],
    [navigate, handleAddCharity, submitting],
  );

  usePageHeader({
    title: "Add Charity",
    breadcrumbs: [
      { title: "Charity", link: "/charity" },
      { title: "Add Charity", link: "/charity/add-charity" },
    ],
    buttons: headerButtons,
  });

  const updateField = (name, value) => setForm((prev) => ({ ...prev, [name]: value }));

  return (
    <div className="add-charity-page">
      <div className="add-charity-main-grid">
        <div className="add-charity-col-left">
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
              <NewCommonMultiFileUpload
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  updateField("logoFile", file);
                }}
              />
            </div>

            <div className="add-charity-description-field">
              <label className="add-charity-description-label">Description</label>
              <textarea
                name="description"
                className="add-charity-description-textarea"
                required
                value={form.description}
                placeholder="Describe the charity mission and work"
                onChange={(e) => updateField("description", e.target.value)}
              />
            </div>

            <div>
              <SectionRequired>Charity category</SectionRequired>
              <div className="add-charity-radio-row">
                <ChoiceRadio name="charityCategory" label="Public" value="public" checked={form.charityCategory === "public"} onChange={(v) => updateField("charityCategory", v)} />
                <ChoiceRadio name="charityCategory" label="Private" value="private" checked={form.charityCategory === "private"} onChange={(v) => updateField("charityCategory", v)} />
                <ChoiceRadio name="charityCategory" label="Community" value="community" checked={form.charityCategory === "community"} onChange={(v) => updateField("charityCategory", v)} />
              </div>
            </div>
          </WizardSection>
          <div className="charity-radio-main" style={{ marginTop: 20 }}>
              <label>Gallery</label>
              <NewCommonMultiFileUpload
                onChange={(e) => {
                  updateField("galleryFiles", Array.from(e.target.files || []));
                }}
              />
            </div>


        </div>

        <div className="add-charity-col-right">
          <div className="add-charity-card">
            <div className="add-charity-card-block">
              <h3 className="add-charity-card-heading">Address</h3>
              <InputCommon label="Country" name="country" type="select" required value={form.country} onChange={(e) => updateField("country", e.target.value)} options={countryOptions} placeholder="Select country" />
              <div className="add-charity-grid-2">
                <InputCommon label="Address Line 1" name="addressLine1" type="text" required value={form.addressLine1} placeholder="1234 Lorem Street" onChange={(e) => updateField("addressLine1", e.target.value)} />
                <InputCommon label="Address Line 2" name="addressLine2" type="text" value={form.addressLine2} placeholder="Card Square" onChange={(e) => updateField("addressLine2", e.target.value)} />
              </div>
              <div className="add-charity-grid-2">
                <InputCommon label="Landmark" name="landmark" type="text" value={form.landmark} placeholder="Near Lorem Park" onChange={(e) => updateField("landmark", e.target.value)} />
                <InputCommon label="City" name="city" type="text" required value={form.city} placeholder="Card Square" onChange={(e) => updateField("city", e.target.value)} />
              </div>
              <div className="add-charity-grid-2">
                <InputCommon label="State" name="state" type="select" required value={form.state} onChange={(e) => updateField("state", e.target.value)} options={stateOptions} placeholder="Select state" />
                <InputCommon label="Zip code/ Postal" name="zip" type="text" required value={form.zip} placeholder="78960" onChange={(e) => updateField("zip", e.target.value)} />
              </div>
            </div>

            <div className="add-charity-card-block">
              <h3 className="add-charity-card-heading">Contact Person</h3>
              <div className="add-charity-grid-2">
                <InputCommon label="First Name" name="contactFirst" type="text" required value={form.contactFirst} placeholder="Arpa" onChange={(e) => updateField("contactFirst", e.target.value)} />
                <InputCommon label="Last Name" name="contactLast" type="text" required value={form.contactLast} placeholder="Sengupta" onChange={(e) => updateField("contactLast", e.target.value)} />
              </div>
              <div className="add-charity-grid-2 add-charity-contact-bottom-row">
                <InputCommon label="Email" name="contactEmail" type="email" required value={form.contactEmail} placeholder="bidishabhowmick@gmail.com" onChange={(e) => updateField("contactEmail", e.target.value)} />
                <div className="add-charity-phone-field">
                  <label className="add-charity-phone-label add-charity-phone-label-required">Phone no.</label>
                  <div className="add-charity-phone-composite">
                    <div className="add-charity-phone-code-wrap">
                      <InputCommon name="phoneCode" type="select" value={form.phoneCode} onChange={(e) => updateField("phoneCode", e.target.value)} options={phoneCodeOptions} placeholder="+1" />
                    </div>
                    <div className="add-charity-phone-number-wrap">
                      <InputCommon name="contactPhone" type="text" value={form.contactPhone} placeholder="923 245 6980" onChange={(e) => updateField("contactPhone", e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="charity-radio-main" style={{ marginTop: 20 }}>
              <label>Upload Document (Certificate / Registration)</label>
              <NewCommonMultiFileUpload
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

export default AddCharity;
