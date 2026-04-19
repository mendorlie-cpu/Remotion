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

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const emojiScale = spring({ frame, fps, config: { damping: 10, stiffness: 60 }, from: 0.3, to: 1 });

  const fadeOut = interpolate(frame, [100, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: fadeOut }}>
      <GradientBg from="#1a0533" to="#0d1b4b" angle={135} animate />

      {/* Radial glow */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: interpolate(frame, [0, 40], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div
          style={{
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(147,51,234,0.3) 0%, transparent 70%)",
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
          gap: 32,
          padding: "0 80px",
        }}
      >
        <div style={{ fontSize: 110, transform: `scale(${emojiScale})`, lineHeight: 1 }}>
          💜
        </div>

        <FadeText delay={20}>
          <div
            style={{
              fontFamily: "'Arial', sans-serif",
              fontSize: 62,
              fontWeight: 800,
              color: "#ffffff",
              textAlign: "center",
              lineHeight: 1.2,
              textShadow: "0 0 50px rgba(167,139,250,0.8)",
            }}
          >
            You did it.
            <br />
            Great job!
          </div>
        </FadeText>

        <FadeText delay={40}>
          <div
            style={{
              fontFamily: "'Arial', sans-serif",
              fontSize: 28,
              fontWeight: 400,
              color: "rgba(255,255,255,0.6)",
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            Take this calm with you
            <br />
            into the rest of your day.
          </div>
        </FadeText>

        <FadeText delay={60}>
          <div
            style={{
              marginTop: 16,
              padding: "18px 50px",
              borderRadius: 60,
              background: "rgba(167,139,250,0.2)",
              border: "2px solid rgba(167,139,250,0.6)",
              fontFamily: "'Arial', sans-serif",
              fontSize: 28,
              fontWeight: 700,
              color: "#a78bfa",
              letterSpacing: 1,
            }}
          >
            Follow for daily wellness 🌿
          </div>
        </FadeText>
      </AbsoluteFill>

      {/* Hashtags */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingBottom: 80,
          opacity: interpolate(frame, [70, 100], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div
          style={{
            fontFamily: "'Arial', sans-serif",
            fontSize: 22,
            color: "rgba(255,255,255,0.35)",
            textAlign: "center",
            letterSpacing: 2,
          }}
        >
          #wellness #breathe #mindfulness #selfcare
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
