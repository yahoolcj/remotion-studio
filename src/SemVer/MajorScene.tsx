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

export const MajorScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 200 }, delay: 5 });
  const badgeSpring = spring({ frame, fps, config: { damping: 12 }, delay: 15 });
  const contentSpring = spring({ frame, fps, config: { damping: 200 }, delay: 25 });
  const exampleSpring = spring({ frame, fps, config: { damping: 200 }, delay: 45 });
  const warningSpring = spring({ frame, fps, config: { damping: 200 }, delay: 65 });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        fontFamily,
        padding: 80,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* 顶部标签 */}
      <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 40 }}>
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            background: "linear-gradient(135deg, #6366f1, #4f46e5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 40,
            fontWeight: 900,
            color: "white",
            boxShadow: "0 12px 40px rgba(99,102,241,0.4)",
            transform: `scale(${interpolate(badgeSpring, [0, 1], [0.3, 1])})`,
          }}
        >
          X
        </div>
        <div>
          <div
            style={{
              fontSize: 48,
              fontWeight: 900,
              color: "#818cf8",
              opacity: titleSpring,
              transform: `translateX(${interpolate(titleSpring, [0, 1], [30, 0])}px)`,
            }}
          >
            MAJOR 主版本号
          </div>
          <div
            style={{
              fontSize: 20,
              color: "rgba(255,255,255,0.5)",
              opacity: titleSpring,
              marginTop: 4,
            }}
          >
            X.y.z — 第一位数字
          </div>
        </div>
      </div>

      {/* 内容说明 */}
      <div
        style={{
          opacity: contentSpring,
          transform: `translateY(${interpolate(contentSpring, [0, 1], [20, 0])}px)`,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          marginBottom: 40,
        }}
      >
        <ContentItem
          icon="💥"
          text="不兼容的 API 变更"
          subtext="Breaking Changes"
        />
        <ContentItem
          icon="⚠️"
          text="升级后旧代码可能无法正常工作"
          subtext="消费者需要修改代码才能适配"
        />
        <ContentItem
          icon="🔄"
          text="重置 MINOR 和 PATCH 为 0"
          subtext="例：1.9.3 → 2.0.0"
        />
      </div>

      {/* 实际示例 */}
      <div
        style={{
          opacity: exampleSpring,
          transform: `translateY(${interpolate(exampleSpring, [0, 1], [20, 0])}px)`,
          background: "rgba(255,255,255,0.04)",
          borderRadius: 20,
          padding: "24px 32px",
          border: "1px solid rgba(99,102,241,0.2)",
        }}
      >
        <div
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "rgba(255,255,255,0.4)",
            marginBottom: 12,
            letterSpacing: "2px",
          }}
        >
          实际案例
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          <ExampleCard name="React" from="17.x" to="18.0.0" desc="并发渲染" />
          <ExampleCard name="Vue" from="2.x" to="3.0.0" desc="Composition API" />
          <ExampleCard name="Angular" from="15.x" to="16.0.0" desc="Signals" />
        </div>
      </div>

      {/* 警告提示 */}
      <div
        style={{
          marginTop: 24,
          opacity: warningSpring,
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "12px 20px",
          background: "rgba(239,68,68,0.08)",
          borderRadius: 12,
          border: "1px solid rgba(239,68,68,0.2)",
        }}
      >
        <span style={{ fontSize: 20 }}>⚡</span>
        <span style={{ color: "#fca5a5", fontSize: 16 }}>
          MAJOR 为 0 时表示初始开发阶段，API 随时可能变更
        </span>
      </div>
    </AbsoluteFill>
  );
};

const ContentItem: React.FC<{ icon: string; text: string; subtext: string }> = ({
  icon,
  text,
  subtext,
}) => (
  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
    <span style={{ fontSize: 28 }}>{icon}</span>
    <div>
      <div style={{ fontSize: 22, fontWeight: 700, color: "white" }}>{text}</div>
      <div style={{ fontSize: 15, color: "rgba(255,255,255,0.4)" }}>{subtext}</div>
    </div>
  </div>
);

const ExampleCard: React.FC<{
  name: string;
  from: string;
  to: string;
  desc: string;
}> = ({ name, from, to, desc }) => (
  <div
    style={{
      flex: 1,
      background: "rgba(99,102,241,0.08)",
      borderRadius: 12,
      padding: "16px 20px",
      border: "1px solid rgba(99,102,241,0.15)",
    }}
  >
    <div style={{ fontSize: 18, fontWeight: 700, color: "#818cf8", marginBottom: 6 }}>
      {name}
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 16 }}>{from}</span>
      <span style={{ color: "#6366f1", fontSize: 14 }}>→</span>
      <span style={{ color: "white", fontSize: 16, fontWeight: 700 }}>{to}</span>
    </div>
    <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, marginTop: 4 }}>{desc}</div>
  </div>
);
