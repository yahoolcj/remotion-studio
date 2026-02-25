import React from "react";
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

/**
 * 场景 11：时间轴总览
 * 横向时间轴，标注里程碑事件
 */

const MILESTONES: {
  time: string;
  label: string;
  color: string;
  icon: string;
}[] = [
  { time: "0", label: "大爆炸", color: "#fbbf24", icon: "💥" },
  { time: "10⁻³² 秒", label: "暴胀结束", color: "#c084fc", icon: "🔮" },
  { time: "3 分钟", label: "核合成", color: "#ef4444", icon: "⚛️" },
  { time: "38 万年", label: "CMB / 透明", color: "#f59e0b", icon: "🌡️" },
  { time: "1 亿年", label: "第一颗恒星", color: "#fcd34d", icon: "⭐" },
  { time: "5 亿年", label: "星系形成", color: "#818cf8", icon: "🌌" },
  { time: "92 亿年", label: "太阳系诞生", color: "#3b82f6", icon: "☀️" },
  { time: "138 亿年", label: "今天", color: "#22c55e", icon: "🌍" },
];

export const TimelineScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 200 }, delay: 5 });

  // 时间线展开动画
  const lineProgress = interpolate(frame, [15, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(180deg, #070515 0%, #0f0a2a 50%, #070515 100%)",
        fontFamily,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 50px",
      }}
    >
      {/* 标题 */}
      <div
        style={{
          fontSize: 32,
          fontWeight: 900,
          color: "white",
          marginBottom: 50,
          opacity: titleSpring,
          transform: `translateY(${interpolate(titleSpring, [0, 1], [20, 0])}px)`,
          textShadow: "0 0 30px rgba(129,140,248,0.2)",
        }}
      >
        宇宙 138 亿年演化时间轴
      </div>

      {/* 时间线 */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 1100,
          height: 200,
        }}
      >
        {/* 主线条 */}
        <div
          style={{
            position: "absolute",
            top: 80,
            left: 0,
            height: 3,
            width: `${lineProgress * 100}%`,
            background: "linear-gradient(90deg, #fbbf24, #c084fc, #818cf8, #22c55e)",
            borderRadius: 2,
            boxShadow: "0 0 10px rgba(129,140,248,0.3)",
          }}
        />

        {/* 里程碑节点 */}
        {MILESTONES.map((m, i) => {
          const nodeDelay = 20 + i * 12;
          const nodeSpring = spring({
            frame,
            fps,
            config: { damping: 15, stiffness: 120 },
            delay: nodeDelay,
          });
          const xPercent = (i / (MILESTONES.length - 1)) * 100;
          const isTop = i % 2 === 0;

          return (
            <div
              key={m.label}
              style={{
                position: "absolute",
                left: `${xPercent}%`,
                top: isTop ? 0 : 90,
                transform: `translateX(-50%) scale(${interpolate(nodeSpring, [0, 1], [0.3, 1])})`,
                opacity: nodeSpring,
                display: "flex",
                flexDirection: isTop ? "column" : "column-reverse",
                alignItems: "center",
                gap: 4,
              }}
            >
              {/* 标签 */}
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 900,
                  color: m.color,
                  whiteSpace: "nowrap",
                }}
              >
                {m.label}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.3)",
                  whiteSpace: "nowrap",
                }}
              >
                {m.time}
              </div>
              {/* 图标 */}
              <div style={{ fontSize: 20 }}>{m.icon}</div>
              {/* 连接线 */}
              <div
                style={{
                  width: 1,
                  height: isTop ? 20 : 20,
                  background: `${m.color}44`,
                }}
              />
              {/* 节点圆点 */}
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: m.color,
                  boxShadow: `0 0 8px ${m.color}`,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* 底部标注 */}
      <div
        style={{
          marginTop: 50,
          fontSize: 14,
          color: "rgba(255,255,255,0.25)",
          opacity: interpolate(frame, [140, 170], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        从一个无限小的奇点，到拥有数千亿星系的壮阔宇宙
      </div>
    </AbsoluteFill>
  );
};
