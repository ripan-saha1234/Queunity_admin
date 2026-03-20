import '../css/common-button.css';
function CommonButton({ text = '', img = '', backgroundColor, color, borderColor, onClick = () => { }, className = '', disabled = false }) {
  return (
    <button
      className={`common-button ${className} ${disabled ? 'disabled' : ''}`}
      style={{
        backgroundColor: backgroundColor,
        color: color,
        borderColor: borderColor,
        borderRadius: '10px',
        fontSize: '14px',
        fontWeight: '600',
        lineHeight: '24px'
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {img && <img src={img} alt="" />}
      {text && text}
    </button>
  );
}

export default CommonButton;