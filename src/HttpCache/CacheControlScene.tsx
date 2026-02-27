import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});

const DIRECTIVES = [
  {
    name: "max-age=3600",
    icon: "⏱",
    desc: "缓存有效期 3600 秒（1 小时）",
    color: "#6366f1",
  },
  {
    name: "no-cache",
    icon: "🔄",
    desc: "每次都需验证，不是「不缓存」",
    color: "#a855f7",
  },
  {
    name: "no-store",
    icon: "🚫",
    desc: "完全不缓存，每次都重新下载",
    color: "#ef4444",
  },
  {
    name: "public / private",
    icon: "🔒",
    desc: "控制 CDN 等中间层是否可缓存",
    color: "#06b6d4",
  },
];

export const CacheControlScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 200 }, delay: 5 });
  const headerSpring = spring({ frame, fps, config: { damping: 200 }, delay: 16 });

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        fontFamily,
        padding: "36px 56px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 16,
      }}
    >
      {/* 标题 */}
      <div
        style={{
          fontSize: 38,
          fontWeight: 900,
          color: "white",
          opacity: titleSpring,
          transform: `translateY(${interpolate(titleSpring, [0, 1], [20, 0])}px)`,
        }}
      >
        Cache-Control 指令
      </div>

      {/* Header 代码块 */}
      <div
        style={{
          background: "rgba(0,0,0,0.35)",
          borderRadius: 14,
          padding: "14px 22px",
          border: "1px solid rgba(255,255,255,0.06)",
          fontFamily: "'Courier New', monospace",
          fontSize: 16,
          opacity: headerSpring,
        }}
      >
        <span style={{ color: "#818cf8" }}>Cache-Control</span>
        <span style={{ color: "rgba(255,255,255,0.3)" }}>: </span>
        <span style={{ color: "#86efac" }}>max-age=3600, public</span>
      </div>

      {/* 指令卡片 */}
      {DIRECTIVES.map((d, i) => {
        const cardSpring = spring({
          frame,
          fps,
          config: { damping: 200 },
          delay: 30 + i * 20,
        });

        return (
          <div
            key={d.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "14px 20px",
              borderRadius: 14,
              background: `${d.color}0a`,
              border: `1px solid ${d.color}30`,
              opacity: cardSpring,
              transform: `translateX(${interpolate(cardSpring, [0, 1], [-20, 0])}px)`,
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                background: `${d.color}18`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                flexShrink: 0,
              }}
            >
              {d.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: 17,
                  fontWeight: 700,
                  color: d.color,
                }}
              >
                {d.name}
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: "rgba(255,255,255,0.55)",
                  marginTop: 2,
                }}
              >
                {d.desc}
              </div>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
