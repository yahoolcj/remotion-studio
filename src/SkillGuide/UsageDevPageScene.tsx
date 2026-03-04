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

const COMPONENTS = [
  "<z1-table-layout>",
  "<z1-table-search>",
  "<z1-table>",
  "<z1-modal>",
];

export const UsageDevPageScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 200 }, delay: 5 });

  const sceneBadge = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
    delay: 15,
  });

  const userBubble = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
    delay: 30,
  });

  const aiBubble = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
    delay: 60,
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
        gap: 20,
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
        使用场景一：开发页面
      </div>

      {/* 场景标签 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          opacity: sceneBadge,
          transform: `scale(${interpolate(sceneBadge, [0, 1], [0.7, 1])})`,
        }}
      >
        <div
          style={{
            padding: "4px 14px",
            borderRadius: 14,
            background: "rgba(99,102,241,0.12)",
            border: "1px solid rgba(99,102,241,0.3)",
            fontSize: 13,
            fontWeight: 700,
            color: "#818cf8",
          }}
        >
          直接告诉 AI 你要开发什么页面
        </div>
      </div>

      {/* 对话区域 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 18,
          padding: "0 80px",
          marginTop: 8,
        }}
      >
        {/* 用户消息 */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            opacity: userBubble,
            transform: `translateX(${interpolate(userBubble, [0, 1], [40, 0])}px)`,
          }}
        >
          <div
            style={{
              maxWidth: 500,
              padding: "14px 22px",
              borderRadius: "18px 18px 4px 18px",
              background: "rgba(99,102,241,0.18)",
              border: "1px solid rgba(99,102,241,0.3)",
              fontSize: 16,
              color: "white",
              lineHeight: 1.5,
            }}
          >
            <span style={{ color: "#818cf8", fontWeight: 700, marginRight: 8 }}>
              用户
            </span>
            帮我写一个用户管理页面，包含查询、表格和新增编辑弹窗
          </div>
        </div>

        {/* AI 回复 */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            opacity: aiBubble,
            transform: `translateX(${interpolate(aiBubble, [0, 1], [-40, 0])}px)`,
          }}
        >
          <div
            style={{
              maxWidth: 560,
              padding: "18px 24px",
              borderRadius: "18px 18px 18px 4px",
              background: "rgba(168,85,247,0.10)",
              border: "1px solid rgba(168,85,247,0.25)",
            }}
          >
            <div
              style={{
                fontSize: 14,
                color: "#a855f7",
                fontWeight: 700,
                marginBottom: 10,
              }}
            >
              🤖 AI 自动生成
            </div>

            {/* 组件标签逐个出现 */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
              }}
            >
              {COMPONENTS.map((comp, i) => {
                const compSpring = spring({
                  frame,
                  fps,
                  config: { damping: 12, stiffness: 100 },
                  delay: 80 + i * 20,
                });

                return (
                  <div
                    key={comp}
                    style={{
                      padding: "8px 16px",
                      borderRadius: 10,
                      background: "rgba(99,102,241,0.12)",
                      border: "1px solid rgba(99,102,241,0.25)",
                      fontFamily: "'Courier New', monospace",
                      fontSize: 15,
                      color: "#818cf8",
                      fontWeight: 700,
                      opacity: compSpring,
                      transform: `scale(${interpolate(compSpring, [0, 1], [0.7, 1])})`,
                    }}
                  >
                    {comp}
                  </div>
                );
              })}
            </div>

            {/* 结果说明 */}
            <div
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.4)",
                marginTop: 12,
                opacity: interpolate(frame, [170, 185], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            >
              自动使用 z1-design 组件生成标准代码
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
