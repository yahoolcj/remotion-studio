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

export const ExpiresVsMaxAgeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 200 }, delay: 5 });
  const leftCard = spring({ frame, fps, config: { damping: 15 }, delay: 18 });
  const rightCard = spring({ frame, fps, config: { damping: 15 }, delay: 30 });
  const vsSpring = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 120 },
    delay: 24,
  });
  const warningSpring = spring({ frame, fps, config: { damping: 200 }, delay: 80 });
  const conclusionSpring = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 120 },
    delay: 110,
  });

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
        gap: 20,
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
        Expires vs max-age
      </div>

      {/* 对比卡片 */}
      <div style={{ display: "flex", gap: 24, alignItems: "stretch" }}>
        {/* Expires */}
        <div
          style={{
            flex: 1,
            borderRadius: 18,
            background: "rgba(239,68,68,0.06)",
            border: "1px solid rgba(239,68,68,0.2)",
            padding: "20px 24px",
            opacity: leftCard,
            transform: `translateX(${interpolate(leftCard, [0, 1], [-20, 0])}px)`,
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 700, color: "#ef4444", marginBottom: 8, letterSpacing: "2px" }}>
            EXPIRES（旧方案）
          </div>
          <div
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 14,
              color: "rgba(255,255,255,0.6)",
              background: "rgba(0,0,0,0.25)",
              borderRadius: 8,
              padding: "10px 14px",
              marginBottom: 12,
            }}
          >
            <div style={{ color: "#ef4444" }}>Expires:</div>
            <div>Thu, 01 Dec 2025 16:00:00 GMT</div>
          </div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
            使用<span style={{ color: "#ef4444", fontWeight: 700 }}>绝对时间</span>
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginTop: 6 }}>
            客户端与服务器时钟不同步时容易出错
          </div>

          {/* 时间轴 */}
          <div style={{ marginTop: 16, position: "relative", height: 30 }}>
            <div
              style={{
                position: "absolute",
                top: 14,
                left: 0,
                right: 0,
                height: 2,
                background: "rgba(239,68,68,0.2)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 6,
                left: 0,
                fontSize: 10,
                color: "rgba(255,255,255,0.3)",
              }}
            >
              服务器时间
            </div>
            <div
              style={{
                position: "absolute",
                top: 6,
                right: 0,
                fontSize: 10,
                color: "#ef4444",
              }}
            >
              过期时间点
            </div>
          </div>
        </div>

        {/* VS */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 28,
            fontWeight: 900,
            color: "rgba(255,255,255,0.12)",
            opacity: vsSpring,
            transform: `scale(${interpolate(vsSpring, [0, 1], [0.3, 1])})`,
          }}
        >
          VS
        </div>

        {/* max-age */}
        <div
          style={{
            flex: 1,
            borderRadius: 18,
            background: "rgba(34,197,94,0.06)",
            border: "1px solid rgba(34,197,94,0.2)",
            padding: "20px 24px",
            opacity: rightCard,
            transform: `translateX(${interpolate(rightCard, [0, 1], [20, 0])}px)`,
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 700, color: "#22c55e", marginBottom: 8, letterSpacing: "2px" }}>
            MAX-AGE（新方案）✓
          </div>
          <div
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 14,
              color: "rgba(255,255,255,0.6)",
              background: "rgba(0,0,0,0.25)",
              borderRadius: 8,
              padding: "10px 14px",
              marginBottom: 12,
            }}
          >
            <div style={{ color: "#22c55e" }}>Cache-Control:</div>
            <div>max-age=3600</div>
          </div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
            使用<span style={{ color: "#22c55e", fontWeight: 700 }}>相对秒数</span>
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginTop: 6 }}>
            从收到响应开始计时，不依赖时钟同步
          </div>

          {/* 时间轴 */}
          <div style={{ marginTop: 16, position: "relative", height: 30 }}>
            <div
              style={{
                position: "absolute",
                top: 14,
                left: 0,
                right: 0,
                height: 2,
                background: "rgba(34,197,94,0.2)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 6,
                left: 0,
                fontSize: 10,
                color: "rgba(255,255,255,0.3)",
              }}
            >
              收到响应
            </div>
            <div
              style={{
                position: "absolute",
                top: 6,
                right: 0,
                fontSize: 10,
                color: "#22c55e",
              }}
            >
              +3600 秒后过期
            </div>
          </div>
        </div>
      </div>

      {/* 时钟不同步提示 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          opacity: warningSpring,
          transform: `translateY(${interpolate(warningSpring, [0, 1], [10, 0])}px)`,
        }}
      >
        <div
          style={{
            fontSize: 14,
            color: "#fbbf24",
            padding: "8px 20px",
            borderRadius: 10,
            background: "rgba(251,191,36,0.06)",
            border: "1px solid rgba(251,191,36,0.15)",
          }}
        >
          ⚠ Expires 依赖客户端时钟，max-age 不受影响
        </div>
      </div>

      {/* 结论 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          opacity: conclusionSpring,
          transform: `scale(${interpolate(conclusionSpring, [0, 1], [0.7, 1])})`,
        }}
      >
        <div
          style={{
            fontSize: 18,
            fontWeight: 900,
            color: "#22c55e",
            padding: "10px 28px",
            borderRadius: 12,
            background: "rgba(34,197,94,0.08)",
            border: "1px solid rgba(34,197,94,0.25)",
          }}
        >
          ✓ 两者同时存在时，max-age 优先
        </div>
      </div>
    </AbsoluteFill>
  );
};
