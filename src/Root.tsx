import React from "react";
import { Composition } from "remotion";
import { WellnessTikTok } from "./WellnessTikTok";

export const Root: React.FC = () => {
  return (
    <Composition
      id="WellnessTikTok"
      component={WellnessTikTok}
      durationInFrames={1800}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
