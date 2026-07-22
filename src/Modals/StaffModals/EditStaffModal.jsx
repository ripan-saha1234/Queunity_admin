import { useEffect, useMemo, useState } from "react";
import "../Modals.css";
import "./add-staff-modal.css";
import CommonButton from "../../components/common-button";
import InputCommon from "../../components/input_common";
import NewCommonMultiFileUpload from "../../components/NewCommonMultiFileUpload";
import { useToast } from "../../components/toast/ToastProvider";
import { uploadImage } from "../../api/cases";
import { listRoles, mapRoleToRow } from "../../api/roles";
import { updateStaff, validateStaffForm } from "../../api/staff";

const MAX_BYTES = 200 * 1024;

const phoneCodeOptions = [
  { label: "+1", value: "+1" },
  { label: "+44", value: "+44" },
  { label: "+91", value: "+91" },
];

function EditStaffModal({ onClose, onSuccess, initialData }) {
  const { showToast } = useToast();
  const staffId = initialData?.staffId || "";

  const derivedDefaults = useMemo(() => {
    const firstName =
      initialData?.firstName ||
      initialData?.companyName?.name?.trim().split(/\s+/).filter(Boolean)[0] ||
      "";
    const lastName =
      initialData?.lastName ||
      initialData?.companyName?.name
        ?.trim()
        .split(/\s+/)
        .filter(Boolean)
        .slice(1)
        .join(" ") ||
      "";

    const phoneCode =
      initialData?.phoneCode ||
      phoneCodeOptions.find((opt) =>
        (initialData?.phone || "").startsWith(opt.value),
      )?.value ||
      "+1";
    const phone =
      initialData?.phoneNumber ||
      (initialData?.phone || "").replace(phoneCode, "").trim();

    return {
      firstName,
      lastName,
      email: initialData?.email && initialData.email !== "-" ? initialData.email : "",
      phoneCode,
      phone,
      role: initialData?.roleId || "",
    };
  }, [initialData]);

  const [form, setForm] = useState(derivedDefaults);
  const [roleOptions, setRoleOptions] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [existingPhotoUrl, setExistingPhotoUrl] = useState(
    initialData?.photoUrl || "",
  );
  const [imageError, setImageError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setForm(derivedDefaults);
    setExistingPhotoUrl(initialData?.photoUrl || "");
    setImageFiles([]);
  }, [derivedDefaults, initialData?.photoUrl]);

  useEffect(() => {
    let cancelled = false;

    const loadRoles = async () => {
      try {
        const response = await listRoles({ page: 1, pageSize: 100 });
        if (cancelled) return;
        const options = (response.data ?? []).map((item) => {
          const row = mapRoleToRow(item);
          return { label: row.role, value: row.roleId };
        });

        const currentRoleId = initialData?.roleId;
        if (
          currentRoleId &&
          !options.some((opt) => opt.value === currentRoleId)
        ) {
          options.unshift({
            label: initialData?.role || currentRoleId,
            value: currentRoleId,
          });
        }

        setRoleOptions(options);
        setForm((prev) => ({
          ...prev,
          role: prev.role || currentRoleId || options[0]?.value || "",
        }));
      } catch (err) {
        if (!cancelled) {
          showToast(err?.message || "Failed to load roles", "error");
        }
      }
    };

    loadRoles();

    return () => {
      cancelled = true;
    };
  }, [initialData?.roleId, initialData?.role, showToast]);

  const updateField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiFileChange = (e) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setImageError("");
    if (files.length === 0) {
      setImageFiles([]);
      setExistingPhotoUrl(initialData?.photoUrl || "");
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
    setExistingPhotoUrl("");
    setImageFiles(files);
  };

  const handleClose = () => {
    if (!submitting) onClose?.();
  };

  const handleSave = async () => {
    if (!staffId) {
      showToast("Staff ID is missing", "error");
      return;
    }

    const validationError = validateStaffForm(form);
    if (validationError) {
      showToast(validationError, "error");
      return;
    }

    setSubmitting(true);
    try {
      let photoUrl = existingPhotoUrl || "";
      if (imageFiles[0]) {
        photoUrl = await uploadImage(imageFiles[0]);
      }

      const response = await updateStaff(
        staffId,
        { ...form, photoUrl },
        {
          role_id: form.role,
          photo_url: photoUrl,
          isactive: initialData?.isactive ?? true,
        },
      );
      showToast(response?.message || "Staff updated successfully", "success");
      await onSuccess?.();
      onClose?.();
    } catch (err) {
      showToast(err?.message || "Failed to update staff", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal_wrapper" role="presentation" onClick={handleClose}>
      <div
        className="modal_body add-staff-modal"
        role="dialog"
        aria-labelledby="edit-staff-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal_head">
          <h5 id="edit-staff-modal-title">Edit Staff</h5>
          <button
            type="button"
            className="add-evidence-modal__close"
            aria-label="Close"
            onClick={handleClose}
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
            placeholder="Enter first name"
            value={form.firstName}
            disabled={submitting}
            onChange={(e) => updateField("firstName", e.target.value)}
          />
          <InputCommon
            label="Last Name"
            name="lastName"
            type="text"
            required
            placeholder="Enter last name"
            value={form.lastName}
            disabled={submitting}
            onChange={(e) => updateField("lastName", e.target.value)}
          />
        </div>

        <div className="add-staff-modal__grid-2 add-staff-modal__row-email-phone">
          <InputCommon
            label="Email"
            name="email"
            placeholder="Enter email"
            type="email"
            required
            value={form.email}
            disabled={submitting}
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
                  disabled={submitting}
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
                  placeholder="Enter phone number"
                  disabled={submitting}
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
            disabled={submitting}
            onChange={(e) => updateField("role", e.target.value)}
            options={roleOptions}
            placeholder="Select role"
          />
        </div>

        <div className="radio_main add-staff-modal__file-upload">
          <label className="add-staff-modal__upload-label">Upload Image</label>
          <NewCommonMultiFileUpload
            removable
            existingUrls={existingPhotoUrl ? [existingPhotoUrl] : []}
            onRemoveExisting={() => {
              setExistingPhotoUrl("");
              setImageFiles([]);
            }}
            onChange={handleMultiFileChange}
          />
          {imageError ? (
            <p className="add-staff-modal__image-error" role="alert">
              {imageError}
            </p>
          ) : null}
        </div>

        <div className="add-evidence-modal__footer">
          <CommonButton
            text={submitting ? "Saving..." : "Save"}
            backgroundColor="#95C63D"
            color="#141414"
            borderColor="#9FC53D"
            disabled={submitting}
            onClick={handleSave}
          />
        </div>
      </div>
    </div>
  );
}

export default EditStaffModal;
