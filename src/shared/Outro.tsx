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

export type OutroProps = {
  /** 可选的总结要点列表，不传则只显示"谢谢观看" */
  summaryPoints?: string[];
};

/**
 * 通用结尾片段 — 所有视频统一使用
 *
 * 展示可选的总结要点 + "谢谢观看" + 署名 "花蛤豆腐汤"
 * 推荐时长：无总结时 90 帧（3 秒），有总结时 150 帧（5 秒）@30fps
 */
export const Outro: React.FC<OutroProps> = ({ summaryPoints }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const hasSummary = summaryPoints && summaryPoints.length > 0;

  // ---- 总结要点动画 ----
  const summaryTitleSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 5,
  });

  // ---- "谢谢观看" 入场 ----
  const thanksDelay = hasSummary ? 10 + summaryPoints.length * 12 + 15 : 8;
  const thanksSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
    delay: thanksDelay,
  });
  const thanksScale = interpolate(thanksSpring, [0, 1], [0.5, 1]);

  // ---- 装饰线 ----
  const lineDelay = thanksDelay + 12;
  const lineWidth = interpolate(
    frame,
    [lineDelay, lineDelay + 0.8 * fps],
    [0, 280],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // ---- 署名 ----
  const authorSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: lineDelay + 10,
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        fontFamily,
        padding: "60px 80px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* 背景装饰 */}
      <div
        style={{
          position: "absolute",
          top: -100,
          left: -100,
          width: 460,
          height: 460,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -80,
          right: -80,
          width: 380,
          height: 380,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)",
        }}
      />

      {/* 可选：总结要点 */}
      {hasSummary && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            width: "100%",
            maxWidth: 800,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 900,
              color: "white",
              marginBottom: 12,
              opacity: summaryTitleSpring,
              transform: `translateY(${interpolate(summaryTitleSpring, [0, 1], [20, 0])}px)`,
              textAlign: "center",
            }}
          >
            核心要点
          </div>

          {summaryPoints.map((point, i) => {
            const delay = 10 + i * 12;
            const pointSpring = spring({
              frame,
              fps,
              config: { damping: 200 },
              delay,
            });

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  opacity: pointSpring,
                  transform: `translateX(${interpolate(pointSpring, [0, 1], [-30, 0])}px)`,
                  padding: "10px 20px",
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    background: "rgba(129,140,248,0.2)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: 15,
                    fontWeight: 900,
                    color: "#818cf8",
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </div>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.85)",
                  }}
                >
                  {point}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 谢谢观看 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          transform: `scale(${thanksScale})`,
          opacity: thanksSpring,
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: "white",
            letterSpacing: "4px",
            textShadow: "0 4px 30px rgba(99,102,241,0.4)",
          }}
        >
          谢谢观看
        </div>
      </div>

      {/* 装饰线 */}
      <div
        style={{
          width: lineWidth,
          height: 3,
          background: "linear-gradient(90deg, #818cf8, #f472b6)",
          borderRadius: 2,
          marginTop: 16,
        }}
      />

      {/* 署名 */}
      <div
        style={{
          marginTop: 20,
          fontSize: 24,
          fontWeight: 700,
          color: "rgba(255,255,255,0.5)",
          letterSpacing: "6px",
          opacity: authorSpring,
          transform: `translateY(${interpolate(authorSpring, [0, 1], [15, 0])}px)`,
        }}
      >
        花蛤豆腐汤
      </div>
    </AbsoluteFill>
  );
};
