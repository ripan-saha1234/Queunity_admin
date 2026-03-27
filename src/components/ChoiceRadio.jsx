export function ChoiceRadio({ name, label, value, checked, onChange }) {
    return (
        <label className="add-cases-choice add-cases-choice-radio">
            <input
                type="radio"
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