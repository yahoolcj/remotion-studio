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

const RULES = [
  { num: "1", text: "MAJOR — 不兼容的 API 变更", color: "#6366f1" },
  { num: "2", text: "MINOR — 向后兼容的新功能", color: "#a855f7" },
  { num: "3", text: "PATCH — 向后兼容的 Bug 修复", color: "#ec4899" },
  { num: "4", text: "预发布标识不保证稳定性", color: "#f59e0b" },
  { num: "5", text: "构建元数据不影响版本比较", color: "#06b6d4" },
];

export const SummaryScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 200 }, delay: 5 });

  // 结尾 SemVer 大字
  const endSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
    delay: 80,
  });

  const endLineWidth = interpolate(
    frame,
    [3 * fps, 3.5 * fps],
    [0, 300],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        fontFamily,
        padding: 80,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* 标题 */}
      <div
        style={{
          fontSize: 44,
          fontWeight: 900,
          color: "white",
          marginBottom: 48,
          opacity: titleSpring,
          transform: `translateY(${interpolate(titleSpring, [0, 1], [20, 0])}px)`,
        }}
      >
        核心要点回顾
      </div>

      {/* 规则列表 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          width: "100%",
          maxWidth: 800,
          marginBottom: 48,
        }}
      >
        {RULES.map((rule, i) => {
          const delay = 15 + i * 12;
          const ruleSpring = spring({
            frame,
            fps,
            config: { damping: 200 },
            delay,
          });

          return (
            <div
              key={rule.num}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                opacity: ruleSpring,
                transform: `translateX(${interpolate(ruleSpring, [0, 1], [-40, 0])}px)`,
                padding: "14px 24px",
                borderRadius: 14,
                background: `${rule.color}08`,
                border: `1px solid ${rule.color}22`,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: `${rule.color}22`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 18,
                  fontWeight: 900,
                  color: rule.color,
                  flexShrink: 0,
                }}
              >
                {rule.num}
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "rgba(255,255,255,0.85)" }}>
                {rule.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* 结尾大字 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          transform: `scale(${interpolate(endSpring, [0, 1], [0.5, 1])})`,
          opacity: endSpring,
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            letterSpacing: "-1px",
          }}
        >
          <span style={{ color: "#818cf8" }}>Sem</span>
          <span style={{ color: "#f472b6" }}>Ver</span>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 32, marginLeft: 12 }}>
            2.0.0
          </span>
        </div>
        <div
          style={{
            width: endLineWidth,
            height: 3,
            background: "linear-gradient(90deg, #818cf8, #f472b6)",
            borderRadius: 2,
          }}
        />
        <div
          style={{
            fontSize: 18,
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "3px",
            opacity: interpolate(frame, [3.5 * fps, 4 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          semver.org
        </div>
      </div>
    </AbsoluteFill>
  );
};
