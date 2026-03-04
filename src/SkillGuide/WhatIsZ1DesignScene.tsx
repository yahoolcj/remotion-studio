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

const CAPABILITIES = [
  {
    icon: "🎯",
    title: "优先使用 z1-design",
    desc: "自动选用 z1-design 组件编写 Vue 页面",
    color: "#6366f1",
  },
  {
    icon: "📦",
    title: "熟悉 55 个组件",
    desc: "掌握所有标签名、属性、事件和插槽",
    color: "#a855f7",
  },
  {
    icon: "📐",
    title: "遵循开发规范",
    desc: "标准列表页、表单弹窗、详情抽屉模板",
    color: "#ec4899",
  },
  {
    icon: "🎨",
    title: "正确使用设计变量",
    desc: "CSS Variables 保持视觉风格统一",
    color: "#f59e0b",
  },
];

export const WhatIsZ1DesignScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 200 }, delay: 5 });

  const tagSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
    delay: 18,
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
        z1-design-dev 能做什么？
      </div>

      {/* 标签 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          opacity: tagSpring,
          transform: `scale(${interpolate(tagSpring, [0, 1], [0.7, 1])})`,
        }}
      >
        <div
          style={{
            padding: "5px 16px",
            borderRadius: 16,
            background: "rgba(99,102,241,0.12)",
            border: "1px solid rgba(99,102,241,0.3)",
            fontSize: 13,
            fontWeight: 700,
            color: "#818cf8",
          }}
        >
          专为 z1-design 组件库打造的 AI Skill
        </div>
      </div>

      {/* 4 张能力卡片 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 18,
          marginTop: 8,
          padding: "0 40px",
        }}
      >
        {CAPABILITIES.map((cap, i) => {
          const cardSpring = spring({
            frame,
            fps,
            config: { damping: 14, stiffness: 100 },
            delay: 35 + i * 18,
          });

          return (
            <div
              key={cap.title}
              style={{
                padding: "20px 24px",
                borderRadius: 16,
                background: "rgba(255,255,255,0.04)",
                border: `1.5px solid ${cap.color}33`,
                display: "flex",
                alignItems: "flex-start",
                gap: 16,
                opacity: cardSpring,
                transform: `translateY(${interpolate(cardSpring, [0, 1], [25, 0])}px) scale(${interpolate(cardSpring, [0, 1], [0.92, 1])})`,
              }}
            >
              <div
                style={{
                  fontSize: 32,
                  lineHeight: 1,
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                {cap.icon}
              </div>
              <div>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: cap.color,
                    marginBottom: 4,
                  }}
                >
                  {cap.title}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: "rgba(255,255,255,0.5)",
                    lineHeight: 1.4,
                  }}
                >
                  {cap.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
