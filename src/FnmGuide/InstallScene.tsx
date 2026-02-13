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

const PLATFORMS = [
  { label: "Windows", cmd: "winget install Schniz.fnm", icon: "🪟", color: "#38bdf8" },
  { label: "macOS", cmd: "brew install fnm", icon: "🍎", color: "#a78bfa" },
  { label: "Linux", cmd: "curl -fsSL https://fnm.vercel.app/install | bash", icon: "🐧", color: "#fbbf24" },
];

export const InstallScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 200 }, delay: 5 });
  const warningSpring = spring({ frame, fps, config: { damping: 200 }, delay: 75 });
  const shellLine1 = spring({ frame, fps, config: { damping: 200 }, delay: 95 });
  const shellLine2 = spring({ frame, fps, config: { damping: 200 }, delay: 110 });
  const noteSpring = spring({ frame, fps, config: { damping: 200 }, delay: 130 });

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
        安装 fnm
      </div>

      {/* 三平台安装命令 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {PLATFORMS.map((p, i) => {
          const cmdSpring = spring({
            frame,
            fps,
            config: { damping: 200 },
            delay: 18 + i * 15,
          });

          return (
            <div
              key={p.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                background: "rgba(0,0,0,0.3)",
                borderRadius: 12,
                padding: "12px 20px",
                border: `1px solid ${p.color}22`,
                opacity: cmdSpring,
                transform: `translateX(${interpolate(cmdSpring, [0, 1], [-20, 0])}px)`,
              }}
            >
              <span style={{ fontSize: 22 }}>{p.icon}</span>
              <div style={{ fontSize: 14, fontWeight: 700, color: p.color, width: 72 }}>
                {p.label}
              </div>
              <div
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: 15,
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                {p.cmd}
              </div>
            </div>
          );
        })}
      </div>

      {/* 重要提示框 */}
      <div
        style={{
          background: "rgba(251,191,36,0.06)",
          borderRadius: 14,
          padding: "18px 22px",
          border: "1px solid rgba(251,191,36,0.2)",
          opacity: warningSpring,
          transform: `translateY(${interpolate(warningSpring, [0, 1], [15, 0])}px)`,
        }}
      >
        <div
          style={{
            fontSize: 16,
            fontWeight: 900,
            color: "#fbbf24",
            marginBottom: 14,
          }}
        >
          ⚠ 配置 Shell 环境（必须！）
        </div>

        {/* PowerShell */}
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#38bdf8", marginBottom: 4 }}>
            PowerShell
          </div>
          <div
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 13,
              color: "rgba(255,255,255,0.75)",
              background: "rgba(0,0,0,0.25)",
              borderRadius: 8,
              padding: "8px 14px",
              opacity: shellLine1,
            }}
          >
            fnm env --use-on-cd --shell powershell | Out-String | Invoke-Expression
          </div>
        </div>

        {/* Bash / Zsh */}
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#a78bfa", marginBottom: 4 }}>
            Bash / Zsh
          </div>
          <div
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 13,
              color: "rgba(255,255,255,0.75)",
              background: "rgba(0,0,0,0.25)",
              borderRadius: 8,
              padding: "8px 14px",
              opacity: shellLine2,
            }}
          >
            {'eval "$(fnm env --use-on-cd)"'}
          </div>
        </div>

        {/* 补充说明 */}
        <div
          style={{
            marginTop: 10,
            fontSize: 13,
            color: "rgba(255,255,255,0.35)",
            opacity: noteSpring,
          }}
        >
          添加到 $PROFILE（PowerShell）或 .bashrc / .zshrc 中，重启终端生效
        </div>
      </div>
    </AbsoluteFill>
  );
};
