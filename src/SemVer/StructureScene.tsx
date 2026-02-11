import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});

const PARTS = [
  { label: "MAJOR", value: "1", color: "#6366f1", desc: "主版本号" },
  { label: "MINOR", value: "4", color: "#a855f7", desc: "次版本号" },
  { label: "PATCH", value: "2", color: "#ec4899", desc: "修订号" },
];

export const StructureScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 标题入场
  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 5,
  });

  // 版本号整体入场
  const versionEntry = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 120 },
    delay: 15,
  });

  // 分割动画 - 三段分开
  const splitProgress = interpolate(
    frame,
    [1.2 * fps, 2 * fps],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.quad),
    },
  );

  // 连接线动画
  const connectorProgress = interpolate(
    frame,
    [2.2 * fps, 2.8 * fps],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  // 标签淡入
  const labelOpacity = (delay: number) =>
    interpolate(frame, [delay, delay + 0.3 * fps], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  const labelY = (delay: number) =>
    interpolate(frame, [delay, delay + 0.3 * fps], [15, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        fontFamily,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* 标题 */}
      <div
        style={{
          fontSize: 42,
          fontWeight: 700,
          color: "white",
          marginBottom: 60,
          opacity: titleSpring,
          transform: `translateY(${interpolate(titleSpring, [0, 1], [20, 0])}px)`,
        }}
      >
        版本号结构
      </div>

      {/* 版本号容器 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 0,
          transform: `scale(${interpolate(versionEntry, [0, 1], [0.5, 1])})`,
          opacity: versionEntry,
        }}
      >
        {PARTS.map((part, i) => {
          const xOffset =
            i === 0
              ? -splitProgress * 50
              : i === 2
                ? splitProgress * 50
                : 0;

          const labelDelay = 2.5 * fps + i * 8;

          return (
            <div
              key={part.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transform: `translateX(${xOffset}px)`,
              }}
            >
              {/* 数字 */}
              <div
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 24,
                  background: `linear-gradient(135deg, ${part.color}, ${part.color}cc)`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 64,
                  fontWeight: 900,
                  color: "white",
                  boxShadow: `0 12px 40px ${part.color}44`,
                  border: `2px solid ${part.color}88`,
                }}
              >
                {part.value}
              </div>

              {/* 连接线 */}
              <div
                style={{
                  width: 2,
                  height: interpolate(connectorProgress, [0, 1], [0, 40]),
                  background: `${part.color}88`,
                  marginTop: 8,
                }}
              />

              {/* 标签 */}
              <div
                style={{
                  marginTop: 8,
                  opacity: labelOpacity(labelDelay),
                  transform: `translateY(${labelY(labelDelay)}px)`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: part.color,
                    letterSpacing: "2px",
                  }}
                >
                  {part.label}
                </div>
                <div
                  style={{
                    fontSize: 16,
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  {part.desc}
                </div>
              </div>

              {/* 点号分隔符（前两个之后显示） */}
              {i < 2 && (
                <div
                  style={{
                    position: "absolute",
                    top: 35,
                    right: i === 0 ? -35 : undefined,
                    left: i === 1 ? undefined : undefined,
                    fontSize: 56,
                    fontWeight: 900,
                    color: "rgba(255,255,255,0.3)",
                    opacity: interpolate(splitProgress, [0, 0.3], [1, 0.6], {
                      extrapolateRight: "clamp",
                    }),
                  }}
                >
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 底部公式 */}
      <div
        style={{
          marginTop: 80,
          display: "flex",
          alignItems: "center",
          gap: 8,
          opacity: interpolate(
            frame,
            [3 * fps, 3.5 * fps],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          ),
        }}
      >
        <FormulaToken text="MAJOR" color="#6366f1" />
        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 28, fontWeight: 700 }}>.</span>
        <FormulaToken text="MINOR" color="#a855f7" />
        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 28, fontWeight: 700 }}>.</span>
        <FormulaToken text="PATCH" color="#ec4899" />
      </div>
    </AbsoluteFill>
  );
};

const FormulaToken: React.FC<{ text: string; color: string }> = ({ text, color }) => (
  <div
    style={{
      padding: "8px 20px",
      borderRadius: 12,
      background: `${color}18`,
      border: `1px solid ${color}44`,
      color,
      fontSize: 20,
      fontWeight: 700,
      letterSpacing: "1px",
    }}
  >
    {text}
  </div>
);
