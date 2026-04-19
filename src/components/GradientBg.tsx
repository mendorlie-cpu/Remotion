import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

interface Props {
  from: string;
  to: string;
  angle?: number;
  animate?: boolean;
}

export const GradientBg: React.FC<Props> = ({
  from,
  to,
  angle = 135,
  animate = false,
}) => {
  const frame = useCurrentFrame();
  const shift = animate ? interpolate(frame, [0, 300], [0, 30]) : 0;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${angle + shift}deg, ${from}, ${to})`,
      }}
    />
  );
};
