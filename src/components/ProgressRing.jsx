export function ProgressRing({ progress }) {
    const size = 58;
    const radius = 22;
    const stroke = 6;
    const normalizedRadius = radius - stroke / 2;
    const circumference = 2 * Math.PI * normalizedRadius;
    const dashOffset =
        circumference - (Math.max(0, Math.min(100, progress)) / 100) * circumference;

    return (
        <div className="add-cases-progress-ring-wrap">
            <svg width={size} height={size} viewBox="0 0 58 58" className="add-cases-progress-ring">
                <circle
                    cx="29"
                    cy="29"
                    r={normalizedRadius}
                    fill="none"
                    stroke="#E6E6E6"
                    strokeWidth={stroke}
                />
                <circle
                    cx="29"
                    cy="29"
                    r={normalizedRadius}
                    fill="none"
                    stroke="#95C63D"
                    strokeWidth={stroke}
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    strokeLinecap="round"
                    transform="rotate(-90 29 29)"
                />
            </svg>
            <div className="add-cases-progress-ring-text">{progress}%</div>
        </div>
    );
}