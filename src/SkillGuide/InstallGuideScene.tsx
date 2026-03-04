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

const STEPS = [
  {
    num: 1,
    title: "下载",
    desc: "下载最新 z1-design-dev 压缩包",
    icon: "📥",
    color: "#6366f1",
  },
  {
    num: 2,
    title: "解压",
    desc: "解压 z1-design-dev-1.0.3.zip",
    icon: "📂",
    color: "#a855f7",
  },
  {
    num: 3,
    title: "放入目录",
    desc: "放到 .cursor/skills 目录下",
    icon: "📁",
    color: "#ec4899",
  },
];

export const InstallGuideScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 200 }, delay: 5 });

  const versionSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
    delay: 20,
  });

  const treeSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 150,
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        fontFamily,
        padding: "40px 60px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 24,
      }}
    >
      {/* 标题 */}
      <div
        style={{
          fontSize: 38,
          fontWeight: 900,
          color: "white",
          textAlign: "center",
          opacity: titleSpring,
          transform: `translateY(${interpolate(titleSpring, [0, 1], [25, 0])}px)`,
        }}
      >
        安装方式
      </div>

      {/* 版本号 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          opacity: versionSpring,
          transform: `scale(${interpolate(versionSpring, [0, 1], [0.7, 1])})`,
        }}
      >
        <div
          style={{
            padding: "4px 14px",
            borderRadius: 14,
            background: "rgba(34,211,238,0.10)",
            border: "1px solid rgba(34,211,238,0.3)",
            fontSize: 14,
            fontWeight: 700,
            color: "#22d3ee",
          }}
        >
          最新版本 v1.0.3
        </div>
      </div>

      {/* 步骤条 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: 20,
          marginTop: 8,
          padding: "0 20px",
        }}
      >
        {STEPS.map((step, i) => {
          const stepSpring = spring({
            frame,
            fps,
            config: { damping: 14, stiffness: 100 },
            delay: 40 + i * 28,
          });

          const connectorProgress =
            i < STEPS.length - 1
              ? interpolate(frame, [40 + (i + 1) * 28, 50 + (i + 1) * 28], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                })
              : 0;

          return (
            <div
              key={step.num}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 20,
              }}
            >
              <div
                style={{
                  width: 240,
                  padding: "24px 20px",
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.04)",
                  border: `1.5px solid ${step.color}40`,
                  textAlign: "center",
                  opacity: stepSpring,
                  transform: `translateY(${interpolate(stepSpring, [0, 1], [30, 0])}px) scale(${interpolate(stepSpring, [0, 1], [0.9, 1])})`,
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 8 }}>{step.icon}</div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    marginBottom: 6,
                  }}
                >
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      background: `${step.color}22`,
                      color: step.color,
                      fontSize: 13,
                      fontWeight: 900,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {step.num}
                  </div>
                  <div
                    style={{ fontSize: 18, fontWeight: 700, color: step.color }}
                  >
                    {step.title}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,0.5)",
                    lineHeight: 1.4,
                  }}
                >
                  {step.desc}
                </div>
              </div>

              {i < STEPS.length - 1 && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: 100,
                    color: "#818cf8",
                    fontSize: 24,
                    opacity: connectorProgress,
                  }}
                >
                  →
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 目录结构 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          opacity: treeSpring,
          transform: `translateY(${interpolate(treeSpring, [0, 1], [15, 0])}px)`,
        }}
      >
        <div
          style={{
            padding: "14px 28px",
            borderRadius: 12,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            fontFamily: "'Courier New', monospace",
            fontSize: 14,
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.8,
          }}
        >
          <span style={{ color: "#818cf8" }}>📂</span> .cursor/skills/
          <br />
          {"  "}
          <span style={{ color: "#a855f7" }}>📂</span> z1-design-dev/
          <br />
          {"    "}
          <span style={{ color: "#22d3ee" }}>📄</span> SKILL.md
        </div>
      </div>
    </AbsoluteFill>
  );
};
