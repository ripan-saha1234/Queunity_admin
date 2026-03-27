import React from "react";

const InputCommon = ({
  label,
  name,
  type = "text", // input or select
  value,
  onChange,
  placeholder = "",
  required = false,
  disabled = false,
  options = [], // for select
}) => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    marginBottom: "16px",
    width: "100%",
  };

  const labelStyle = {
    fontSize: "14px",
    fontWeight: "500",
    color: "#333",
  };

  const inputStyle = {
    height: "50px",
    padding: "0 12px",
    border: "1px solid #dcdcdc",
    borderRadius: "8px",
    fontSize: "14px",
    outline: "none",
    transition: "0.2s ease",
    paddingRight: "12px",
  };

  return (
    <div className="input-common-wrapper" style={containerStyle}>
      {label && (
        <label style={labelStyle}>
          {label} {required && <span style={{ color: "red" }}>*</span>}
        </label>
      )}

      {/* SELECT */}
      {type === "select" ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className="input-common-select"
          style={inputStyle}
        >
          <option value="">{placeholder || "Select"}</option>

          {options.map((opt, index) => (
            <option key={index} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        /* INPUT */
        <input
          type={type}
          name={name}
          // value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className="input-common-input"
          style={inputStyle}
        />
      )}
    </div>
  );
};

export default InputCommon;