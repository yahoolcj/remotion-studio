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

export const LastModifiedScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 200 }, delay: 5 });

  const req1Spring = spring({ frame, fps, config: { damping: 200 }, delay: 20 });
  const res1Spring = spring({ frame, fps, config: { damping: 200 }, delay: 45 });
  const req2Spring = spring({ frame, fps, config: { damping: 200 }, delay: 75 });
  const res2Spring = spring({ frame, fps, config: { damping: 200 }, delay: 100 });

  const comparisonSpring = spring({ frame, fps, config: { damping: 200 }, delay: 130 });
  const warningSpring = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 120 },
    delay: 160,
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
        协商缓存：Last-Modified
      </div>

      {/* 请求/响应流程 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {/* 第一轮 */}
        <div
          style={{
            background: "rgba(0,0,0,0.3)",
            borderRadius: 14,
            padding: "14px 20px",
            border: "1px solid rgba(34,197,94,0.15)",
            opacity: req1Spring,
            transform: `translateX(${interpolate(req1Spring, [0, 1], [-20, 0])}px)`,
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "2px", marginBottom: 6 }}>
            第一次请求
          </div>
          <div style={{ fontFamily: "'Courier New', monospace", fontSize: 14 }}>
            <div style={{ color: "#818cf8" }}>
              GET /style.css → <span style={{ color: "#22c55e" }}>200 OK</span>
            </div>
            <div style={{ color: "#22c55e", opacity: res1Spring, marginTop: 4 }}>
              Last-Modified: Wed, 15 Jan 2025 08:30:00 GMT
            </div>
          </div>
        </div>

        {/* 箭头 */}
        <div style={{ textAlign: "center", color: "rgba(255,255,255,0.15)", fontSize: 20 }}>
          ↓ 缓存过期后 ↓
        </div>

        {/* 第二轮 */}
        <div
          style={{
            background: "rgba(0,0,0,0.3)",
            borderRadius: 14,
            padding: "14px 20px",
            border: "1px solid rgba(168,85,247,0.15)",
            opacity: req2Spring,
            transform: `translateX(${interpolate(req2Spring, [0, 1], [-20, 0])}px)`,
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "2px", marginBottom: 6 }}>
            第二次请求
          </div>
          <div style={{ fontFamily: "'Courier New', monospace", fontSize: 14 }}>
            <div style={{ color: "#818cf8" }}>
              GET /style.css
            </div>
            <div style={{ color: "#a855f7", marginTop: 4 }}>
              If-Modified-Since: Wed, 15 Jan 2025 08:30:00 GMT
            </div>
            <div style={{ color: "#fbbf24", marginTop: 8, opacity: res2Spring }}>
              → 304 Not Modified（无响应体）
            </div>
          </div>
        </div>
      </div>

      {/* ETag vs Last-Modified */}
      <div style={{ display: "flex", gap: 16, opacity: comparisonSpring }}>
        <div
          style={{
            flex: 1,
            padding: "12px 18px",
            borderRadius: 12,
            background: "rgba(99,102,241,0.06)",
            border: "1px solid rgba(99,102,241,0.15)",
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 900, color: "#818cf8", marginBottom: 4 }}>
            ETag ✓
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
            基于内容哈希，精确到字节
          </div>
        </div>
        <div
          style={{
            flex: 1,
            padding: "12px 18px",
            borderRadius: 12,
            background: "rgba(251,191,36,0.06)",
            border: "1px solid rgba(251,191,36,0.15)",
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 900, color: "#fbbf24", marginBottom: 4 }}>
            Last-Modified ⚠
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
            基于时间戳，精度仅到秒
          </div>
        </div>
      </div>

      {/* 警告 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          opacity: warningSpring,
          transform: `scale(${interpolate(warningSpring, [0, 1], [0.7, 1])})`,
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
          ⚠ 1 秒内多次修改时 Last-Modified 可能误判
        </div>
      </div>
    </AbsoluteFill>
  );
};
