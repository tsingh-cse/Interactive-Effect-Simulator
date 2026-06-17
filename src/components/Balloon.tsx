/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface BalloonProps {
  color: string;
  highlightColor: string;
  size?: number;
  className?: string;
}

export default function Balloon({
  color,
  highlightColor,
  size = 44,
  className = "",
}: BalloonProps) {
  return (
    <svg
      viewBox="0 0 50 85"
      className={`${className} filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.12)]`}
      style={{ width: size, height: size * 1.7 }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Balloon string - thin elegant waving line */}
      <path
        d="M25 52 C22 60, 28 68, 23 76 C23 78, 25 80, 24 82"
        stroke="#cbd5e1"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Triangular balloon tie-knot */}
      <path
        d="M21 52 L29 52 L25 46 Z"
        fill={color}
        stroke={color}
        strokeWidth="1"
        strokeLinejoin="round"
      />

      {/* Balloon main oval body */}
      <ellipse
        cx="25"
        cy="26"
        rx="19"
        ry="23"
        fill={color}
      />

      {/* Elegant glass-like reflection sheen */}
      <path
        d="M13 15 C10 19, 10 27, 11 31 C12 27, 12 19, 14 15 Z"
        fill={highlightColor}
        opacity="0.45"
      />

      {/* Secondary micro soft crescent accent for three-dimensional aspect */}
      <path
        d="M33 34 C36 30, 37 22, 35 16 C34 20, 33 28, 30 33 Z"
        fill="#ffffff"
        opacity="0.15"
      />
    </svg>
  );
}
