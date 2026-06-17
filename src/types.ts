/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SnowflakeItem {
  id: string;
  x: number;          // starting horizontal position (%)
  speed: number;      // animation duration (seconds)
  size: number;       // element size (pixels)
  opacity: number;    // nominal opacity (0.4 to 0.9)
  drift: number;      // horizontal movement range (-1 to 1)
  rotation: number;   // initial rotation angle in degrees
}

export interface BalloonItem {
  id: string;
  x: number;          // starting horizontal position (%)
  speed: number;      // animation duration (seconds)
  size: number;       // element width (pixels)
  opacity: number;    // nominal opacity (0.7 to 0.95)
  drift: number;      // horizontal wind sway range (-1 to 1)
  color: string;      // tailwind hex or rgb representing balloon color
  highlightColor: string; // hex color representing sheen highlights
  rotateStart: number;    // starting rotation offset
}

export interface SimulationState {
  isSnowing: boolean;
  isBallooning: boolean;
  snowTimeRemaining: number; // millseconds remaining
  balloonTimeRemaining: number; // milliseconds remaining
  totalSnowCreated: number;
  totalBalloonsCreated: number;
}
