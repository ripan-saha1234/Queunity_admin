export function CalendarIcon({ color = "#1E90FF" }) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M7 3v2M17 3v2M4 8h16M6.5 21h11c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-11c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2Z"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}