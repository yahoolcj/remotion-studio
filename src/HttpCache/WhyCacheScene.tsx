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

export const WhyCacheScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 200 }, delay: 5 });

  const browserSpring = spring({ frame, fps, config: { damping: 15 }, delay: 18 });
  const serverSpring = spring({ frame, fps, config: { damping: 15 }, delay: 24 });

  const arrow1Progress = interpolate(frame, [40, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const arrow2Progress = interpolate(frame, [70, 85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const arrow3Progress = interpolate(frame, [100, 115], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const counterSpring = spring({ frame, fps, config: { damping: 200 }, delay: 50 });

  const slowBadge = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 120 },
    delay: 130,
  });

  const wasteLine = spring({ frame, fps, config: { damping: 200 }, delay: 160 });

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
        gap: 24,
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
        为什么需要缓存？
      </div>

      {/* 浏览器 ⇄ 服务器 请求动画 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
          position: "relative",
          height: 200,
        }}
      >
        {/* 浏览器 */}
        <div
          style={{
            width: 160,
            height: 140,
            borderRadius: 18,
            background: "rgba(99,102,241,0.12)",
            border: "2px solid rgba(99,102,241,0.3)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            opacity: browserSpring,
            transform: `scale(${interpolate(browserSpring, [0, 1], [0.5, 1])})`,
          }}
        >
          <div style={{ fontSize: 40 }}>🌐</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#818cf8" }}>
            浏览器
          </div>
        </div>

        {/* 请求箭头区域 */}
        <div
          style={{
            flex: 1,
            maxWidth: 500,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            padding: "0 20px",
          }}
        >
          <ArrowLine progress={arrow1Progress} label="GET /style.css" delay={0} />
          <ArrowLine progress={arrow2Progress} label="GET /style.css" delay={1} />
          <ArrowLine progress={arrow3Progress} label="GET /style.css" delay={2} />
        </div>

        {/* 服务器 */}
        <div
          style={{
            width: 160,
            height: 140,
            borderRadius: 18,
            background: "rgba(168,85,247,0.12)",
            border: "2px solid rgba(168,85,247,0.3)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            opacity: serverSpring,
            transform: `scale(${interpolate(serverSpring, [0, 1], [0.5, 1])})`,
          }}
        >
          <div style={{ fontSize: 40 }}>🖥️</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#a855f7" }}>
            服务器
          </div>
        </div>
      </div>

      {/* 计数器 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 24,
          opacity: counterSpring,
        }}
      >
        {[
          { label: "请求次数", value: "3 次", color: "#ef4444" },
          { label: "传输数据", value: "450 KB × 3", color: "#f59e0b" },
          { label: "耗时", value: "200ms × 3", color: "#ef4444" },
        ].map((item, i) => {
          const itemSpring = spring({
            frame,
            fps,
            config: { damping: 200 },
            delay: 55 + i * 12,
          });
          return (
            <div
              key={item.label}
              style={{
                textAlign: "center",
                opacity: itemSpring,
                transform: `translateY(${interpolate(itemSpring, [0, 1], [15, 0])}px)`,
              }}
            >
              <div style={{ fontSize: 24, fontWeight: 900, color: item.color }}>
                {item.value}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.4)",
                  marginTop: 4,
                }}
              >
                {item.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* 慢速标记 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 16,
          opacity: slowBadge,
          transform: `scale(${interpolate(slowBadge, [0, 1], [0.6, 1])})`,
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 900,
            color: "#ef4444",
            padding: "10px 28px",
            borderRadius: 12,
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.25)",
          }}
        >
          ✗ 重复下载 = 浪费带宽 + 加载缓慢
        </div>
      </div>

      {/* 底部提示 */}
      <div
        style={{
          fontSize: 15,
          color: "rgba(255,255,255,0.45)",
          textAlign: "center",
          opacity: wasteLine,
        }}
      >
        如果浏览器能记住已下载的文件，就不用每次都重新请求了
      </div>
    </AbsoluteFill>
  );
};

const ArrowLine: React.FC<{
  progress: number;
  label: string;
  delay: number;
}> = ({ progress, label }) => (
  <div
    style={{
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: 8,
      opacity: progress,
    }}
  >
    <div
      style={{
        flex: 1,
        height: 2,
        background: "linear-gradient(90deg, #818cf8, #a855f7)",
        transform: `scaleX(${progress})`,
        transformOrigin: "left",
      }}
    />
    <div
      style={{
        fontSize: 12,
        fontFamily: "'Courier New', monospace",
        color: "rgba(255,255,255,0.5)",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </div>
    <div
      style={{
        fontSize: 16,
        color: "#a855f7",
      }}
    >
      →
    </div>
  </div>
);
