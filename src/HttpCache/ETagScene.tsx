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

export const ETagScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 200 }, delay: 5 });

  // 第一轮：初次请求
  const req1Arrow = interpolate(frame, [25, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const res1Arrow = interpolate(frame, [50, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const res1Detail = spring({ frame, fps, config: { damping: 200 }, delay: 65 });

  // 第二轮：带 ETag 请求
  const req2Arrow = interpolate(frame, [110, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const res2Arrow = interpolate(frame, [140, 160], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const badge304 = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 120 },
    delay: 155,
  });

  const savingSpring = spring({ frame, fps, config: { damping: 200 }, delay: 185 });

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
        gap: 16,
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
        协商缓存：ETag
      </div>

      {/* 时序图 */}
      <div
        style={{
          display: "flex",
          gap: 0,
          position: "relative",
        }}
      >
        {/* Browser 列 */}
        <div style={{ width: 120, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              fontSize: 14,
              fontWeight: 900,
              color: "#818cf8",
              marginBottom: 12,
              padding: "6px 16px",
              borderRadius: 8,
              background: "rgba(99,102,241,0.12)",
              border: "1px solid rgba(99,102,241,0.25)",
            }}
          >
            Browser
          </div>
          <div
            style={{
              width: 2,
              height: 340,
              background: "rgba(99,102,241,0.15)",
            }}
          />
        </div>

        {/* 中间消息区 */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            paddingTop: 40,
            gap: 8,
          }}
        >
          {/* 第一轮标签 */}
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "rgba(255,255,255,0.25)",
              textAlign: "center",
              letterSpacing: "2px",
              marginBottom: 4,
              opacity: req1Arrow,
            }}
          >
            第一次请求
          </div>

          {/* GET 请求 → */}
          <SequenceArrow
            direction="right"
            progress={req1Arrow}
            label="GET /style.css"
            color="#818cf8"
          />

          {/* ← 200 + ETag */}
          <SequenceArrow
            direction="left"
            progress={res1Arrow}
            label="200 OK"
            sublabel='ETag: "a1b2c3"'
            color="#22c55e"
          />

          {/* 响应体 */}
          <div
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "rgba(255,255,255,0.3)",
              opacity: res1Detail,
              marginBottom: 8,
            }}
          >
            完整响应体 (450 KB)
          </div>

          {/* 分隔线 */}
          <div
            style={{
              width: "100%",
              height: 1,
              background: "rgba(255,255,255,0.06)",
              marginBottom: 8,
            }}
          />

          {/* 第二轮标签 */}
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "rgba(255,255,255,0.25)",
              textAlign: "center",
              letterSpacing: "2px",
              marginBottom: 4,
              opacity: req2Arrow,
            }}
          >
            第二次请求（缓存过期后）
          </div>

          {/* GET + If-None-Match → */}
          <SequenceArrow
            direction="right"
            progress={req2Arrow}
            label="GET /style.css"
            sublabel='If-None-Match: "a1b2c3"'
            color="#818cf8"
          />

          {/* ← 304 */}
          <SequenceArrow
            direction="left"
            progress={res2Arrow}
            label="304 Not Modified"
            color="#fbbf24"
          />

          {/* 304 高亮 */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              opacity: badge304,
              transform: `scale(${interpolate(badge304, [0, 1], [0.5, 1])})`,
            }}
          >
            <div
              style={{
                fontSize: 15,
                fontWeight: 900,
                color: "#fbbf24",
                padding: "6px 20px",
                borderRadius: 10,
                background: "rgba(251,191,36,0.08)",
                border: "1px solid rgba(251,191,36,0.2)",
              }}
            >
              无响应体 — 节省 450 KB！
            </div>
          </div>
        </div>

        {/* Server 列 */}
        <div style={{ width: 120, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              fontSize: 14,
              fontWeight: 900,
              color: "#a855f7",
              marginBottom: 12,
              padding: "6px 16px",
              borderRadius: 8,
              background: "rgba(168,85,247,0.12)",
              border: "1px solid rgba(168,85,247,0.25)",
            }}
          >
            Server
          </div>
          <div
            style={{
              width: 2,
              height: 340,
              background: "rgba(168,85,247,0.15)",
            }}
          />
        </div>
      </div>

      {/* 底部说明 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          opacity: savingSpring,
        }}
      >
        <div
          style={{
            fontSize: 14,
            color: "rgba(255,255,255,0.4)",
            textAlign: "center",
          }}
        >
          ETag 像资源的"指纹" — 内容不变则指纹不变
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SequenceArrow: React.FC<{
  direction: "left" | "right";
  progress: number;
  label: string;
  sublabel?: string;
  color: string;
}> = ({ direction, progress, label, sublabel, color }) => {
  const isRight = direction === "right";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: isRight ? "flex-start" : "flex-end",
        opacity: progress,
        padding: "4px 0",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          flexDirection: isRight ? "row" : "row-reverse",
          gap: 8,
        }}
      >
        <div
          style={{
            flex: 1,
            height: 2,
            background: `${color}88`,
            transform: `scaleX(${progress})`,
            transformOrigin: isRight ? "left" : "right",
          }}
        />
        <div style={{ fontSize: 14, color: `${color}cc` }}>
          {isRight ? "→" : "←"}
        </div>
      </div>
      <div
        style={{
          fontSize: 13,
          fontFamily: "'Courier New', monospace",
          color,
          fontWeight: 700,
          marginTop: 2,
          alignSelf: "center",
        }}
      >
        {label}
      </div>
      {sublabel && (
        <div
          style={{
            fontSize: 11,
            fontFamily: "'Courier New', monospace",
            color: `${color}88`,
            alignSelf: "center",
          }}
        >
          {sublabel}
        </div>
      )}
    </div>
  );
};
