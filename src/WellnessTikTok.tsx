import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { Intro } from "./scenes/Intro";
import { BreathingExercise } from "./scenes/BreathingExercise";
import { Affirmations } from "./scenes/Affirmations";
import { BodyScan } from "./scenes/BodyScan";
import { Outro } from "./scenes/Outro";

export const WellnessTikTok: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0f1a" }}>
      <Series>
        {/* 0–5s: Intro */}
        <Series.Sequence durationInFrames={150}>
          <Intro />
        </Series.Sequence>

        {/* 5–25s: Breathing exercise */}
        <Series.Sequence durationInFrames={600}>
          <BreathingExercise />
        </Series.Sequence>

        {/* 25–45s: Affirmations */}
        <Series.Sequence durationInFrames={600}>
          <Affirmations />
        </Series.Sequence>

        {/* 45–55s: Body scan */}
        <Series.Sequence durationInFrames={300}>
          <BodyScan />
        </Series.Sequence>

        {/* 55–60s: Outro */}
        <Series.Sequence durationInFrames={150}>
          <Outro />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
