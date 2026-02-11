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

export const PreReleaseScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 200 }, delay: 5 });
  const preReleaseSpring = spring({ frame, fps, config: { damping: 200 }, delay: 20 });
  const buildSpring = spring({ frame, fps, config: { damping: 200 }, delay: 55 });
  const formulaSpring = spring({ frame, fps, config: { damping: 200 }, delay: 80 });

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
      {/* 标题 */}
      <div
        style={{
          fontSize: 44,
          fontWeight: 900,
          color: "white",
          marginBottom: 48,
          opacity: titleSpring,
          transform: `translateY(${interpolate(titleSpring, [0, 1], [20, 0])}px)`,
        }}
      >
        扩展标识符
      </div>

      {/* 预发布版本区块 */}
      <div
        style={{
          opacity: preReleaseSpring,
          transform: `translateY(${interpolate(preReleaseSpring, [0, 1], [20, 0])}px)`,
          marginBottom: 36,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 20,
            }}
          >
            🏷️
          </div>
          <span style={{ fontSize: 28, fontWeight: 700, color: "#fbbf24" }}>
            预发布版本 (Pre-release)
          </span>
        </div>
        <div
          style={{
            fontSize: 17,
            color: "rgba(255,255,255,0.55)",
            marginBottom: 20,
            lineHeight: 1.6,
            paddingLeft: 48,
          }}
        >
          通过 <span style={{ color: "#fbbf24", fontWeight: 700 }}>连字符 -</span>{" "}
          附加在版本号之后，表示该版本不稳定
        </div>

        <div style={{ display: "flex", gap: 16, paddingLeft: 48 }}>
          <PreReleaseTag version="1.0.0-alpha" desc="内部测试" color="#f59e0b" />
          <PreReleaseTag version="1.0.0-beta.1" desc="公测版本 1" color="#f59e0b" />
          <PreReleaseTag version="1.0.0-rc.2" desc="候选发布 2" color="#f59e0b" />
        </div>

        {/* 优先级说明 */}
        <div
          style={{
            marginTop: 16,
            paddingLeft: 48,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 14 }}>优先级:</span>
          <PriorityChain
            items={["alpha", "beta", "rc", "正式版"]}
            color="#f59e0b"
          />
        </div>
      </div>

      {/* 构建元数据区块 */}
      <div
        style={{
          opacity: buildSpring,
          transform: `translateY(${interpolate(buildSpring, [0, 1], [20, 0])}px)`,
          marginBottom: 36,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "linear-gradient(135deg, #06b6d4, #0891b2)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 20,
            }}
          >
            🔧
          </div>
          <span style={{ fontSize: 28, fontWeight: 700, color: "#22d3ee" }}>
            构建元数据 (Build Metadata)
          </span>
        </div>
        <div
          style={{
            fontSize: 17,
            color: "rgba(255,255,255,0.55)",
            marginBottom: 20,
            lineHeight: 1.6,
            paddingLeft: 48,
          }}
        >
          通过 <span style={{ color: "#22d3ee", fontWeight: 700 }}>加号 +</span>{" "}
          附加，<span style={{ color: "#fca5a5" }}>不影响版本优先级</span>
        </div>

        <div style={{ display: "flex", gap: 16, paddingLeft: 48 }}>
          <PreReleaseTag version="1.0.0+20240101" desc="构建日期" color="#06b6d4" />
          <PreReleaseTag version="1.0.0+sha.a1b2c3" desc="Git 提交" color="#06b6d4" />
        </div>
      </div>

      {/* 完整格式 */}
      <div
        style={{
          opacity: formulaSpring,
          transform: `translateY(${interpolate(formulaSpring, [0, 1], [20, 0])}px)`,
          background: "rgba(255,255,255,0.04)",
          borderRadius: 16,
          padding: "20px 28px",
          border: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
        }}
      >
        <FormulaSegment text="MAJOR" color="#6366f1" />
        <Separator text="." />
        <FormulaSegment text="MINOR" color="#a855f7" />
        <Separator text="." />
        <FormulaSegment text="PATCH" color="#ec4899" />
        <Separator text="-" />
        <FormulaSegment text="pre-release" color="#f59e0b" />
        <Separator text="+" />
        <FormulaSegment text="build" color="#06b6d4" />
      </div>
    </AbsoluteFill>
  );
};

const PreReleaseTag: React.FC<{
  version: string;
  desc: string;
  color: string;
}> = ({ version, desc, color }) => (
  <div
    style={{
      background: `${color}12`,
      border: `1px solid ${color}33`,
      borderRadius: 12,
      padding: "12px 18px",
      display: "flex",
      flexDirection: "column",
      gap: 4,
    }}
  >
    <div
      style={{
        fontFamily: "'Courier New', monospace",
        fontSize: 17,
        fontWeight: 700,
        color,
      }}
    >
      {version}
    </div>
    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>{desc}</div>
  </div>
);

const PriorityChain: React.FC<{ items: string[]; color: string }> = ({
  items,
  color,
}) => (
  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
    {items.map((item, i) => (
      <div key={item} style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <span
          style={{
            fontSize: 14,
            color: i === items.length - 1 ? "#22c55e" : `${color}cc`,
            fontWeight: i === items.length - 1 ? 700 : 400,
          }}
        >
          {item}
        </span>
        {i < items.length - 1 && (
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 12 }}>→</span>
        )}
      </div>
    ))}
  </div>
);

const FormulaSegment: React.FC<{ text: string; color: string }> = ({ text, color }) => (
  <div
    style={{
      padding: "6px 14px",
      borderRadius: 8,
      background: `${color}18`,
      border: `1px solid ${color}33`,
      color,
      fontSize: 16,
      fontWeight: 700,
    }}
  >
    {text}
  </div>
);

const Separator: React.FC<{ text: string }> = ({ text }) => (
  <span
    style={{
      color: "rgba(255,255,255,0.3)",
      fontSize: 24,
      fontWeight: 900,
      margin: "0 2px",
    }}
  >
    {text}
  </span>
);
