import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { GradientBg } from "../components/GradientBg";
import { FadeText } from "../components/FadeText";

const BODY_PARTS = [
  { label: "Head & Neck", y: 0, delay: 0 },
  { label: "Shoulders", y: 1, delay: 30 },
  { label: "Chest & Heart", y: 2, delay: 60 },
  { label: "Belly", y: 3, delay: 90 },
  { label: "Legs & Feet", y: 4, delay: 120 },
];

export const BodyScan: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      <GradientBg from="#0b3060" to="#0d2d2d" angle={170} animate />

      {/* Title */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 130,
          opacity: titleOpacity,
          gap: 10,
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
          Body Scan
        </div>
        <div
          style={{
            fontFamily: "'Arial', sans-serif",
            fontSize: 22,
            color: "rgba(255,255,255,0.35)",
          }}
        >
          Relax each area as it glows
        </div>
      </AbsoluteFill>

      {/* Body scan list */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
          paddingTop: 60,
        }}
      >
        {BODY_PARTS.map(({ label, delay }, i) => {
          const appear = interpolate(frame - delay, [0, 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          const isActive =
            frame >= delay &&
            frame < delay + 120;

          const glow = isActive
            ? interpolate(frame - delay, [0, 60, 120], [0, 1, 0.3], { extrapolateRight: "clamp" })
            : 0.1;

          return (
            <div
              key={i}
              style={{
                opacity: appear,
                display: "flex",
                alignItems: "center",
                gap: 20,
                padding: "18px 50px",
                borderRadius: 60,
                background: `rgba(110,231,183,${glow * 0.18})`,
                border: `2px solid rgba(110,231,183,${glow * 0.6})`,
                boxShadow: `0 0 30px rgba(110,231,183,${glow * 0.5})`,
                minWidth: 420,
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: isActive ? "#6ee7b7" : "rgba(110,231,183,0.3)",
                  boxShadow: isActive ? "0 0 12px #6ee7b7" : "none",
                }}
              />
              <div
                style={{
                  fontFamily: "'Arial', sans-serif",
                  fontSize: 36,
                  fontWeight: isActive ? 700 : 400,
                  color: isActive ? "#ffffff" : "rgba(255,255,255,0.5)",
                }}
              >
                {label}
              </div>
            </div>
          );
        })}
      </AbsoluteFill>

      {/* Bottom instruction */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingBottom: 100,
          opacity: interpolate(frame, [200, 240], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <FadeText delay={200}>
          <div
            style={{
              fontFamily: "'Arial', sans-serif",
              fontSize: 26,
              color: "rgba(255,255,255,0.45)",
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            Let tension melt away ✨
          </div>
        </FadeText>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
