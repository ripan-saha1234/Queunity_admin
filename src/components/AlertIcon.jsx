export function AlertIcon({ color = "#FF7A59" }) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M12 9v4"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M12 17h.01"
                stroke={color}
                strokeWidth="3"
                strokeLinecap="round"
            />
            <path
                d="M10.3 4.6 2.6 18a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 4.6a2 2 0 0 0-3.4 0Z"
                stroke={color}
                strokeWidth="2"
                strokeLinejoin="round"
            />
        </svg>
    );
}
