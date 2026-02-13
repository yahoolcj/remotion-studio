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

const FEATURES = [
  { icon: "📁", title: "项目级控制", desc: "每个项目独立 Node 版本，互不干扰", color: "#818cf8" },
  { icon: "⚡", title: "极速", desc: "Rust 编写，比 nvm 快 40 倍", color: "#f59e0b" },
  { icon: "🖥️", title: "跨平台", desc: "Windows / macOS / Linux 原生支持", color: "#34d399" },
];

export const WhatIsFnmScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSpring = spring({ frame, fps, config: { damping: 12, stiffness: 100 }, delay: 5 });
  const subtitleSpring = spring({ frame, fps, config: { damping: 200 }, delay: 18 });
  const compareSpring = spring({ frame, fps, config: { damping: 200 }, delay: 80 });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        fontFamily,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
        padding: "40px 60px",
      }}
    >
      {/* fnm 大字 */}
      <div
        style={{
          fontSize: 96,
          fontWeight: 900,
          background: "linear-gradient(135deg, #818cf8, #f472b6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          transform: `scale(${interpolate(logoSpring, [0, 1], [0.4, 1])})`,
          opacity: logoSpring,
          letterSpacing: "-2px",
        }}
      >
        fnm
      </div>

      {/* 副标题 */}
      <div
        style={{
          fontSize: 24,
          fontWeight: 400,
          color: "rgba(255,255,255,0.55)",
          letterSpacing: "4px",
          opacity: subtitleSpring,
          transform: `translateY(${interpolate(subtitleSpring, [0, 1], [15, 0])}px)`,
          marginBottom: 16,
        }}
      >
        项目级 Node 版本管理器
      </div>

      {/* 特性卡片 */}
      <div style={{ display: "flex", gap: 20, width: "100%", maxWidth: 900 }}>
        {FEATURES.map((f, i) => {
          const cardSpring = spring({
            frame,
            fps,
            config: { damping: 15, stiffness: 120 },
            delay: 30 + i * 14,
          });

          return (
            <div
              key={f.title}
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.04)",
                borderRadius: 16,
                padding: "24px 20px",
                border: `1px solid ${f.color}33`,
                opacity: cardSpring,
                transform: `translateY(${interpolate(cardSpring, [0, 1], [30, 0])}px) scale(${interpolate(cardSpring, [0, 1], [0.85, 1])})`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                textAlign: "center",
              }}
            >
              <span style={{ fontSize: 36 }}>{f.icon}</span>
              <div style={{ fontSize: 20, fontWeight: 700, color: f.color }}>{f.title}</div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>
                {f.desc}
              </div>
            </div>
          );
        })}
      </div>

      {/* 底部对比条 */}
      <div
        style={{
          marginTop: 20,
          display: "flex",
          gap: 24,
          alignItems: "center",
          opacity: compareSpring,
          transform: `translateY(${interpolate(compareSpring, [0, 1], [15, 0])}px)`,
        }}
      >
        <CompareTag label="nvm" desc="全局切换，无法项目隔离" color="#ef4444" negative />
        <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 20 }}>vs</span>
        <CompareTag label="fnm" desc="项目级自动切换，完美隔离" color="#22c55e" />
      </div>
    </AbsoluteFill>
  );
};

const CompareTag: React.FC<{
  label: string;
  desc: string;
  color: string;
  negative?: boolean;
}> = ({ label, desc, color, negative }) => (
  <div
    style={{
      padding: "10px 22px",
      borderRadius: 12,
      background: `${color}0d`,
      border: `1px solid ${color}33`,
      display: "flex",
      alignItems: "center",
      gap: 10,
    }}
  >
    <span style={{ fontSize: 16, fontWeight: 900, color }}>{negative ? "✗" : "✓"}</span>
    <div>
      <div style={{ fontSize: 16, fontWeight: 700, color }}>{label}</div>
      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>{desc}</div>
    </div>
  </div>
);
