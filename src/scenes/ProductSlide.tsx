import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { type Product } from "../data/products";

interface Props {
  product: Product;
  index: number;
  total: number;
}

const BADGE_COLORS: Record<string, { bg: string; text: string }> = {
  Sale: { bg: "#EF4444", text: "#ffffff" },
  New: { bg: "#10B981", text: "#ffffff" },
  "Best Seller": { bg: "#F59E0B", text: "#ffffff" },
  Limited: { bg: "#8B5CF6", text: "#ffffff" },
};

const padNum = (n: number) => (n < 10 ? `0${n}` : `${n}`);

export const ProductSlide: React.FC<Props> = ({ product, index, total }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Accent background slides in from top
  const bgY = interpolate(frame, [0, 20], [-420, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Emoji bounces in
  const emojiScale = spring({
    frame: frame - 8,
    fps,
    from: 0,
    to: 1,
    config: { damping: 8, stiffness: 150, mass: 0.5 },
  });

  // Counter fades in
  const counterOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Badge fades in
  const badgeOpacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Category + title slide up
  const textY = interpolate(frame, [22, 42], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textOpacity = interpolate(frame, [22, 42], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Price scales in
  const priceScale = spring({
    frame: frame - 35,
    fps,
    from: 0.7,
    to: 1,
    config: { damping: 14, stiffness: 200 },
  });
  const priceOpacity = interpolate(frame, [35, 52], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Description fades in
  const descOpacity = interpolate(frame, [50, 68], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const descY = interpolate(frame, [50, 68], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const badgeColors =
    product.badge !== undefined
      ? (BADGE_COLORS[product.badge] ?? { bg: "#6366F1", text: "#ffffff" })
      : { bg: "#6366F1", text: "#ffffff" };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#F9FAFB",
        fontFamily:
          '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Colored accent background – top 400px */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "400px",
          backgroundColor: product.accentColor,
          transform: `translateY(${bgY}px)`,
        }}
      />

      {/* Product counter – top right */}
      <div
        style={{
          position: "absolute",
          top: "36px",
          right: "48px",
          opacity: counterOpacity,
          fontSize: "24px",
          fontWeight: 600,
          color: "rgba(255,255,255,0.85)",
          zIndex: 10,
          letterSpacing: "2px",
        }}
      >
        {padNum(index + 1)} / {padNum(total)}
      </div>

      {/* Badge – top left */}
      {product.badge !== undefined && (
        <div
          style={{
            position: "absolute",
            top: "36px",
            left: "48px",
            opacity: badgeOpacity,
            backgroundColor: badgeColors.bg,
            color: badgeColors.text,
            padding: "10px 24px",
            borderRadius: "100px",
            fontSize: "20px",
            fontWeight: 700,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            zIndex: 10,
          }}
        >
          {product.badge}
        </div>
      )}

      {/* Emoji – straddles accent/white boundary */}
      <div
        style={{
          position: "absolute",
          top: "220px",
          fontSize: "160px",
          lineHeight: 1,
          transform: `scale(${emojiScale})`,
          zIndex: 10,
          filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.15))",
        }}
      >
        {product.emoji}
      </div>

      {/* Content below the accent section */}
      <div
        style={{
          position: "absolute",
          top: "440px",
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0 60px",
        }}
      >
        {/* Category */}
        <div
          style={{
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
            fontSize: "22px",
            fontWeight: 600,
            color: "#9CA3AF",
            letterSpacing: "4px",
            textTransform: "uppercase",
            marginTop: "20px",
          }}
        >
          {product.category}
        </div>

        {/* Product title */}
        <div
          style={{
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
            fontSize: "56px",
            fontWeight: 800,
            color: "#111827",
            textAlign: "center",
            lineHeight: 1.15,
            marginTop: "12px",
            letterSpacing: "-0.5px",
          }}
        >
          {product.title}
        </div>

        {/* Price row */}
        <div
          style={{
            opacity: priceOpacity,
            transform: `scale(${priceScale})`,
            display: "flex",
            alignItems: "baseline",
            gap: "16px",
            marginTop: "20px",
          }}
        >
          <span
            style={{
              fontSize: "56px",
              fontWeight: 800,
              color: product.accentColor,
              lineHeight: 1,
            }}
          >
            ${product.price.toFixed(2)}
          </span>
          {product.compareAtPrice !== undefined && (
            <span
              style={{
                fontSize: "32px",
                fontWeight: 500,
                color: "#9CA3AF",
                textDecoration: "line-through",
              }}
            >
              ${product.compareAtPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Description */}
        <div
          style={{
            opacity: descOpacity,
            transform: `translateY(${descY}px)`,
            fontSize: "26px",
            color: "#6B7280",
            textAlign: "center",
            lineHeight: 1.5,
            marginTop: "20px",
            maxWidth: "820px",
          }}
        >
          {product.description}
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Progress dots */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
            paddingBottom: "48px",
          }}
        >
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              style={{
                width: i === index ? "36px" : "12px",
                height: "12px",
                borderRadius: "6px",
                backgroundColor:
                  i === index ? product.accentColor : "#D1D5DB",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
