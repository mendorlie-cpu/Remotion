import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { PRODUCTS, STORE_NAME } from "../data/products";

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const emojiScale = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 200, mass: 0.8 },
  });

  const titleOpacity = interpolate(frame, [20, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [20, 45], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleOpacity = interpolate(frame, [40, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const countOpacity = interpolate(frame, [60, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily:
          '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        overflow: "hidden",
      }}
    >
      <div
        style={{
          fontSize: "140px",
          lineHeight: 1,
          transform: `scale(${emojiScale})`,
        }}
      >
        🛍️
      </div>
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          fontSize: "72px",
          fontWeight: 800,
          color: "white",
          marginTop: "32px",
          textAlign: "center",
          letterSpacing: "-1px",
          lineHeight: 1.1,
          padding: "0 60px",
        }}
      >
        {STORE_NAME}
      </div>
      <div
        style={{
          opacity: subtitleOpacity,
          fontSize: "24px",
          color: "rgba(255,255,255,0.75)",
          marginTop: "24px",
          letterSpacing: "6px",
          textTransform: "uppercase",
          fontWeight: 500,
        }}
      >
        Featured Collection
      </div>
      <div
        style={{
          opacity: countOpacity,
          fontSize: "20px",
          color: "rgba(255,255,255,0.5)",
          marginTop: "60px",
          letterSpacing: "3px",
          fontWeight: 500,
        }}
      >
        {PRODUCTS.length} Products
      </div>
    </div>
  );
};
