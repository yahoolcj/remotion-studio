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

const STRATEGIES = [
  {
    icon: "📄",
    type: "HTML",
    header: "Cache-Control: no-cache",
    desc: "始终协商验证，保证用户拿到最新入口",
    color: "#6366f1",
    reason: "HTML 是入口文件，必须每次检查更新",
  },
  {
    icon: "📦",
    type: "JS / CSS",
    header: "Cache-Control: max-age=31536000",
    desc: "长期缓存 + 文件名哈希（如 app.3f2a1b.js）",
    color: "#22c55e",
    reason: "内容变化时文件名自动改变，旧缓存自然失效",
  },
  {
    icon: "🔗",
    type: "API",
    header: "no-store 或 max-age=60",
    desc: "根据数据时效性选择合适的策略",
    color: "#f59e0b",
    reason: "实时数据用 no-store，低频更新用短 max-age",
  },
];

export const BestPracticeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 200 }, delay: 5 });

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
        gap: 18,
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
          marginBottom: 4,
        }}
      >
        实战最佳实践
      </div>

      {/* 策略卡片 */}
      {STRATEGIES.map((s, i) => {
        const cardSpring = spring({
          frame,
          fps,
          config: { damping: 200 },
          delay: 20 + i * 25,
        });

        return (
          <div
            key={s.type}
            style={{
              display: "flex",
              gap: 16,
              padding: "16px 20px",
              borderRadius: 16,
              background: `${s.color}08`,
              border: `1px solid ${s.color}25`,
              opacity: cardSpring,
              transform: `translateX(${interpolate(cardSpring, [0, 1], [-25, 0])}px)`,
            }}
          >
            {/* 图标 */}
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: `${s.color}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
                flexShrink: 0,
              }}
            >
              {s.icon}
            </div>

            {/* 内容 */}
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4 }}>
                <div style={{ fontSize: 18, fontWeight: 900, color: s.color }}>
                  {s.type}
                </div>
                <div
                  style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: 13,
                    color: `${s.color}aa`,
                    background: "rgba(0,0,0,0.2)",
                    padding: "2px 10px",
                    borderRadius: 6,
                  }}
                >
                  {s.header}
                </div>
              </div>
              <div style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>
                {s.desc}
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
                💡 {s.reason}
              </div>
            </div>
          </div>
        );
      })}

      {/* 底部总结 */}
      {(() => {
        const tipSpring = spring({
          frame,
          fps,
          config: { damping: 10, stiffness: 120 },
          delay: 110,
        });
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              opacity: tipSpring,
              transform: `scale(${interpolate(tipSpring, [0, 1], [0.8, 1])})`,
            }}
          >
            <div
              style={{
                padding: "12px 28px",
                borderRadius: 14,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                fontSize: 16,
                fontWeight: 700,
                color: "rgba(255,255,255,0.6)",
                textAlign: "center",
              }}
            >
              核心思路：<span style={{ color: "#818cf8" }}>不变的资源长缓存</span>，
              <span style={{ color: "#a855f7" }}>变化的资源勤验证</span>
            </div>
          </div>
        );
      })()}
    </AbsoluteFill>
  );
};
