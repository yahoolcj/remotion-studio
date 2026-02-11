import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});

const COMPARISONS = [
  { left: "1.0.0", op: "<", right: "2.0.0", rule: "MAJOR 优先比较" },
  { left: "1.1.0", op: "<", right: "1.2.0", rule: "MAJOR 相同比 MINOR" },
  { left: "1.2.3", op: "<", right: "1.2.4", rule: "MINOR 相同比 PATCH" },
  { left: "1.0.0-alpha", op: "<", right: "1.0.0-beta", rule: "预发布按字母序" },
  { left: "1.0.0-alpha", op: "<", right: "1.0.0", rule: "预发布 < 正式版" },
];

export const ComparisonScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 200 }, delay: 5 });

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
        版本号比较规则
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {COMPARISONS.map((comp, i) => (
          <ComparisonRow
            key={`${comp.left}-${comp.right}`}
            {...comp}
            index={i}
          />
        ))}
      </div>

      {/* 排序示例 */}
      <SortingExample />
    </AbsoluteFill>
  );
};

const ComparisonRow: React.FC<{
  left: string;
  op: string;
  right: string;
  rule: string;
  index: number;
}> = ({ left, op, right, rule, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entryDelay = 18 + index * 12;
  const rowSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: entryDelay,
  });

  const highlightProgress = interpolate(
    frame,
    [entryDelay + 10, entryDelay + 10 + 0.3 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) },
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        opacity: rowSpring,
        transform: `translateX(${interpolate(rowSpring, [0, 1], [-30, 0])}px)`,
        padding: "12px 20px",
        borderRadius: 14,
        background: `rgba(255,255,255,${0.02 + highlightProgress * 0.02})`,
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div style={{ width: 32, textAlign: "center" }}>
        <span style={{ fontSize: 16, color: "rgba(255,255,255,0.3)", fontWeight: 700 }}>
          {index + 1}
        </span>
      </div>
      <div
        style={{
          fontFamily: "'Courier New', monospace",
          fontSize: 22,
          fontWeight: 700,
          color: "#818cf8",
          minWidth: 200,
          textAlign: "right",
        }}
      >
        {left}
      </div>
      <div
        style={{
          fontSize: 28,
          fontWeight: 900,
          color: "#f59e0b",
          width: 40,
          textAlign: "center",
        }}
      >
        {op}
      </div>
      <div
        style={{
          fontFamily: "'Courier New', monospace",
          fontSize: 22,
          fontWeight: 700,
          color: "#34d399",
          minWidth: 200,
        }}
      >
        {right}
      </div>
      <div
        style={{
          fontSize: 15,
          color: "rgba(255,255,255,0.4)",
          marginLeft: "auto",
        }}
      >
        {rule}
      </div>
    </div>
  );
};

const SortingExample: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sortSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 85,
  });

  const versions = [
    "1.0.0-alpha",
    "1.0.0-beta",
    "1.0.0",
    "1.1.0",
    "1.1.1",
    "2.0.0",
  ];

  return (
    <div
      style={{
        marginTop: 36,
        opacity: sortSpring,
        transform: `translateY(${interpolate(sortSpring, [0, 1], [20, 0])}px)`,
        background: "rgba(255,255,255,0.04)",
        borderRadius: 16,
        padding: "20px 28px",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: "rgba(255,255,255,0.3)",
          marginBottom: 14,
          letterSpacing: "2px",
        }}
      >
        排序结果（从低到高）
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {versions.map((v, i) => {
          const itemDelay = 90 + i * 6;
          const itemSpring = spring({
            frame,
            fps,
            config: { damping: 15 },
            delay: itemDelay,
          });

          return (
            <div
              key={v}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                transform: `scale(${interpolate(itemSpring, [0, 1], [0.5, 1])})`,
                opacity: itemSpring,
              }}
            >
              <div
                style={{
                  padding: "6px 14px",
                  borderRadius: 8,
                  background:
                    i === versions.length - 1
                      ? "rgba(34,211,153,0.15)"
                      : "rgba(255,255,255,0.06)",
                  border: `1px solid ${i === versions.length - 1 ? "rgba(34,211,153,0.3)" : "rgba(255,255,255,0.1)"}`,
                  fontFamily: "'Courier New', monospace",
                  fontSize: 15,
                  fontWeight: 700,
                  color:
                    i === versions.length - 1
                      ? "#34d399"
                      : "rgba(255,255,255,0.6)",
                }}
              >
                {v}
              </div>
              {i < versions.length - 1 && (
                <span
                  style={{ color: "rgba(255,255,255,0.2)", fontSize: 14 }}
                >
                  →
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
