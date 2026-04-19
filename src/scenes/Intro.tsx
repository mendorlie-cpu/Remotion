import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { GradientBg } from "../components/GradientBg";
import { FadeText } from "../components/FadeText";

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 12, stiffness: 60 }, from: 0.5, to: 1 });
  const glowOpacity = interpolate(frame, [0, 60, 120, 150], [0, 0.8, 0.8, 0]);

  return (
    <AbsoluteFill>
      <GradientBg from="#1a0533" to="#0d1b4b" angle={150} animate />

      {/* Soft glow orb */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: glowOpacity,
        }}
      >
        <div
          style={{
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(147,51,234,0.4) 0%, transparent 70%)",
          }}
        />
      </AbsoluteFill>

      {/* Content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          padding: "0 80px",
        }}
      >
        {/* Emoji lotus */}
        <div
          style={{
            fontSize: 100,
            transform: `scale(${logoScale})`,
            lineHeight: 1,
          }}
        >
          🧘
        </div>

        <FadeText delay={15}>
          <div
            style={{
              fontFamily: "'Arial', sans-serif",
              fontSize: 64,
              fontWeight: 800,
              color: "#ffffff",
              textAlign: "center",
              lineHeight: 1.15,
              letterSpacing: -1,
              textShadow: "0 0 40px rgba(147,51,234,0.7)",
            }}
          >
            Pause.
            <br />
            Breathe.
            <br />
            Reset.
          </div>
        </FadeText>

        <FadeText delay={35}>
          <div
            style={{
              fontFamily: "'Arial', sans-serif",
              fontSize: 28,
              fontWeight: 400,
              color: "rgba(255,255,255,0.65)",
              textAlign: "center",
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            1-minute wellness
          </div>
        </FadeText>
      </AbsoluteFill>

      {/* Bottom tag */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingBottom: 80,
          opacity: interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div
          style={{
            fontFamily: "'Arial', sans-serif",
            fontSize: 22,
            color: "rgba(255,255,255,0.4)",
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          #wellness #mindfulness
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
