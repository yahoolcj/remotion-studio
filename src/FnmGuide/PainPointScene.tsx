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

export const PainPointScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 200 }, delay: 5 });

  // 终端命令逐行入场
  const cmd1 = spring({ frame, fps, config: { damping: 200 }, delay: 18 });
  const cmd2 = spring({ frame, fps, config: { damping: 200 }, delay: 35 });
  const annotation = spring({ frame, fps, config: { damping: 200 }, delay: 50 });

  // 下半区两终端
  const termLeft = spring({ frame, fps, config: { damping: 15 }, delay: 70 });
  const termRight = spring({ frame, fps, config: { damping: 15 }, delay: 85 });
  const errorBadge = spring({ frame, fps, config: { damping: 10, stiffness: 120 }, delay: 110 });
  const conclusion = spring({ frame, fps, config: { damping: 200 }, delay: 135 });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        fontFamily,
        padding: "36px 56px",
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
          opacity: titleSpring,
          transform: `translateY(${interpolate(titleSpring, [0, 1], [20, 0])}px)`,
        }}
      >
        nvm 的困境
      </div>

      {/* 上半区：nvm 全局切换演示 */}
      <div
        style={{
          background: "rgba(0,0,0,0.35)",
          borderRadius: 14,
          padding: "16px 22px",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <TermLine spring={cmd1} prompt text="nvm use 16" />
        <TermLine spring={cmd1} text="Now using node v16.20.0" dim delay={6} />
        <TermLine spring={cmd2} prompt text="nvm use 20" />
        <TermLine spring={cmd2} text="Now using node v20.11.0" dim delay={6} />
        <div
          style={{
            marginTop: 10,
            fontSize: 15,
            color: "#fbbf24",
            fontWeight: 700,
            opacity: annotation,
            transform: `translateX(${interpolate(annotation, [0, 1], [20, 0])}px)`,
          }}
        >
          ⚠ nvm 切换是全局的 — 所有终端都受影响
        </div>
      </div>

      {/* 下半区：两终端并排 */}
      <div style={{ display: "flex", gap: 16 }}>
        {/* 左终端 — 项目 A */}
        <div
          style={{
            flex: 1,
            background: "rgba(0,0,0,0.35)",
            borderRadius: 14,
            padding: "14px 18px",
            border: "1px solid rgba(34,197,94,0.2)",
            opacity: termLeft,
            transform: `translateX(${interpolate(termLeft, [0, 1], [-30, 0])}px)`,
          }}
        >
          <div style={{ fontSize: 13, color: "#86efac", fontWeight: 700, marginBottom: 8 }}>
            项目 A — 需要 Node 16
          </div>
          <TermLine spring={termLeft} prompt text="npm start" small />
          <TermLine spring={termLeft} text="✓ Server running on :3000" dim small color="#86efac" delay={10} />
        </div>

        {/* 右终端 — 项目 B */}
        <div
          style={{
            flex: 1,
            background: "rgba(0,0,0,0.35)",
            borderRadius: 14,
            padding: "14px 18px",
            border: "1px solid rgba(99,102,241,0.2)",
            opacity: termRight,
            transform: `translateX(${interpolate(termRight, [0, 1], [30, 0])}px)`,
          }}
        >
          <div style={{ fontSize: 13, color: "#818cf8", fontWeight: 700, marginBottom: 8 }}>
            项目 B — 切换到 Node 20 后…
          </div>
          <TermLine spring={termRight} prompt text="nvm use 20" small />
          <TermLine spring={termRight} text="项目 A 也变成了 20 →" dim small delay={8} />
          <TermLine spring={termRight} text="✗ Error: Incompatible Node version" small color="#fca5a5" delay={14} />
        </div>
      </div>

      {/* 错误标记 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          opacity: errorBadge,
          transform: `scale(${interpolate(errorBadge, [0, 1], [0.5, 1])})`,
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontWeight: 900,
            color: "#ef4444",
            padding: "8px 24px",
            borderRadius: 12,
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.3)",
          }}
        >
          ✗ nvm 无法做到项目级 Node 控制
        </div>
      </div>

      {/* 底部总结 */}
      <div
        style={{
          fontSize: 15,
          color: "rgba(255,255,255,0.5)",
          textAlign: "center",
          opacity: conclusion,
        }}
      >
        nvm 只能设置全局版本，同时运行两个项目时顾此失彼
      </div>
    </AbsoluteFill>
  );
};

// ---- 终端行组件 ----
const TermLine: React.FC<{
  spring: number;
  text: string;
  prompt?: boolean;
  dim?: boolean;
  small?: boolean;
  color?: string;
  delay?: number;
}> = ({ spring: s, text, prompt, dim, small, color, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineOpacity = delay
    ? interpolate(frame, [delay, delay + 0.3 * fps], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : s;

  return (
    <div
      style={{
        fontFamily: "'Courier New', monospace",
        fontSize: small ? 14 : 16,
        color: color || (dim ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.85)"),
        padding: "2px 0",
        opacity: lineOpacity,
      }}
    >
      {prompt && <span style={{ color: "#22c55e", marginRight: 8 }}>$</span>}
      {text}
    </div>
  );
};
