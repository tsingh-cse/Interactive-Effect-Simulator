/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Snowflake, Play, Square, Sparkles, RefreshCw, BarChart2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AtmosphereControlsProps {
  isSnowing: boolean;
  isBallooning: boolean;
  snowTimeRemaining: number; // in ms, 0 to 5000
  balloonTimeRemaining: number; // in ms, 0 to 5000
  totalSnowCreated: number;
  totalBalloonsCreated: number;
  onTriggerSnowflakes: () => void;
  onTriggerBalloons: () => void;
  onClearAll: () => void;
  activeSnowflakesCount: number;
  activeBalloonsCount: number;
}

export default function AtmosphereControls({
  isSnowing,
  isBallooning,
  snowTimeRemaining,
  balloonTimeRemaining,
  totalSnowCreated,
  totalBalloonsCreated,
  onTriggerSnowflakes,
  onTriggerBalloons,
  onClearAll,
  activeSnowflakesCount,
  activeBalloonsCount,
}: AtmosphereControlsProps) {
  // Convert milliseconds to formatted active string, e.g. "4.2s"
  const formatTime = (ms: number) => {
    return (Math.max(0, ms) / 1000).toFixed(1) + "s";
  };

  // Percent calculation
  const snowProgressPercent = (snowTimeRemaining / 5000) * 100;
  const balloonProgressPercent = (balloonTimeRemaining / 5000) * 100;

  return (
    <div id="atmosphere-control-center" className="w-full max-w-lg bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800/80 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-350 hover:border-slate-750">
      {/* Upper Accent Header */}
      <div className="bg-gradient-to-r from-sky-500/10 via-indigo-500/5 to-amber-500/10 px-6 py-4 border-b border-slate-800/50 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
          <span className="text-xs font-mono tracking-widest text-slate-400 font-medium">ENVIRONMENT CONTROLLER</span>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-800/60 px-2.5 py-1 rounded-full border border-slate-700/40">
          <span className={`w-2 h-2 rounded-full ${isSnowing || isBallooning ? "bg-emerald-500 animate-ping" : "bg-slate-500"}`} />
          <span className="text-[10px] font-mono font-semibold text-slate-300">
            {isSnowing || isBallooning ? "ACTIVE" : "STANDBY"}
          </span>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {/* Title Deck */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-serif text-slate-100 font-bold tracking-tight">
            Atmospheric Motion Board
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            Trigger formal ambient simulations by launching medium-size components. Each cycle operates on a precise 5.0-second active timeline.
          </p>
        </div>

        {/* Action Button Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Snowflakes Action Card */}
          <div className="flex flex-col space-y-2">
            <button
              id="trigger-snowflakes-button"
              disabled={false}
              onClick={onTriggerSnowflakes}
              className={`group relative flex flex-col items-center justify-center p-5 rounded-xl border text-center transition-all duration-300 cursor-pointer overflow-hidden ${
                isSnowing
                  ? "bg-sky-950/40 border-sky-500/60 shadow-[0_0_15px_rgba(56,189,248,0.15)]"
                  : "bg-slate-800/45 border-slate-700 hover:border-sky-500/40 hover:bg-slate-800/80"
              }`}
            >
              {/* Backglow on active */}
              {isSnowing && (
                <div className="absolute inset-0 bg-sky-500/5 animate-pulse mix-blend-color-dodge pointer-events-none" />
              )}

              <div className={`p-3 rounded-lg mb-3 transition-transform duration-300 group-hover:scale-105 ${
                isSnowing ? "bg-sky-500/20 text-sky-300" : "bg-slate-700/50 text-slate-400 group-hover:text-sky-400"
              }`}>
                <Snowflake className={`w-6 h-6 ${isSnowing ? "animate-spin" : ""}`} style={{ animationDuration: "10s" }} />
              </div>

              <span className="font-sans font-semibold text-slate-100 text-base">Snowflakes</span>
              <span className="text-xs text-slate-400 mt-1 font-normal">Cascade top-to-bottom</span>

              {/* Progress Bar inside the button for visual neatness */}
              {isSnowing && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800">
                  <motion.div
                    className="h-full bg-sky-400"
                    initial={{ width: "100%" }}
                    animate={{ width: `${snowProgressPercent}%` }}
                    transition={{ ease: "linear", duration: 0.1 }}
                  />
                </div>
              )}
            </button>
            
            {/* Direct digital readout */}
            <AnimatePresence>
              {isSnowing && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex justify-between items-center px-1 text-[11px] font-mono text-sky-400"
                >
                  <span>Active Snow Timeline:</span>
                  <span className="font-semibold">{formatTime(snowTimeRemaining)}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Balloons Action Card */}
          <div className="flex flex-col space-y-2">
            <button
              id="trigger-balloons-button"
              disabled={false}
              onClick={onTriggerBalloons}
              className={`group relative flex flex-col items-center justify-center p-5 rounded-xl border text-center transition-all duration-300 cursor-pointer overflow-hidden ${
                isBallooning
                  ? "bg-amber-950/30 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.12)]"
                  : "bg-slate-800/45 border-slate-700 hover:border-amber-500/40 hover:bg-slate-800/80"
              }`}
            >
              {/* Backglow on active */}
              {isBallooning && (
                <div className="absolute inset-0 bg-amber-500/5 animate-pulse mix-blend-color-dodge pointer-events-none" />
              )}

              {/* Simplified elegant Custom Svg Balloon for the button icon */}
              <div className={`p-3 rounded-lg mb-3 transition-transform duration-300 group-hover:scale-105 ${
                isBallooning ? "bg-amber-500/20 text-amber-300" : "bg-slate-700/50 text-slate-400 group-hover:text-amber-400"
              }`}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <path d="M12 2A7 7 0 0 0 5 9c0 4.1 3 7 7 7s7-2.9 7-7a7 7 0 0 0-7-7z" fill="currentColor" fillOpacity={isBallooning ? "0.2" : "0"} />
                  <path d="M12 16c-.6 1.5-1 3.5-1 5" />
                  <path d="M11 21h2" />
                </svg>
              </div>

              <span className="font-sans font-semibold text-slate-100 text-base">Balloons</span>
              <span className="text-xs text-slate-400 mt-1 font-normal">Ascend bottom-to-top</span>

              {/* Progress Bar inside the button for visual neatness */}
              {isBallooning && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800">
                  <motion.div
                    className="h-full bg-amber-400"
                    initial={{ width: "100%" }}
                    animate={{ width: `${balloonProgressPercent}%` }}
                    transition={{ ease: "linear", duration: 0.1 }}
                  />
                </div>
              )}
            </button>

            {/* Direct digital readout */}
            <AnimatePresence>
              {isBallooning && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex justify-between items-center px-1 text-[11px] font-mono text-amber-400"
                >
                  <span>Active Balloon Timeline:</span>
                  <span className="font-semibold">{formatTime(balloonTimeRemaining)}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Real-time Telemetry Dashboard Area */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center gap-1.5 border-b border-slate-800/40 pb-2 mb-1">
            <BarChart2 className="w-3.5 h-3.5 text-slate-450" />
            <span className="text-[10px] font-mono tracking-widest text-slate-400 font-semibold uppercase">Simulation Telemetry</span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs font-mono">
            <div className="space-y-1.5">
              <div className="text-[10px] text-slate-500 uppercase">Precipitation Log</div>
              <div className="flex justify-between text-slate-300">
                <span>Total Snowflakes:</span>
                <span className="text-sky-400 font-semibold">{totalSnowCreated}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Active particles:</span>
                <span>{activeSnowflakesCount}</span>
              </div>
            </div>

            <div className="space-y-1.5 border-l border-slate-800/80 pl-4">
              <div className="text-[10px] text-slate-500 uppercase">Ascension Log</div>
              <div className="flex justify-between text-slate-300">
                <span>Total Balloons:</span>
                <span className="text-amber-400 font-semibold">{totalBalloonsCreated}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Active spheres:</span>
                <span>{activeBalloonsCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls & Info Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-800/40">
          <span className="text-[10px] font-mono text-slate-500 text-center sm:text-left leading-normal">
            Medium size limit active. Frame bounds safe inside viewport context.
          </span>
          {(activeSnowflakesCount > 0 || activeBalloonsCount > 0) && (
            <button
              id="clear-all-effects-button"
              onClick={onClearAll}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-900/30 bg-red-950/15 text-red-400 hover:bg-red-950/45 hover:border-red-800/40 text-xs font-sans font-medium transition-all duration-200 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
              <span>Clear Effects</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
