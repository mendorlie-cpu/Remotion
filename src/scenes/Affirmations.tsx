import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { GradientBg } from "../components/GradientBg";

const AFFIRMATIONS = [
  { text: "I am calm\nand centered.", emoji: "🌿", color: "#86efac" },
  { text: "I release\nwhat I cannot\ncontrol.", emoji: "🍃", color: "#6ee7f7" },
  { text: "My body is\nstrong and\nhealing.", emoji: "✨", color: "#c4b5fd" },
  { text: "I am enough,\nexactly as\nI am.", emoji: "💛", color: "#fde68a" },
  { text: "Peace begins\nwith me.", emoji: "🕊️", color: "#f9a8d4" },
];

const FRAMES_PER = 120; // 4s each

export const Affirmations: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const currentIndex = Math.min(Math.floor(frame / FRAMES_PER), AFFIRMATIONS.length - 1);
  const localFrame = frame - currentIndex * FRAMES_PER;
  const { text, emoji, color } = AFFIRMATIONS[currentIndex];

  const opacity = interpolate(localFrame, [0, 20, 90, 120], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(localFrame, [0, 25], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const emojiScale = interpolate(localFrame, [0, 20, 90, 120], [0.6, 1.15, 1, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <GradientBg from="#1a0533" to="#0d1b4b" angle={200} animate />

      {/* Section title */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          paddingTop: 130,
          opacity: titleOpacity,
        }}
      >
        <div
          style={{
            fontFamily: "'Arial', sans-serif",
            fontSize: 34,
            fontWeight: 600,
            color: "rgba(255,255,255,0.5)",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Affirmations
        </div>
      </AbsoluteFill>

      {/* Progress dots */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          paddingTop: 200,
        }}
      >
        <div style={{ display: "flex", gap: 12 }}>
          {AFFIRMATIONS.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === currentIndex ? 28 : 10,
                height: 10,
                borderRadius: 5,
                background: i === currentIndex ? color : "rgba(255,255,255,0.25)",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </AbsoluteFill>

      {/* Affirmation content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
          opacity,
          transform: `translateY(${translateY}px)`,
          padding: "0 80px",
        }}
      >
        {/* Emoji */}
        <div style={{ fontSize: 110, transform: `scale(${emojiScale})`, lineHeight: 1 }}>
          {emoji}
        </div>

        {/* Affirmation text */}
        <div
          style={{
            fontFamily: "'Arial', sans-serif",
            fontSize: 58,
            fontWeight: 800,
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.25,
            textShadow: `0 0 60px ${color}80`,
            whiteSpace: "pre-line",
          }}
        >
          {text}
        </div>

        {/* Colored accent bar */}
        <div
          style={{
            width: 80,
            height: 4,
            borderRadius: 2,
            background: color,
            boxShadow: `0 0 20px ${color}`,
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
