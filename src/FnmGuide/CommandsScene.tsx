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

const COMPARISONS = [
  { nvm: "nvm install 18", fnm: "fnm install 18", desc: "安装版本" },
  { nvm: "nvm use 18", fnm: "fnm use 18", desc: "切换版本" },
  { nvm: "nvm ls", fnm: "fnm list", desc: "查看已安装" },
  { nvm: "nvm alias default 20", fnm: "fnm default 20", desc: "设默认" },
];

export const CommandsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 200 }, delay: 5 });
  const headerSpring = spring({ frame, fps, config: { damping: 200 }, delay: 14 });
  const tipSpring = spring({ frame, fps, config: { damping: 12, stiffness: 120 }, delay: 90 });

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
          fontSize: 34,
          fontWeight: 900,
          color: "white",
          opacity: titleSpring,
          transform: `translateY(${interpolate(titleSpring, [0, 1], [20, 0])}px)`,
          marginBottom: 4,
        }}
      >
        核心命令 — 从 nvm 无缝迁移
      </div>

      {/* 表头 */}
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          paddingBottom: 10,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          opacity: headerSpring,
        }}
      >
        <div style={{ width: 70, fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.3)" }}>
          功能
        </div>
        <div style={{ flex: 1, fontSize: 14, fontWeight: 900, color: "#ef4444", textAlign: "center" }}>
          nvm（之前）
        </div>
        <div
          style={{
            width: 36,
            textAlign: "center",
            fontSize: 18,
            color: "rgba(255,255,255,0.2)",
          }}
        >
          →
        </div>
        <div style={{ flex: 1, fontSize: 14, fontWeight: 900, color: "#22c55e", textAlign: "center" }}>
          fnm（现在）
        </div>
      </div>

      {/* 对比行 */}
      {COMPARISONS.map((c, i) => {
        const rowSpring = spring({
          frame,
          fps,
          config: { damping: 200 },
          delay: 22 + i * 14,
        });

        return (
          <div
            key={c.desc}
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              opacity: rowSpring,
              transform: `translateX(${interpolate(rowSpring, [0, 1], [-20, 0])}px)`,
              padding: "8px 0",
              borderBottom: "1px solid rgba(255,255,255,0.03)",
            }}
          >
            {/* 功能描述 */}
            <div style={{ width: 70, fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.45)" }}>
              {c.desc}
            </div>

            {/* nvm 命令 */}
            <div
              style={{
                flex: 1,
                fontFamily: "'Courier New', monospace",
                fontSize: 15,
                color: "rgba(255,255,255,0.4)",
                background: "rgba(239,68,68,0.06)",
                borderRadius: 8,
                padding: "8px 14px",
                border: "1px solid rgba(239,68,68,0.12)",
                textAlign: "center",
                textDecoration: "line-through",
                textDecorationColor: "rgba(239,68,68,0.3)",
              }}
            >
              {c.nvm}
            </div>

            {/* 箭头 */}
            <div
              style={{
                width: 36,
                textAlign: "center",
                fontSize: 18,
                color: "#fbbf24",
                fontWeight: 900,
              }}
            >
              →
            </div>

            {/* fnm 命令 */}
            <div
              style={{
                flex: 1,
                fontFamily: "'Courier New', monospace",
                fontSize: 15,
                color: "#86efac",
                fontWeight: 700,
                background: "rgba(34,197,94,0.08)",
                borderRadius: 8,
                padding: "8px 14px",
                border: "1px solid rgba(34,197,94,0.15)",
                textAlign: "center",
              }}
            >
              {c.fnm}
            </div>
          </div>
        );
      })}

      {/* 高亮提示框 */}
      <div
        style={{
          marginTop: 8,
          padding: "14px 24px",
          borderRadius: 14,
          background: "rgba(251,191,36,0.06)",
          border: "1px solid rgba(251,191,36,0.2)",
          textAlign: "center",
          opacity: tipSpring,
          transform: `scale(${interpolate(tipSpring, [0, 1], [0.85, 1])})`,
        }}
      >
        <span style={{ fontSize: 18, fontWeight: 900, color: "#fbbf24" }}>
          迁移成本为零
        </span>
        <span style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", marginLeft: 12 }}>
          命令几乎完全一致，把 nvm 改成 fnm 就行
        </span>
      </div>
    </AbsoluteFill>
  );
};
