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

export const AutoSwitchScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 200 }, delay: 5 });

  // 步骤
  const step1 = spring({ frame, fps, config: { damping: 200 }, delay: 18 });
  const step2 = spring({ frame, fps, config: { damping: 200 }, delay: 55 });
  const step3 = spring({ frame, fps, config: { damping: 200 }, delay: 90 });
  const result = spring({ frame, fps, config: { damping: 12, stiffness: 120 }, delay: 120 });

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
        自动版本切换
      </div>

      {/* 步骤1：创建 .nvmrc */}
      <StepCard
        num={1}
        title="在项目根目录创建 .nvmrc"
        springVal={step1}
        color="#38bdf8"
      >
        <CodeBlock spring={step1} lines={['echo "18" > .nvmrc']} />
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginTop: 6 }}>
          也支持 .node-version 文件
        </div>
      </StepCard>

      {/* 步骤2：安装对应版本 */}
      <StepCard
        num={2}
        title="确保版本已安装"
        springVal={step2}
        color="#a78bfa"
      >
        <CodeBlock spring={step2} lines={["fnm install    # 自动读取 .nvmrc"]} />
      </StepCard>

      {/* 步骤3：cd 自动切换演示 */}
      <StepCard
        num={3}
        title="cd 进入项目 → 自动切换"
        springVal={step3}
        color="#34d399"
      >
        <CodeBlock
          spring={step3}
          lines={[
            "$ cd ~/my-project",
            'Using Node v18.20.0 from .nvmrc   ← fnm 自动切换！',
            "$ node -v",
            "v18.20.0",
          ]}
        />
      </StepCard>

      {/* 结果标记 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          opacity: result,
          transform: `scale(${interpolate(result, [0, 1], [0.6, 1])})`,
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
          ✓ 进入目录即切换，无需手动操作
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---- StepCard ----
const StepCard: React.FC<{
  num: number;
  title: string;
  springVal: number;
  color: string;
  children: React.ReactNode;
}> = ({ num, title, springVal, color, children }) => (
  <div
    style={{
      background: "rgba(0,0,0,0.3)",
      borderRadius: 14,
      padding: "14px 20px",
      border: `1px solid ${color}22`,
      opacity: springVal,
      transform: `translateX(${interpolate(springVal, [0, 1], [-20, 0])}px)`,
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: `${color}22`,
          border: `2px solid ${color}55`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 14,
          fontWeight: 700,
          color,
          flexShrink: 0,
        }}
      >
        {num}
      </div>
      <div style={{ fontSize: 17, fontWeight: 700, color }}>{title}</div>
    </div>
    {children}
  </div>
);

// ---- CodeBlock ----
const CodeBlock: React.FC<{ spring: number; lines: string[] }> = ({ spring: s, lines }) => (
  <div
    style={{
      fontFamily: "'Courier New', monospace",
      fontSize: 14,
      background: "rgba(0,0,0,0.25)",
      borderRadius: 8,
      padding: "8px 14px",
    }}
  >
    {lines.map((line, i) => (
      <div
        key={i}
        style={{
          color: line.startsWith("$") ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.45)",
          padding: "1px 0",
          opacity: s,
        }}
      >
        {line}
      </div>
    ))}
  </div>
);
