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

export const MinorScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 200 }, delay: 5 });
  const badgeSpring = spring({ frame, fps, config: { damping: 12 }, delay: 15 });
  const contentSpring = spring({ frame, fps, config: { damping: 200 }, delay: 25 });
  const exampleSpring = spring({ frame, fps, config: { damping: 200 }, delay: 45 });

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
      <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 40 }}>
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            background: "linear-gradient(135deg, #a855f7, #9333ea)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 40,
            fontWeight: 900,
            color: "white",
            boxShadow: "0 12px 40px rgba(168,85,247,0.4)",
            transform: `scale(${interpolate(badgeSpring, [0, 1], [0.3, 1])})`,
          }}
        >
          Y
        </div>
        <div>
          <div
            style={{
              fontSize: 48,
              fontWeight: 900,
              color: "#c084fc",
              opacity: titleSpring,
              transform: `translateX(${interpolate(titleSpring, [0, 1], [30, 0])}px)`,
            }}
          >
            MINOR 次版本号
          </div>
          <div
            style={{
              fontSize: 20,
              color: "rgba(255,255,255,0.5)",
              opacity: titleSpring,
              marginTop: 4,
            }}
          >
            x.Y.z — 第二位数字
          </div>
        </div>
      </div>

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
        <ContentItem icon="✨" text="新增功能" subtext="向后兼容的新特性" />
        <ContentItem icon="✅" text="向后兼容" subtext="旧代码不受影响，无需修改" />
        <ContentItem
          icon="🔄"
          text="重置 PATCH 为 0"
          subtext="例：1.3.7 → 1.4.0"
        />
        <ContentItem
          icon="📋"
          text="可包含废弃提示"
          subtext="标记即将在下个 MAJOR 移除的功能"
        />
      </div>

      {/* 示例时间线 */}
      <div
        style={{
          opacity: exampleSpring,
          transform: `translateY(${interpolate(exampleSpring, [0, 1], [20, 0])}px)`,
          background: "rgba(255,255,255,0.04)",
          borderRadius: 20,
          padding: "28px 32px",
          border: "1px solid rgba(168,85,247,0.2)",
        }}
      >
        <div
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "rgba(255,255,255,0.4)",
            marginBottom: 16,
            letterSpacing: "2px",
          }}
        >
          版本演进示例
        </div>
        <VersionTimeline />
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

const VersionTimeline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const versions = [
    { version: "1.0.0", feature: "初始发布" },
    { version: "1.1.0", feature: "+ 搜索功能" },
    { version: "1.2.0", feature: "+ 导出功能" },
    { version: "1.3.0", feature: "+ 暗色主题" },
  ];

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
      {versions.map((v, i) => {
        const entryDelay = 50 + i * 12;
        const itemSpring = spring({
          frame,
          fps,
          config: { damping: 200 },
          delay: entryDelay,
        });

        return (
          <div
            key={v.version}
            style={{
              display: "flex",
              alignItems: "center",
              opacity: itemSpring,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  padding: "8px 16px",
                  borderRadius: 10,
                  background: i === 0 ? "rgba(168,85,247,0.15)" : "rgba(168,85,247,0.25)",
                  border: `1px solid ${i === versions.length - 1 ? "#a855f7" : "rgba(168,85,247,0.3)"}`,
                  color: i === versions.length - 1 ? "#c084fc" : "rgba(255,255,255,0.8)",
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                {v.version}
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>{v.feature}</div>
            </div>
            {i < versions.length - 1 && (
              <div
                style={{
                  width: 40,
                  height: 2,
                  background: "rgba(168,85,247,0.3)",
                  margin: "0 8px",
                  marginBottom: 24,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
