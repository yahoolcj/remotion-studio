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

const ROWS: { nvm: string; fnm: string; desc: string }[] = [
  { nvm: "nvm install 18", fnm: "fnm install 18", desc: "安装版本" },
  { nvm: "nvm use 18", fnm: "fnm use 18", desc: "切换版本" },
  { nvm: "nvm alias default 18", fnm: "fnm default 18", desc: "设默认" },
  { nvm: "nvm ls", fnm: "fnm list", desc: "已装列表" },
  { nvm: "nvm current", fnm: "fnm current", desc: "当前版本" },
  { nvm: ".nvmrc", fnm: ".nvmrc / .node-version", desc: "版本文件" },
  { nvm: "无", fnm: "--use-on-cd（自动）", desc: "自动切换" },
];

export const CheatSheetScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 200 }, delay: 5 });
  const footerSpring = spring({ frame, fps, config: { damping: 200 }, delay: 110 });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        fontFamily,
        padding: "36px 56px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 14,
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
        nvm → fnm 速查对照表
      </div>

      {/* 表头 */}
      <div
        style={{
          display: "flex",
          gap: 8,
          paddingBottom: 8,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          opacity: spring({ frame, fps, config: { damping: 200 }, delay: 12 }),
        }}
      >
        <HeaderCell text="说明" width={80} />
        <HeaderCell text="nvm" width={200} color="#ef4444" />
        <HeaderCell text="fnm" width={260} color="#22c55e" />
      </div>

      {/* 行列表 */}
      {ROWS.map((row, i) => {
        const rowSpring = spring({
          frame,
          fps,
          config: { damping: 200 },
          delay: 18 + i * 12,
        });

        return (
          <div
            key={row.desc}
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              opacity: rowSpring,
              transform: `translateX(${interpolate(rowSpring, [0, 1], [-16, 0])}px)`,
              padding: "6px 0",
              borderBottom: "1px solid rgba(255,255,255,0.03)",
            }}
          >
            <div style={{ width: 80, fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.5)" }}>
              {row.desc}
            </div>
            <div
              style={{
                width: 200,
                fontFamily: "'Courier New', monospace",
                fontSize: 13,
                color: row.nvm === "无" ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.55)",
                fontStyle: row.nvm === "无" ? "italic" : "normal",
              }}
            >
              {row.nvm}
            </div>
            <div
              style={{
                width: 260,
                fontFamily: "'Courier New', monospace",
                fontSize: 13,
                color: "#86efac",
                fontWeight: 700,
              }}
            >
              {row.fnm}
            </div>
          </div>
        );
      })}

      {/* 底部提示 */}
      <div
        style={{
          fontSize: 15,
          fontWeight: 700,
          color: "#fbbf24",
          textAlign: "center",
          marginTop: 12,
          opacity: footerSpring,
          transform: `translateY(${interpolate(footerSpring, [0, 1], [10, 0])}px)`,
        }}
      >
        命令几乎一致，直接替换 nvm → fnm 即可完成迁移
      </div>
    </AbsoluteFill>
  );
};

const HeaderCell: React.FC<{ text: string; width: number; color?: string }> = ({
  text,
  width,
  color,
}) => (
  <div
    style={{
      width,
      fontSize: 13,
      fontWeight: 900,
      color: color || "rgba(255,255,255,0.35)",
      letterSpacing: "1px",
      textTransform: "uppercase",
    }}
  >
    {text}
  </div>
);
