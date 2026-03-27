export function FingerprintIcon({ color = "#AA3BFF" }) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M7 10.5c0-2.5 2-4.5 4.5-4.5S16 8 16 10.5V15c0 2.2-1.8 4-4 4-2.2 0-4-1.8-4-4V10.5Z"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M5 12v3c0 4 3.1 7 7 7s7-3 7-7v-5"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}