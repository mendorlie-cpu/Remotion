import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { GradientBg } from "../components/GradientBg";
import { FadeText } from "../components/FadeText";

// One breath cycle: 4s inhale, 4s hold, 4s exhale = 12s = 360 frames
const INHALE = 120; // 4s
const HOLD = 120;   // 4s
const EXHALE = 120; // 4s
const CYCLE = INHALE + HOLD + EXHALE; // 360 frames

function getBreathPhase(frame: number): { phase: string; progress: number; scale: number } {
  const cycleFrame = frame % CYCLE;

  if (cycleFrame < INHALE) {
    return {
      phase: "Inhale",
      progress: cycleFrame / INHALE,
      scale: interpolate(cycleFrame, [0, INHALE], [1, 1.6]),
    };
  } else if (cycleFrame < INHALE + HOLD) {
    return {
      phase: "Hold",
      progress: (cycleFrame - INHALE) / HOLD,
      scale: 1.6,
    };
  } else {
    const exhaleFrame = cycleFrame - INHALE - HOLD;
    return {
      phase: "Exhale",
      progress: exhaleFrame / EXHALE,
      scale: interpolate(exhaleFrame, [0, EXHALE], [1.6, 1]),
    };
  }
}

function getPhaseCount(frame: number): number {
  const cycleFrame = frame % CYCLE;
  if (cycleFrame < INHALE) return Math.floor(cycleFrame / 30) + 1;
  if (cycleFrame < INHALE + HOLD) return Math.floor((cycleFrame - INHALE) / 30) + 1;
  return Math.floor((cycleFrame - INHALE - HOLD) / 30) + 1;
}

export const BreathingExercise: React.FC = () => {
  const frame = useCurrentFrame();
  const { phase, scale } = getBreathPhase(frame);
  const count = getPhaseCount(frame);

  const ringOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  const ringPulse = interpolate(
    frame % CYCLE,
    [0, INHALE, INHALE + HOLD, CYCLE],
    [0.3, 0.7, 0.7, 0.3]
  );

  return (
    <AbsoluteFill>
      <GradientBg from="#0d1b4b" to="#0b3060" angle={160} animate />

      {/* Title */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          paddingTop: 120,
          opacity: titleOpacity,
        }}
      >
        <div
          style={{
            fontFamily: "'Arial', sans-serif",
            fontSize: 38,
            fontWeight: 700,
            color: "rgba(255,255,255,0.9)",
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          Box Breathing
        </div>
      </AbsoluteFill>

      {/* Breathing circle */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: ringOpacity,
        }}
      >
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* Outer glow ring */}
          <div
            style={{
              position: "absolute",
              width: 420,
              height: 420,
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(99,179,237,${ringPulse}) 0%, transparent 65%)`,
              transform: `scale(${scale * 0.9})`,
              transition: "none",
            }}
          />

          {/* Main breathing circle */}
          <div
            style={{
              width: 320,
              height: 320,
              borderRadius: "50%",
              background: "rgba(99,179,237,0.15)",
              border: "3px solid rgba(99,179,237,0.7)",
              transform: `scale(${scale})`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              boxShadow: `0 0 60px rgba(99,179,237,${ringPulse * 0.8})`,
            }}
          >
            <div
              style={{
                fontFamily: "'Arial', sans-serif",
                fontSize: 48,
                fontWeight: 800,
                color: "#ffffff",
                letterSpacing: 1,
              }}
            >
              {phase}
            </div>
            <div
              style={{
                fontFamily: "'Arial', sans-serif",
                fontSize: 72,
                fontWeight: 900,
                color: "rgba(147,210,255,0.9)",
                lineHeight: 1,
              }}
            >
              {count}
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* Instruction dots */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingBottom: 160,
          opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <FadeText delay={30}>
          <div
            style={{
              fontFamily: "'Arial', sans-serif",
              fontSize: 26,
              color: "rgba(255,255,255,0.55)",
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            Follow the circle
            <br />
            4 counts each phase
          </div>
        </FadeText>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
