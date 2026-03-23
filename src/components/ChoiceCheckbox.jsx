export function ChoiceCheckbox({ name, label, value, checked, onChange }) {
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
