import { useEffect, useState } from "react";
import "../Modals.css";
import "./role-modal.css";
import CommonButton from "../../components/common-button";
import CommonSelect from "../../components/common-select";
import InputCommon from "../../components/input_common";
import { useToast } from "../../components/toast/ToastProvider";
import { updateRole, validateRoleForm } from "../../api/roles";

const moduleOptions = [
  { label: "Schools", value: "Schools" },
  { label: "CMS", value: "CMS" },
  { label: "Offense", value: "Offense" },
  { label: "Camera", value: "Camera" },
];

const newPermission = () => ({
  module: "Camera",
  add: true,
  edit: false,
  view: true,
  delete: false,
});

function withCurrentOption(options, currentValue) {
  if (!currentValue) return options;
  if (options.some((opt) => opt.value === currentValue)) return options;
  return [{ label: currentValue, value: currentValue }, ...options];
}

function EditRoleModal({ initialRole, onClose, onSuccess }) {
  const { showToast } = useToast();
  const roleId = initialRole?.roleId || initialRole?.role_id || "";
  const [roleName, setRoleName] = useState(initialRole?.role || "");
  const [permissionRows, setPermissionRows] = useState(
    initialRole?.permissionRows?.length > 0
      ? initialRole.permissionRows
      : [newPermission()],
  );
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setRoleName(initialRole?.role || "");
    setPermissionRows(
      initialRole?.permissionRows?.length > 0
        ? initialRole.permissionRows
        : [newPermission()],
    );
  }, [initialRole]);

  const updatePermission = (index, key, value) => {
    setPermissionRows((prev) =>
      prev.map((row, idx) => (idx === index ? { ...row, [key]: value } : row)),
    );
  };

  const removePermission = (index) => {
    setPermissionRows((prev) => (prev.length === 1 ? prev : prev.filter((_, idx) => idx !== index)));
  };

  const handleClose = () => {
    if (!submitting) onClose?.();
  };

  const handleSave = async () => {
    if (!roleId) {
      showToast("Role ID is missing", "error");
      return;
    }

    const form = { roleName, permissionRows };
    const validationError = validateRoleForm(form);
    if (validationError) {
      showToast(validationError, "error");
      return;
    }

    setSubmitting(true);
    try {
      const response = await updateRole(
        roleId,
        form,
        {
          role_id: roleId,
          isactive: initialRole?.isactive ?? true,
        },
      );
      showToast(response?.message || "Role updated successfully", "success");
      onClose?.();
      await onSuccess?.();
    } catch (err) {
      showToast(err?.message || "Failed to update role", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal_wrapper" role="presentation" onClick={handleClose}>
      <div className="modal_body role-modal" role="dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal_head">
          <h5>Edit Role</h5>
          <button type="button" className="add-evidence-modal__close" aria-label="Close" onClick={handleClose}>
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        <InputCommon
          label="Role Name"
          name="roleName"
          type="text"
          required
          value={roleName}
          placeholder="Enter role name"
          disabled={submitting}
          onChange={(e) => setRoleName(e.target.value)}
        />

        <div className="role-modal__permission-wrap">
          <p className="role-modal__title">Permissions</p>
          {permissionRows.map((row, index) => (
            <div key={index} className="role-modal__permission-row">
              <div className="role-modal__permission-left">
                <span className="role-modal__idx">{index + 1}</span>
                <CommonSelect
                  label="Select Module"
                  name={`module-${index}`}
                  value={row.module}
                  onChange={(e) => updatePermission(index, "module", e.target.value)}
                  options={withCurrentOption(moduleOptions, row.module)}
                  placeholder="Select module"
                  searchPlaceholder="Search module..."
                />
              </div>
              <button
                type="button"
                className="role-modal__remove-btn"
                disabled={submitting}
                onClick={() => removePermission(index)}
              >
                <i className="fa-solid fa-xmark" />
              </button>
              <div className="role-modal__checks">
                {["add", "edit", "view", "delete"].map((item) => (
                  <label key={item}>
                    <input
                      type="checkbox"
                      checked={!!row[item]}
                      disabled={submitting}
                      onChange={(e) => updatePermission(index, item, e.target.checked)}
                    />
                    <span>{item[0].toUpperCase() + item.slice(1)}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button
            type="button"
            className="role-modal__add-permission"
            disabled={submitting}
            onClick={() => setPermissionRows((prev) => [...prev, newPermission()])}
          >
            Add Permission
          </button>
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

export default EditRoleModal;
