import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { STORE_NAME, STORE_URL } from "../data/products";

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const emojiScale = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 8, stiffness: 150, mass: 0.5 },
  });

  const titleOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [15, 35], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const btnOpacity = interpolate(frame, [45, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const btnScale = spring({
    frame: frame - 45,
    fps,
    from: 0.8,
    to: 1,
    config: { damping: 12, stiffness: 200 },
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
          fontSize: "120px",
          lineHeight: 1,
          transform: `scale(${emojiScale})`,
        }}
      >
        🛒
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
        }}
      >
        Shop Now
      </div>
      <div
        style={{
          opacity: subtitleOpacity,
          fontSize: "26px",
          color: "rgba(255,255,255,0.65)",
          marginTop: "16px",
          letterSpacing: "1px",
        }}
      >
        {STORE_URL}
      </div>
      <div
        style={{
          opacity: btnOpacity,
          transform: `scale(${btnScale})`,
          marginTop: "56px",
          backgroundColor: "white",
          color: "#764ba2",
          padding: "22px 64px",
          borderRadius: "100px",
          fontSize: "28px",
          fontWeight: 700,
          letterSpacing: "0.5px",
        }}
      >
        Discover More →
      </div>
      <div
        style={{
          opacity: subtitleOpacity,
          fontSize: "20px",
          color: "rgba(255,255,255,0.4)",
          marginTop: "60px",
          letterSpacing: "2px",
        }}
      >
        {STORE_NAME}
      </div>
    </div>
  );
};
