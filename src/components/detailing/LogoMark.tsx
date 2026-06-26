interface LogoMarkProps {
  size?: number;
  className?: string;
}

/**
 * Bespoke "CW" monogram — geometric line-based logo mark.
 * A refined "C" arc overlapping a "W" angular form, sharing a vertical axis.
 * Pure stroke work: inherits color via currentColor, zero fill.
 */
const LogoMark = ({ size = 28, className = "" }: LogoMarkProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* C — open arc on the left */}
    <path d="M22 10 A14 14 0 0 0 22 38" />
    {/* W — angular form on the right, sharing the vertical axis */}
    <polyline points="20,14 26,34 32,18 38,34 44,14" />
  </svg>
);

export default LogoMark;
