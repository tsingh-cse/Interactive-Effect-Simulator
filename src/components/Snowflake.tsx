/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface SnowflakeProps {
  size?: number;
  className?: string;
}

export default function Snowflake({ size = 32, className = "" }: SnowflakeProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${className} text-sky-100 filter drop-shadow-[0_2px_4px_rgba(186,230,253,0.3)]`}
      style={{ width: size, height: size }}
    >
      {/* Principal orthogonal axes */}
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />

      {/* Diagonal axes */}
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      <line x1="4.93" y1="19.07" x2="19.07" y2="4.93" />

      {/* Outer V-branch details on positive vertical axis */}
      <path d="M10 5l2-2 2 2" />
      <path d="M10 8l2-2 2 2" />

      {/* Outer V-branch details on negative vertical axis */}
      <path d="M10 19l2 2 2-2" />
      <path d="M10 16l2-2 2 2" />

      {/* Outer V-branch details on negative horizontal axis */}
      <path d="M5 10l-2 2 2 2" />
      <path d="M8 10l-2 2 2 2" />

      {/* Outer V-branch details on positive horizontal axis */}
      <path d="M19 10l2 2-2 2" />
      <path d="M16 10l-2 2 2 2" />

      {/* Tiny connecting inner ring to complete symmetric crystalline aesthetic */}
      <circle cx="12" cy="12" r="2.5" className="stroke-sky-200/50 fill-sky-200/10" strokeWidth="1" />
    </svg>
  );
}
