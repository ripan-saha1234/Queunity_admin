export function WizardSection({ iconBg, icon, title, subtitle, children }) {
  return (
    <section className="add-cases-section">
      <div className="add-cases-section-header">
        <div className="add-cases-section-icon">

          {icon}

        </div>

        <div className="add-cases-section-header-text">
          <h3 className="add-cases-section-title">{title}</h3>
          {subtitle ? <p className="add-cases-section-subtitle">{subtitle}</p> : null}
        </div>
      </div>
      <div className="add-cases-section-body">{children}</div>
    </section>
  );
}
