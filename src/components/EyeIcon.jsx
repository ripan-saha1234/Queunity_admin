export function EyeIcon({ color = "#006D70" }) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
                stroke={color}
                strokeWidth="2"
                strokeLinejoin="round"
            />
            <path
                d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                stroke={color}
                strokeWidth="2"
            />
        </svg>
    );
}