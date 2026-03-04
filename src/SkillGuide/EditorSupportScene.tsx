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

const EDITORS = [
  { name: "Cursor", icon: "⚡", color: "#6366f1", note: "" },
  { name: "Trae", icon: "🔷", color: "#3b82f6", note: "" },
  { name: "Claude Code", icon: "🤖", color: "#a855f7", note: "" },
  { name: "Windsurf", icon: "🌊", color: "#06b6d4", note: "" },
  {
    name: "VS Code",
    icon: "💎",
    color: "#22d3ee",
    note: "需搭配 Copilot / Cline",
  },
];

export const EditorSupportScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 200 }, delay: 5 });

  const subtitleSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
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
        alignItems: "center",
        gap: 28,
      }}
    >
      {/* 标题 */}
      <div
        style={{
          fontSize: 38,
          fontWeight: 900,
          color: "white",
          opacity: titleSpring,
          transform: `translateY(${interpolate(titleSpring, [0, 1], [25, 0])}px)`,
        }}
      >
        支持的编辑器
      </div>

      <div
        style={{
          fontSize: 16,
          color: "rgba(255,255,255,0.45)",
          opacity: subtitleSpring,
        }}
      >
        遵循 Anthropic Skill 标准，兼容所有支持 Skill 的编辑器
      </div>

      {/* 编辑器列表 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        {EDITORS.map((editor, i) => {
          const cardSpring = spring({
            frame,
            fps,
            config: { damping: 12, stiffness: 90 },
            delay: 30 + i * 18,
          });

          return (
            <div
              key={editor.name}
              style={{
                width: 180,
                padding: "28px 16px 20px",
                borderRadius: 18,
                background: "rgba(255,255,255,0.04)",
                border: `1.5px solid ${editor.color}40`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                opacity: cardSpring,
                transform: `translateY(${interpolate(cardSpring, [0, 1], [40, 0])}px) scale(${interpolate(cardSpring, [0, 1], [0.85, 1])})`,
              }}
            >
              <div style={{ fontSize: 40 }}>{editor.icon}</div>
              <div
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: editor.color,
                }}
              >
                {editor.name}
              </div>
              {editor.note && (
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.4)",
                    textAlign: "center",
                    padding: "3px 8px",
                    borderRadius: 6,
                    background: "rgba(255,255,255,0.05)",
                  }}
                >
                  {editor.note}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
