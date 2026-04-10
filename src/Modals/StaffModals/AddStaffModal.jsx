import { useState } from "react";
import "../Modals.css";
import "./add-staff-modal.css";
import CommonButton from "../../components/common-button";
import InputCommon from "../../components/input_common";
import NewCommonMultiFileUpload from "../../components/NewCommonMultiFileUpload";

const MAX_BYTES = 200 * 1024;

const roleOptions = [
  { label: "Role 1", value: "role1" },
  { label: "Role 2", value: "role2" },
  { label: "Role 3", value: "role3" },
];

const phoneCodeOptions = [
  { label: "+1", value: "+1" },
  { label: "+44", value: "+44" },
  { label: "+91", value: "+91" },
];

function AddStaffModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    firstName: "Bidisha",
    lastName: "Bhowmick",
    email: "bidishabhowmick@gmail.com",
    phoneCode: "+1",
    phone: "923 245 6980",
    role: "role1",
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [imageError, setImageError] = useState("");

  const updateField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiFileChange = (e) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setImageError("");
    if (files.length === 0) {
      setImageFiles([]);
      return;
    }
    for (const f of files) {
      if (!/^image\/(png|jpeg)$/i.test(f.type)) {
        setImageError("Please choose PNG or JPEG images only.");
        setImageFiles([]);
        return;
      }
      if (f.size > MAX_BYTES) {
        setImageError("Each image must be 200KB or smaller.");
        setImageFiles([]);
        return;
      }
    }
    setImageFiles(files);
  };

  const handleAdd = () => {
    if (onAdd) {
      onAdd({ ...form, imageFiles });
    }
    onClose();
  };

  return (
    <div className="modal_wrapper" role="presentation" onClick={onClose}>
      <div
        className="modal_body add-staff-modal"
        role="dialog"
        aria-labelledby="add-staff-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal_head">
          <h5 id="add-staff-modal-title">Add Staff</h5>
          <button
            type="button"
            className="add-evidence-modal__close"
            aria-label="Close"
            onClick={onClose}
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        <div className="add-staff-modal__grid-2">
          <InputCommon
            label="First Name"
            name="firstName"
            type="text"
            required
            value={form.firstName}
            placeholder="Bidisha"
            onChange={(e) => updateField("firstName", e.target.value)}
          />
          <InputCommon
            label="Last Name"
            name="lastName"
            type="text"
            required
            value={form.lastName}
            placeholder="Bhowmick"
            onChange={(e) => updateField("lastName", e.target.value)}
          />
        </div>

        <div className="add-staff-modal__grid-2 add-staff-modal__row-email-phone">
          <InputCommon
            label="Email"
            name="email"
            type="email"
            required
            value={form.email}
            placeholder="bidishabhowmick@gmail.com"
            onChange={(e) => updateField("email", e.target.value)}
          />
          <div className="add-staff-modal__phone-field">
            <label className="add-staff-modal__phone-label">
              Phone no<span className="add-staff-modal__required">*</span>
            </label>
            <div className="add-staff-modal__phone-composite">
              <div className="add-staff-modal__phone-code-wrap">
                <InputCommon
                  name="phoneCode"
                  type="select"
                  value={form.phoneCode}
                  onChange={(e) => updateField("phoneCode", e.target.value)}
                  options={phoneCodeOptions}
                  placeholder="+1"
                />
              </div>
              <div className="add-staff-modal__phone-number-wrap">
                <InputCommon
                  name="phone"
                  type="text"
                  value={form.phone}
                  placeholder="923 245 6980"
                  onChange={(e) => updateField("phone", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="add-staff-modal__full">
          <InputCommon
            label="Select Role"
            name="role"
            type="select"
            required
            value={form.role}
            onChange={(e) => updateField("role", e.target.value)}
            options={roleOptions}
            placeholder="Select role"
          />
        </div>

        <div className="radio_main add-staff-modal__file-upload">
          <label className="add-staff-modal__upload-label">Upload Image</label>
          <NewCommonMultiFileUpload onChange={handleMultiFileChange} />
          {imageError ? (
            <p className="add-staff-modal__image-error" role="alert">
              {imageError}
            </p>
          ) : null}
        </div>

        <div className="add-evidence-modal__footer">
          <CommonButton
            text="Add"
            backgroundColor="#95C63D"
            color="#141414"
            borderColor="#9FC53D"
            onClick={handleAdd}
          />
        </div>
      </div>
    </div>
  );
}

export default AddStaffModal;
