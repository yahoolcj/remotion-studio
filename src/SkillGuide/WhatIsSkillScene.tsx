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

const LAYERS = [
  {
    label: "元数据",
    desc: "名称 + 描述 ≈ 100 tokens",
    tag: "始终加载",
    color: "#6366f1",
    bgColor: "rgba(99,102,241,0.10)",
    borderColor: "rgba(99,102,241,0.35)",
  },
  {
    label: "指令",
    desc: "SKILL.md 工作流与最佳实践",
    tag: "触发时加载",
    color: "#a855f7",
    bgColor: "rgba(168,85,247,0.10)",
    borderColor: "rgba(168,85,247,0.35)",
  },
  {
    label: "资源",
    desc: "参考文档 / 脚本 / 模板",
    tag: "按需加载",
    color: "#ec4899",
    bgColor: "rgba(236,72,153,0.10)",
    borderColor: "rgba(236,72,153,0.35)",
  },
];

export const WhatIsSkillScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 200 }, delay: 5 });

  const subtitleSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 20,
  });

  const badgeSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
    delay: 35,
  });

  const arrowProgress = interpolate(frame, [100, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
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
          fontSize: 40,
          fontWeight: 900,
          color: "white",
          textAlign: "center",
          opacity: titleSpring,
          transform: `translateY(${interpolate(titleSpring, [0, 1], [30, 0])}px)`,
        }}
      >
        什么是 Agent Skills？
      </div>

      {/* 副标题 */}
      <div
        style={{
          fontSize: 18,
          color: "rgba(255,255,255,0.5)",
          textAlign: "center",
          opacity: subtitleSpring,
          transform: `translateY(${interpolate(subtitleSpring, [0, 1], [15, 0])}px)`,
        }}
      >
        Anthropic 提出的模块化能力扩展规范
      </div>

      {/* 渐进式加载 badge */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 4,
          opacity: badgeSpring,
          transform: `scale(${interpolate(badgeSpring, [0, 1], [0.7, 1])})`,
        }}
      >
        <div
          style={{
            padding: "6px 20px",
            borderRadius: 20,
            background: "rgba(99,102,241,0.12)",
            border: "1px solid rgba(99,102,241,0.3)",
            fontSize: 14,
            fontWeight: 700,
            color: "#818cf8",
          }}
        >
          核心机制：渐进式加载 Progressive Disclosure
        </div>
      </div>

      {/* 三层结构 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
          marginTop: 16,
        }}
      >
        {LAYERS.map((layer, i) => {
          const layerDelay = 55 + i * 30;
          const layerSpring = spring({
            frame,
            fps,
            config: { damping: 14, stiffness: 100 },
            delay: layerDelay,
          });

          const width = 600 - i * 60;

          return (
            <div
              key={layer.label}
              style={{
                width,
                padding: "14px 24px",
                borderRadius: 14,
                background: layer.bgColor,
                border: `1.5px solid ${layer.borderColor}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                opacity: layerSpring,
                transform: `translateY(${interpolate(layerSpring, [0, 1], [30, 0])}px) scale(${interpolate(layerSpring, [0, 1], [0.9, 1])})`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 900,
                    color: layer.color,
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    background: `${layer.color}22`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {i + 1}
                </div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "white" }}>
                    {layer.label}
                  </div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
                    {layer.desc}
                  </div>
                </div>
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: layer.color,
                  padding: "3px 10px",
                  borderRadius: 8,
                  background: `${layer.color}18`,
                }}
              >
                {layer.tag}
              </div>
            </div>
          );
        })}
      </div>

      {/* 底部说明 */}
      <div
        style={{
          fontSize: 15,
          color: "rgba(255,255,255,0.4)",
          textAlign: "center",
          opacity: arrowProgress,
          marginTop: 8,
        }}
      >
        安装多个 Skill 几乎不产生额外上下文开销
      </div>
    </AbsoluteFill>
  );
};
