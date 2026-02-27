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

type NodeDef = {
  id: string;
  label: string;
  type: "start" | "decision" | "result";
  color: string;
  x: number;
  y: number;
  delay: number;
};

type EdgeDef = {
  from: string;
  to: string;
  label?: string;
  delay: number;
};

const NODES: NodeDef[] = [
  { id: "start", label: "浏览器发起请求", type: "start", color: "#818cf8", x: 540, y: 20, delay: 10 },
  { id: "hasCache", label: "有本地缓存？", type: "decision", color: "#6366f1", x: 540, y: 100, delay: 30 },
  { id: "expired", label: "缓存过期？", type: "decision", color: "#a855f7", x: 540, y: 190, delay: 60 },
  { id: "useCache", label: "直接使用缓存", type: "result", color: "#22c55e", x: 820, y: 190, delay: 75 },
  { id: "hasEtag", label: "有 ETag？", type: "decision", color: "#06b6d4", x: 540, y: 280, delay: 90 },
  { id: "fetchNew", label: "请求服务器\n获取新资源", type: "result", color: "#ef4444", x: 180, y: 100, delay: 50 },
  { id: "validate", label: "发送验证请求", type: "decision", color: "#f59e0b", x: 540, y: 370, delay: 110 },
  { id: "use304", label: "304\n使用本地缓存", type: "result", color: "#22c55e", x: 820, y: 370, delay: 140 },
  { id: "fetch200", label: "200\n返回新资源", type: "result", color: "#fbbf24", x: 280, y: 370, delay: 150 },
];

const EDGES: EdgeDef[] = [
  { from: "start", to: "hasCache", delay: 20 },
  { from: "hasCache", to: "expired", label: "是", delay: 45 },
  { from: "hasCache", to: "fetchNew", label: "否", delay: 45 },
  { from: "expired", to: "useCache", label: "否", delay: 70 },
  { from: "expired", to: "hasEtag", label: "是", delay: 80 },
  { from: "hasEtag", to: "validate", label: "是/否", delay: 105 },
  { from: "validate", to: "use304", label: "未修改", delay: 130 },
  { from: "validate", to: "fetch200", label: "已修改", delay: 140 },
];

export const DecisionTreeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 200 }, delay: 5 });

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        fontFamily,
        padding: "36px 56px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 12,
      }}
    >
      {/* 标题 */}
      <div
        style={{
          fontSize: 36,
          fontWeight: 900,
          color: "white",
          opacity: titleSpring,
          transform: `translateY(${interpolate(titleSpring, [0, 1], [20, 0])}px)`,
        }}
      >
        缓存决策流程
      </div>

      {/* 流程图容器 */}
      <div style={{ position: "relative", width: "100%", height: 440 }}>
        {/* 连线 */}
        {EDGES.map((edge) => {
          const fromNode = NODES.find((n) => n.id === edge.from)!;
          const toNode = NODES.find((n) => n.id === edge.to)!;

          const edgeProgress = interpolate(
            frame,
            [edge.delay, edge.delay + 15],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );

          const startX = fromNode.x;
          const startY = fromNode.y + 32;
          const endX = toNode.x;
          const endY = toNode.y;

          const midX = (startX + endX) / 2;
          const midY = (startY + endY) / 2;

          return (
            <div key={`${edge.from}-${edge.to}`}>
              <svg
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  pointerEvents: "none",
                  opacity: edgeProgress,
                }}
              >
                <line
                  x1={startX}
                  y1={startY}
                  x2={endX}
                  y2={endY}
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth={2}
                  strokeDasharray={`${edgeProgress * 500}`}
                />
              </svg>
              {edge.label && (
                <div
                  style={{
                    position: "absolute",
                    top: midY - 8,
                    left: midX - 20,
                    fontSize: 11,
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.35)",
                    opacity: edgeProgress,
                    background: "rgba(15,12,41,0.9)",
                    padding: "1px 6px",
                    borderRadius: 4,
                  }}
                >
                  {edge.label}
                </div>
              )}
            </div>
          );
        })}

        {/* 节点 */}
        {NODES.map((node) => {
          const nodeSpring = spring({
            frame,
            fps,
            config: { damping: 200 },
            delay: node.delay,
          });

          const isDecision = node.type === "decision";
          const isResult = node.type === "result";

          return (
            <div
              key={node.id}
              style={{
                position: "absolute",
                top: node.y,
                left: node.x - 70,
                width: 140,
                padding: "8px 10px",
                borderRadius: isDecision ? 10 : 12,
                background: isResult
                  ? `${node.color}15`
                  : `${node.color}10`,
                border: `2px solid ${node.color}${isResult ? "40" : "30"}`,
                textAlign: "center",
                opacity: nodeSpring,
                transform: `scale(${interpolate(nodeSpring, [0, 1], [0.6, 1])})`,
              }}
            >
              <div
                style={{
                  fontSize: isResult ? 13 : 14,
                  fontWeight: 700,
                  color: node.color,
                  whiteSpace: "pre-line",
                  lineHeight: 1.3,
                }}
              >
                {node.label}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
