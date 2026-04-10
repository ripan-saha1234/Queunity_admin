import { useState } from "react";
import "../Modals.css";
import "./role-modal.css";
import CommonButton from "../../components/common-button";
import CommonSelect from "../../components/common-select";

const roleOptions = [
  { label: "Role 1", value: "Role 1" },
  { label: "Role 2", value: "Role 2" },
  { label: "Role 3", value: "Role 3" },
  { label: "Role 4", value: "Role 4" },
];

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

function AddRoleModal({ onClose, onAdd }) {
  const [roleName, setRoleName] = useState("Role 1");
  const [permissionRows, setPermissionRows] = useState([newPermission()]);

  const updatePermission = (index, key, value) => {
    setPermissionRows((prev) =>
      prev.map((row, idx) => (idx === index ? { ...row, [key]: value } : row)),
    );
  };

  const removePermission = (index) => {
    setPermissionRows((prev) => (prev.length === 1 ? prev : prev.filter((_, idx) => idx !== index)));
  };

  return (
    <div className="modal_wrapper" role="presentation" onClick={onClose}>
      <div className="modal_body role-modal" role="dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal_head">
          <h5>Add Role</h5>
          <button type="button" className="add-evidence-modal__close" aria-label="Close" onClick={onClose}>
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        <CommonSelect
          label="Role Name"
          name="roleName"
          required
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          options={roleOptions}
          placeholder="Select role"
          searchPlaceholder="Search role..."
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
                  options={moduleOptions}
                  placeholder="Select module"
                  searchPlaceholder="Search module..."
                />
              </div>
              <button type="button" className="role-modal__remove-btn" onClick={() => removePermission(index)}>
                <i className="fa-solid fa-xmark" />
              </button>
              <div className="role-modal__checks">
                {["add", "edit", "view", "delete"].map((item) => (
                  <label key={item}>
                    <input
                      type="checkbox"
                      checked={!!row[item]}
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
            onClick={() => setPermissionRows((prev) => [...prev, newPermission()])}
          >
            Add Permission
          </button>
        </div>

        <div className="add-evidence-modal__footer">
          <CommonButton
            text="Add"
            backgroundColor="#95C63D"
            color="#141414"
            borderColor="#9FC53D"
            onClick={() => {
              onAdd?.({ roleName, permissionRows });
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default AddRoleModal;
