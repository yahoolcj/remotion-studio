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

export const CacheOverviewScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 200 }, delay: 5 });

  const requestBox = spring({ frame, fps, config: { damping: 15 }, delay: 20 });

  const forkLine = interpolate(frame, [45, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const strongCard = spring({ frame, fps, config: { damping: 15 }, delay: 55 });
  const negotiateCard = spring({ frame, fps, config: { damping: 15 }, delay: 75 });

  const strongDetail = spring({ frame, fps, config: { damping: 200 }, delay: 90 });
  const negotiateDetail = spring({ frame, fps, config: { damping: 200 }, delay: 110 });

  const vsSpring = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 120 },
    delay: 65,
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
        alignItems: "center",
        gap: 24,
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
          alignSelf: "flex-start",
        }}
      >
        HTTP 缓存总览
      </div>

      {/* 请求起点 */}
      <div
        style={{
          padding: "12px 32px",
          borderRadius: 14,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.12)",
          fontSize: 18,
          fontWeight: 700,
          color: "rgba(255,255,255,0.85)",
          opacity: requestBox,
          transform: `scale(${interpolate(requestBox, [0, 1], [0.7, 1])})`,
        }}
      >
        🌐 浏览器发起请求
      </div>

      {/* 分叉线 */}
      <div
        style={{
          width: 2,
          height: interpolate(forkLine, [0, 1], [0, 30]),
          background: "rgba(255,255,255,0.15)",
        }}
      />

      {/* 两条路径 */}
      <div
        style={{
          display: "flex",
          gap: 40,
          width: "100%",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        {/* 强缓存 */}
        <div
          style={{
            flex: 1,
            maxWidth: 480,
            borderRadius: 18,
            background: "rgba(99,102,241,0.08)",
            border: "2px solid rgba(99,102,241,0.25)",
            padding: "20px 24px",
            opacity: strongCard,
            transform: `translateX(${interpolate(strongCard, [0, 1], [-30, 0])}px)`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "rgba(99,102,241,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
              }}
            >
              ⚡
            </div>
            <div style={{ fontSize: 22, fontWeight: 900, color: "#818cf8" }}>
              强缓存
            </div>
          </div>
          <div
            style={{
              fontSize: 15,
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.8,
              opacity: strongDetail,
            }}
          >
            直接使用本地副本
          </div>
          <div
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.6,
              marginTop: 8,
              opacity: strongDetail,
            }}
          >
            不发请求，速度最快
          </div>
          <div
            style={{
              marginTop: 12,
              fontFamily: "'Courier New', monospace",
              fontSize: 13,
              color: "#818cf8",
              background: "rgba(0,0,0,0.2)",
              padding: "8px 12px",
              borderRadius: 8,
              opacity: strongDetail,
            }}
          >
            Cache-Control: max-age=3600
          </div>
        </div>

        {/* VS */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 900,
            color: "rgba(255,255,255,0.15)",
            alignSelf: "center",
            opacity: vsSpring,
            transform: `scale(${interpolate(vsSpring, [0, 1], [0.3, 1])})`,
          }}
        >
          VS
        </div>

        {/* 协商缓存 */}
        <div
          style={{
            flex: 1,
            maxWidth: 480,
            borderRadius: 18,
            background: "rgba(168,85,247,0.08)",
            border: "2px solid rgba(168,85,247,0.25)",
            padding: "20px 24px",
            opacity: negotiateCard,
            transform: `translateX(${interpolate(negotiateCard, [0, 1], [30, 0])}px)`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "rgba(168,85,247,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
              }}
            >
              🤝
            </div>
            <div style={{ fontSize: 22, fontWeight: 900, color: "#a855f7" }}>
              协商缓存
            </div>
          </div>
          <div
            style={{
              fontSize: 15,
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.8,
              opacity: negotiateDetail,
            }}
          >
            先问服务器，没变就用本地的
          </div>
          <div
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.6,
              marginTop: 8,
              opacity: negotiateDetail,
            }}
          >
            需要一次请求，但可能不传内容（304）
          </div>
          <div
            style={{
              marginTop: 12,
              fontFamily: "'Courier New', monospace",
              fontSize: 13,
              color: "#a855f7",
              background: "rgba(0,0,0,0.2)",
              padding: "8px 12px",
              borderRadius: 8,
              opacity: negotiateDetail,
            }}
          >
            ETag / If-None-Match
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
