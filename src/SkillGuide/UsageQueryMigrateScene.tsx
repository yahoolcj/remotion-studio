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

const MIGRATIONS = [
  { from: "el-button", to: "z1-button" },
  { from: "el-table", to: "z1-table" },
  { from: "el-dialog", to: "z1-modal" },
  { from: "el-input", to: "z1-input" },
];

export const UsageQueryMigrateScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 200 }, delay: 5 });

  const leftPanel = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
    delay: 20,
  });

  const rightPanel = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
    delay: 35,
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        fontFamily,
        padding: "40px 50px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 24,
      }}
    >
      {/* 标题 */}
      <div
        style={{
          fontSize: 36,
          fontWeight: 900,
          color: "white",
          textAlign: "center",
          opacity: titleSpring,
          transform: `translateY(${interpolate(titleSpring, [0, 1], [25, 0])}px)`,
        }}
      >
        更多使用场景
      </div>

      {/* 左右分栏 */}
      <div
        style={{
          display: "flex",
          gap: 24,
          flex: 1,
          maxHeight: 400,
        }}
      >
        {/* 左: 查询组件用法 */}
        <div
          style={{
            flex: 1,
            padding: "24px 28px",
            borderRadius: 18,
            background: "rgba(255,255,255,0.04)",
            border: "1.5px solid rgba(99,102,241,0.25)",
            display: "flex",
            flexDirection: "column",
            gap: 14,
            opacity: leftPanel,
            transform: `translateX(${interpolate(leftPanel, [0, 1], [-30, 0])}px)`,
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#6366f1",
              padding: "3px 10px",
              borderRadius: 8,
              background: "rgba(99,102,241,0.12)",
              alignSelf: "flex-start",
            }}
          >
            场景二：查询组件用法
          </div>

          {["z1-table 怎么实现多选？", "消息提示怎么用？", "Drawer 有哪些属性？"].map(
            (q, i) => {
              const qSpring = spring({
                frame,
                fps,
                config: { damping: 200 },
                delay: 50 + i * 22,
              });
              return (
                <div
                  key={q}
                  style={{
                    padding: "10px 16px",
                    borderRadius: 10,
                    background: "rgba(99,102,241,0.08)",
                    border: "1px solid rgba(99,102,241,0.15)",
                    fontSize: 14,
                    color: "rgba(255,255,255,0.75)",
                    opacity: qSpring,
                    transform: `translateY(${interpolate(qSpring, [0, 1], [12, 0])}px)`,
                  }}
                >
                  💬 {q}
                </div>
              );
            },
          )}

          <div
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.35)",
              opacity: interpolate(frame, [120, 135], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            AI 读取内置文档，给出准确用法和示例
          </div>
        </div>

        {/* 右: 迁移旧代码 */}
        <div
          style={{
            flex: 1,
            padding: "24px 28px",
            borderRadius: 18,
            background: "rgba(255,255,255,0.04)",
            border: "1.5px solid rgba(236,72,153,0.25)",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            opacity: rightPanel,
            transform: `translateX(${interpolate(rightPanel, [0, 1], [30, 0])}px)`,
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#ec4899",
              padding: "3px 10px",
              borderRadius: 8,
              background: "rgba(236,72,153,0.12)",
              alignSelf: "flex-start",
            }}
          >
            场景三：迁移旧代码
          </div>

          {MIGRATIONS.map((m, i) => {
            const mSpring = spring({
              frame,
              fps,
              config: { damping: 14, stiffness: 100 },
              delay: 65 + i * 22,
            });

            const arrowProgress = interpolate(
              frame,
              [75 + i * 22, 85 + i * 22],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            );

            return (
              <div
                key={m.from}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  opacity: mSpring,
                  transform: `translateY(${interpolate(mSpring, [0, 1], [12, 0])}px)`,
                }}
              >
                <div
                  style={{
                    padding: "6px 12px",
                    borderRadius: 8,
                    background: "rgba(239,68,68,0.08)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    fontFamily: "'Courier New', monospace",
                    fontSize: 14,
                    color: "#ef4444",
                    textDecoration: arrowProgress > 0.5 ? "line-through" : "none",
                  }}
                >
                  {m.from}
                </div>
                <div
                  style={{
                    color: "#818cf8",
                    fontSize: 18,
                    opacity: arrowProgress,
                  }}
                >
                  →
                </div>
                <div
                  style={{
                    padding: "6px 12px",
                    borderRadius: 8,
                    background: "rgba(34,197,94,0.08)",
                    border: "1px solid rgba(34,197,94,0.2)",
                    fontFamily: "'Courier New', monospace",
                    fontSize: 14,
                    color: "#22c55e",
                    opacity: arrowProgress,
                    transform: `scale(${interpolate(arrowProgress, [0, 1], [0.8, 1])})`,
                  }}
                >
                  {m.to}
                </div>
              </div>
            );
          })}

          <div
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.35)",
              marginTop: 4,
              opacity: interpolate(frame, [170, 185], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            自动对照替换 Element UI → z1-design
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
