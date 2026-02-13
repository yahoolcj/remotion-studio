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

export const DualTermScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 200 }, delay: 5 });
  const termLeft = spring({ frame, fps, config: { damping: 15 }, delay: 18 });
  const termRight = spring({ frame, fps, config: { damping: 15 }, delay: 34 });
  const checkSpring = spring({ frame, fps, config: { damping: 200 }, delay: 60 });
  const result1 = spring({ frame, fps, config: { damping: 200 }, delay: 80 });
  const result2 = spring({ frame, fps, config: { damping: 200 }, delay: 95 });
  const successBadge = spring({ frame, fps, config: { damping: 12, stiffness: 120 }, delay: 115 });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        fontFamily,
        padding: "36px 56px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 18,
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
        实战：双终端不同版本
      </div>

      {/* 两终端并排 */}
      <div style={{ display: "flex", gap: 16 }}>
        {/* 终端 A */}
        <TerminalBlock
          spring={termLeft}
          title="终端 A — 项目前端"
          color="#34d399"
          lines={[
            { prompt: true, text: "cd ~/frontend" },
            { text: 'Using Node v20.11.0 from .nvmrc', dim: true },
            { prompt: true, text: "node -v" },
            { text: "v20.11.0", dim: true },
            { prompt: true, text: "npm run dev" },
            { text: "✓ Vite server running on :5173", dim: true, color: "#34d399" },
          ]}
        />

        {/* 终端 B */}
        <TerminalBlock
          spring={termRight}
          title="终端 B — 项目后端"
          color="#818cf8"
          lines={[
            { prompt: true, text: "cd ~/backend" },
            { text: 'Using Node v18.20.0 from .nvmrc', dim: true },
            { prompt: true, text: "node -v" },
            { text: "v18.20.0", dim: true },
            { prompt: true, text: "npm start" },
            { text: "✓ Express server on :4000", dim: true, color: "#818cf8" },
          ]}
        />
      </div>

      {/* 检查结果 */}
      <div
        style={{
          background: "rgba(0,0,0,0.3)",
          borderRadius: 14,
          padding: "16px 20px",
          border: "1px solid rgba(255,255,255,0.06)",
          opacity: checkSpring,
        }}
      >
        <div
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "rgba(255,255,255,0.6)",
            marginBottom: 10,
          }}
        >
          两个终端同时运行，各自版本独立：
        </div>
        <div style={{ display: "flex", gap: 24, justifyContent: "center" }}>
          <VersionBadge
            spring={result1}
            label="前端"
            version="v20.11.0"
            color="#34d399"
          />
          <VersionBadge
            spring={result2}
            label="后端"
            version="v18.20.0"
            color="#818cf8"
          />
        </div>
      </div>

      {/* 成功标记 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          opacity: successBadge,
          transform: `scale(${interpolate(successBadge, [0, 1], [0.6, 1])})`,
        }}
      >
        <div
          style={{
            fontSize: 18,
            fontWeight: 900,
            color: "#22c55e",
            padding: "10px 28px",
            borderRadius: 12,
            background: "rgba(34,197,94,0.08)",
            border: "1px solid rgba(34,197,94,0.25)",
          }}
        >
          ✓ 完美隔离，互不干扰！
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---- TerminalBlock ----
const TerminalBlock: React.FC<{
  spring: number;
  title: string;
  color: string;
  lines: { text: string; prompt?: boolean; dim?: boolean; color?: string }[];
}> = ({ spring: s, title, color, lines }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        flex: 1,
        background: "rgba(0,0,0,0.35)",
        borderRadius: 14,
        padding: "14px 18px",
        border: `1px solid ${color}33`,
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [20, 0])}px)`,
      }}
    >
      <div style={{ fontSize: 14, fontWeight: 700, color, marginBottom: 8 }}>
        {title}
      </div>
      {lines.map((line, i) => {
        const lineSpring = spring({
          frame,
          fps,
          config: { damping: 200 },
          delay: 24 + i * 8,
        });

        return (
          <div
            key={i}
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 13,
              color: line.color || (line.dim ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.85)"),
              padding: "2px 0",
              opacity: lineSpring,
            }}
          >
            {line.prompt && <span style={{ color: "#22c55e", marginRight: 6 }}>$</span>}
            {line.text}
          </div>
        );
      })}
    </div>
  );
};

// ---- VersionBadge ----
const VersionBadge: React.FC<{
  spring: number;
  label: string;
  version: string;
  color: string;
}> = ({ spring: s, label, version, color }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "8px 16px",
      borderRadius: 10,
      background: `${color}11`,
      border: `1px solid ${color}33`,
      opacity: s,
      transform: `translateY(${interpolate(s, [0, 1], [10, 0])}px)`,
    }}
  >
    <div style={{ fontSize: 14, fontWeight: 700, color }}>{label}</div>
    <div
      style={{
        fontFamily: "'Courier New', monospace",
        fontSize: 16,
        fontWeight: 900,
        color,
      }}
    >
      {version}
    </div>
  </div>
);
