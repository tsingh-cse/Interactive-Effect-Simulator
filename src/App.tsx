/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect, useRef } from "react";
import { SnowflakeItem, BalloonItem } from "./types";
import Snowflake from "./components/Snowflake";
import Balloon from "./components/Balloon";
import AtmosphereControls from "./components/AtmosphereControls";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, HelpCircle } from "lucide-react";

export default function App() {
  const [snowflakes, setSnowflakes] = useState<SnowflakeItem[]>([]);
  const [balloons, setBalloons] = useState<BalloonItem[]>([]);

  const [isSnowing, setIsSnowing] = useState(false);
  const [isBallooning, setIsBallooning] = useState(false);

  const [snowTimeRemaining, setSnowTimeRemaining] = useState(0);
  const [balloonTimeRemaining, setBalloonTimeRemaining] = useState(0);

  const [totalSnowCreated, setTotalSnowCreated] = useState(0);
  const [totalBalloonsCreated, setTotalBalloonsCreated] = useState(0);

  // References to track end times safely without being affected by JavaScript main thread lag
  const snowEndTimeRef = useRef<number>(0);
  const balloonEndTimeRef = useRef<number>(0);

  // Spawner generators
  const spawnSnowflake = (isPrepopulated = false): SnowflakeItem => {
    const id = `snow-${Math.random().toString(36).substring(2, 9)}-${Date.now()}`;
    const size = Math.floor(Math.random() * 9) + 26; // 26px to 34px: Strictly medium scale
    const speed = Math.random() * 1.5 + 3.2; // 3.2s to 4.7s flight duration
    const opacity = Math.random() * 0.4 + 0.55; // opacity 0.55 to 0.95
    const drift = Math.random() * 2 - 1; // horizontal drift direction multiplier
    const rotation = Math.random() * 360;

    // Prepopulated elements distribute immediately down the upper half of screen
    const initialY = isPrepopulated ? Math.random() * 55 - 5 : -12;

    return {
      id,
      x: Math.random() * 95 + 2.5, // Keep slightly inside edges to avoid sudden clipping
      speed,
      size,
      opacity,
      drift,
      rotation,
      initialY,
    } as SnowflakeItem & { initialY: number };
  };

  const spawnBalloon = (isPrepopulated = false): BalloonItem => {
    const id = `balloon-${Math.random().toString(36).substring(2, 9)}-${Date.now()}`;
    const size = Math.floor(Math.random() * 9) + 40; // 40px to 48px width: Strictly medium scale
    const speed = Math.random() * 1.6 + 3.4; // 3.4s to 5.0s ascension speed
    const opacity = Math.random() * 0.15 + 0.8; // 0.80 to 0.95 high opacity for visual corporate sheen
    const drift = Math.random() * 2 - 1; // horizontal wiggle factor
    const rotateStart = Math.random() * 22 - 11; // -11 to +11 degrees initial roll tilt

    // Premium high-fidelity palette
    const balloonColors = [
      { fill: "#E0AF68", glow: "#FFFFFF" }, // Muted Champagne Gold
      { fill: "#DE959B", glow: "#FFFFFF" }, // Blush Rose Quartz
      { fill: "#739985", glow: "#FFFFFF" }, // Imperial Silver Sage
      { fill: "#8EA9C2", glow: "#FFFFFF" }, // Muted Steel Blue
      { fill: "#BD8C75", glow: "#FFFFFF" }, // Luxury Copper Sand
      { fill: "#848DBA", glow: "#FFFFFF" }, // Slate-Lavender Velvet
    ];
    const chosenColor = balloonColors[Math.floor(Math.random() * balloonColors.length)];

    // Prepopulated elements distribute across the lower half immediately
    const initialY = isPrepopulated ? Math.random() * 45 + 55 : 115;

    return {
      id,
      x: Math.random() * 90 + 5, // Keep within screen bounds
      speed,
      size,
      opacity,
      drift,
      color: chosenColor.fill,
      highlightColor: chosenColor.glow,
      rotateStart,
      initialY,
    } as BalloonItem & { initialY: number };
  };

  // 30ms high-precision ticking clock for progress telemetry and end-time cutoff
  useEffect(() => {
    let ticker: NodeJS.Timeout | null = null;

    if (isSnowing || isBallooning) {
      ticker = setInterval(() => {
        const now = Date.now();

        if (isSnowing) {
          const timeLeft = Math.max(0, snowEndTimeRef.current - now);
          setSnowTimeRemaining(timeLeft);
          if (timeLeft <= 0) {
            setIsSnowing(false);
          }
        }

        if (isBallooning) {
          const timeLeft = Math.max(0, balloonEndTimeRef.current - now);
          setBalloonTimeRemaining(timeLeft);
          if (timeLeft <= 0) {
            setIsBallooning(false);
          }
        }
      }, 30);
    }

    return () => {
      if (ticker) clearInterval(ticker);
    };
  }, [isSnowing, isBallooning]);

  // Snow Particle Spawner Feeder
  useEffect(() => {
    if (!isSnowing) return;

    // 1. Instant beautiful response: Prepopulate a cascade so screen isn't empty on click
    const initialBurstCount = 12;
    const initialBurst = Array.from({ length: initialBurstCount }, () => spawnSnowflake(true));
    setSnowflakes((prev) => [...prev, ...initialBurst]);
    setTotalSnowCreated((prev) => prev + initialBurstCount);

    // 2. Feed snowflakes continuously until cutoff
    const spawner = setInterval(() => {
      if (Date.now() < snowEndTimeRef.current) {
        setSnowflakes((prev) => [...prev, spawnSnowflake(false)]);
        setTotalSnowCreated((prev) => prev + 1);
      }
    }, 120);

    return () => clearInterval(spawner);
  }, [isSnowing]);

  // Balloon Particle Spawner Feeder
  useEffect(() => {
    if (!isBallooning) return;

    // 1. Instant response: Prepopulate floaters in motion
    const initialBurstCount = 8;
    const initialBurst = Array.from({ length: initialBurstCount }, () => spawnBalloon(true));
    setBalloons((prev) => [...prev, ...initialBurst]);
    setTotalBalloonsCreated((prev) => prev + initialBurstCount);

    // 2. Feed balloons continuously until cutoff
    const spawner = setInterval(() => {
      if (Date.now() < balloonEndTimeRef.current) {
        setBalloons((prev) => [...prev, spawnBalloon(false)]);
        setTotalBalloonsCreated((prev) => prev + 1);
      }
    }, 160);

    return () => clearInterval(spawner);
  }, [isBallooning]);

  // Trigger handlers
  const handleTriggerSnowflakes = () => {
    snowEndTimeRef.current = Date.now() + 5000;
    setSnowTimeRemaining(5000);
    setIsSnowing(true);
  };

  const handleTriggerBalloons = () => {
    balloonEndTimeRef.current = Date.now() + 5000;
    setBalloonTimeRemaining(5000);
    setIsBallooning(true);
  };

  // Immediate full dump of active simulation
  const handleClearAll = () => {
    setIsSnowing(false);
    setIsBallooning(false);
    setSnowTimeRemaining(0);
    setBalloonTimeRemaining(0);
    setSnowflakes([]);
    setBalloons([]);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-slate-950 text-slate-100 overflow-hidden font-sans p-6 select-none">
      {/* Decorative High-Performance Geometric Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Decorative ambient background auroras */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 -translate-x-1/2 -translate-y-1/2 bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 translate-x-1/2 translate-y-1/2 bg-amber-500/3 rounded-full blur-[120px] pointer-events-none" />

      {/* 5-second Active Animation Canvases */}
      <div id="particle-stages" className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-10">
        
        {/* Snowflakes Stage */}
        <AnimatePresence>
          {snowflakes.map((flake) => {
            const typedFlake = flake as SnowflakeItem & { initialY: number };
            return (
              <motion.div
                key={typedFlake.id}
                initial={{
                  y: `${typedFlake.initialY}vh`,
                  x: `${typedFlake.x}%`,
                  rotate: typedFlake.rotation,
                  opacity: 0,
                }}
                animate={{
                  y: "112vh",
                  x: `${typedFlake.x + typedFlake.drift * 12}%`,
                  rotate: typedFlake.rotation + (typedFlake.drift > 0 ? 180 : -180),
                  opacity: [0, typedFlake.opacity, typedFlake.opacity, 0],
                }}
                transition={{
                  duration: typedFlake.speed,
                  ease: "linear",
                }}
                onAnimationComplete={() => {
                  setSnowflakes((prev) => prev.filter((f) => f.id !== typedFlake.id));
                }}
                className="absolute pointer-events-none"
                style={{ width: typedFlake.size, height: typedFlake.size }}
              >
                <Snowflake size={typedFlake.size} />
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Balloons Stage */}
        <AnimatePresence>
          {balloons.map((balloon) => {
            const typedBalloon = balloon as BalloonItem & { initialY: number };
            return (
              <motion.div
                key={typedBalloon.id}
                initial={{
                  y: `${typedBalloon.initialY}vh`,
                  x: `${typedBalloon.x}%`,
                  rotate: typedBalloon.rotateStart,
                  opacity: 0,
                }}
                animate={{
                  y: "-18vh",
                  x: `${typedBalloon.x + typedBalloon.drift * 11}%`,
                  rotate: [
                    typedBalloon.rotateStart,
                    typedBalloon.rotateStart + typedBalloon.drift * 12,
                    typedBalloon.rotateStart,
                  ],
                  opacity: [0, typedBalloon.opacity, typedBalloon.opacity, 0],
                }}
                transition={{
                  duration: typedBalloon.speed,
                  ease: "easeOut",
                }}
                onAnimationComplete={() => {
                  setBalloons((prev) => prev.filter((b) => b.id !== typedBalloon.id));
                }}
                className="absolute pointer-events-none"
                style={{ width: typedBalloon.size, height: typedBalloon.size * 1.7 }}
              >
                <Balloon
                  color={typedBalloon.color}
                  highlightColor={typedBalloon.highlightColor}
                  size={typedBalloon.size}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Main Console Board */}
      <div className="relative z-20 flex flex-col items-center space-y-6">
        <AtmosphereControls
          isSnowing={isSnowing}
          isBallooning={isBallooning}
          snowTimeRemaining={snowTimeRemaining}
          balloonTimeRemaining={balloonTimeRemaining}
          totalSnowCreated={totalSnowCreated}
          totalBalloonsCreated={totalBalloonsCreated}
          onTriggerSnowflakes={handleTriggerSnowflakes}
          onTriggerBalloons={handleTriggerBalloons}
          onClearAll={handleClearAll}
          activeSnowflakesCount={snowflakes.length}
          activeBalloonsCount={balloons.length}
        />

        {/* Elegant User Assistance Prompt */}
        <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Click multiple times or activate both simultaneously to create blended visuals</span>
        </div>
      </div>
    </div>
  );
}
