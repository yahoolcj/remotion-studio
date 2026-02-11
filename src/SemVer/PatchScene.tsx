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

export const PatchScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 200 }, delay: 5 });
  const badgeSpring = spring({ frame, fps, config: { damping: 12 }, delay: 15 });
  const contentSpring = spring({ frame, fps, config: { damping: 200 }, delay: 25 });
  const codeSpring = spring({ frame, fps, config: { damping: 200 }, delay: 50 });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        fontFamily,
        padding: "40px 60px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* 标题行 */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            background: "linear-gradient(135deg, #ec4899, #db2777)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 28,
            fontWeight: 900,
            color: "white",
            boxShadow: "0 8px 28px rgba(236,72,153,0.4)",
            transform: `scale(${interpolate(badgeSpring, [0, 1], [0.3, 1])})`,
            flexShrink: 0,
          }}
        >
          Z
        </div>
        <div>
          <div
            style={{
              fontSize: 38,
              fontWeight: 900,
              color: "#f472b6",
              opacity: titleSpring,
              transform: `translateX(${interpolate(titleSpring, [0, 1], [30, 0])}px)`,
              lineHeight: 1.1,
            }}
          >
            PATCH 修订号
          </div>
          <div
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.5)",
              opacity: titleSpring,
              marginTop: 2,
            }}
          >
            x.y.Z — 第三位数字
          </div>
        </div>
      </div>

      {/* 要点列表 */}
      <div
        style={{
          opacity: contentSpring,
          transform: `translateY(${interpolate(contentSpring, [0, 1], [20, 0])}px)`,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          marginBottom: 24,
        }}
      >
        <ContentItem icon="🐛" text="Bug 修复" subtext="修正错误行为使其符合预期" />
        <ContentItem icon="🔒" text="安全补丁" subtext="修复安全漏洞" />
        <ContentItem icon="✅" text="完全向后兼容" subtext="可安全升级，无需任何代码更改" />
        <ContentItem icon="📝" text="不引入新功能" subtext="仅修正已有行为的缺陷" />
      </div>

      {/* 代码修复示例 — 左右并排 */}
      <div
        style={{
          opacity: codeSpring,
          transform: `translateY(${interpolate(codeSpring, [0, 1], [20, 0])}px)`,
          background: "rgba(0,0,0,0.3)",
          borderRadius: 14,
          padding: "16px 22px",
          border: "1px solid rgba(236,72,153,0.2)",
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "rgba(255,255,255,0.3)",
            marginBottom: 12,
            letterSpacing: "2px",
          }}
        >
          修复示例  ·  1.4.2 → 1.4.3
        </div>

        <div style={{ display: "flex", gap: 20 }}>
          {/* 修复前 */}
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#ef4444",
                }}
              />
              <span style={{ color: "#fca5a5", fontSize: 13, fontWeight: 700 }}>修复前</span>
            </div>
            <CodeLine text="function divide(a, b) {" color="rgba(255,255,255,0.6)" />
            <CodeLine
              text="  return a / b; // b=0 崩溃💥"
              color="#fca5a5"
              highlight
            />
            <CodeLine text="}" color="rgba(255,255,255,0.6)" />
          </div>

          {/* 修复后 */}
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#22c55e",
                }}
              />
              <span style={{ color: "#86efac", fontSize: 13, fontWeight: 700 }}>修复后</span>
            </div>
            <CodeLine text="function divide(a, b) {" color="rgba(255,255,255,0.6)" />
            <CodeLine
              text='  if (b === 0) throw Error("…");'
              color="#86efac"
              highlight
            />
            <CodeLine text="  return a / b;" color="rgba(255,255,255,0.6)" />
            <CodeLine text="}" color="rgba(255,255,255,0.6)" />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const ContentItem: React.FC<{ icon: string; text: string; subtext: string }> = ({
  icon,
  text,
  subtext,
}) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
    <span style={{ fontSize: 22 }}>{icon}</span>
    <div>
      <div style={{ fontSize: 19, fontWeight: 700, color: "white", lineHeight: 1.2 }}>{text}</div>
      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.2 }}>{subtext}</div>
    </div>
  </div>
);

const CodeLine: React.FC<{
  text: string;
  color: string;
  highlight?: boolean;
}> = ({ text, color, highlight }) => (
  <div
    style={{
      fontFamily: "'Courier New', monospace",
      fontSize: 14,
      color,
      padding: "1px 10px",
      background: highlight ? "rgba(255,255,255,0.03)" : "transparent",
      borderLeft: highlight ? "2px solid" : "2px solid transparent",
      borderColor: highlight ? color : "transparent",
      lineHeight: 1.5,
    }}
  >
    {text}
  </div>
);
