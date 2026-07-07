import './common-loader.css';

function CommonLoader({ text = 'Loading...', size = 20 }) {
  const compact = size <= 16;

  return (
    <div className={`common-loader${compact ? ' common-loader--compact' : ''}`}>
      <div className="common-loader__spinner" aria-hidden="true" />
      {text ? <p className="common-loader__text">{text}</p> : null}
    </div>
  );
}

export default CommonLoader;
