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

export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 背景渐变动画
  const bgOpacity = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 标题入场动画 - spring弹入
  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
    delay: 8,
  });
  const titleY = interpolate(titleSpring, [0, 1], [80, 0]);
  const titleScale = interpolate(titleSpring, [0, 1], [0.7, 1]);

  // 副标题入场
  const subtitleSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 20,
  });
  const subtitleOpacity = subtitleSpring;
  const subtitleY = interpolate(subtitleSpring, [0, 1], [30, 0]);

  // 版本号动态显示
  const versionSpring = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 120 },
    delay: 35,
  });
  const versionScale = interpolate(versionSpring, [0, 1], [0.3, 1]);

  // 装饰线条动画
  const lineWidth = interpolate(frame, [15, 15 + 1.2 * fps], [0, 360], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 底部标签动画
  const tagSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 50,
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        fontFamily,
        opacity: bgOpacity,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* 背景装饰圆 */}
      <div
        style={{
          position: "absolute",
          top: -120,
          right: -120,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
          opacity: interpolate(frame, [0, 1 * fps], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -80,
          left: -80,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)",
          opacity: interpolate(frame, [0, 1 * fps], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        {/* 版本号大字 */}
        <div
          style={{
            fontSize: 120,
            fontWeight: 900,
            color: "white",
            transform: `translateY(${titleY}px) scale(${titleScale})`,
            letterSpacing: "-2px",
            textShadow: "0 4px 30px rgba(99,102,241,0.5)",
          }}
        >
          <span style={{ color: "#818cf8" }}>Sem</span>
          <span style={{ color: "#f472b6" }}>Ver</span>
        </div>

        {/* 装饰线 */}
        <div
          style={{
            width: lineWidth,
            height: 3,
            background: "linear-gradient(90deg, #818cf8, #f472b6)",
            borderRadius: 2,
          }}
        />

        {/* 副标题 */}
        <div
          style={{
            fontSize: 36,
            color: "rgba(255,255,255,0.85)",
            fontWeight: 400,
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
            letterSpacing: "4px",
          }}
        >
          语义化版本号规范
        </div>

        {/* 版本号示例 */}
        <div
          style={{
            marginTop: 30,
            transform: `scale(${versionScale})`,
            display: "flex",
            alignItems: "center",
            gap: 0,
          }}
        >
          <VersionBadge text="2" color="#6366f1" label="" />
          <Dot />
          <VersionBadge text="1" color="#a855f7" label="" />
          <Dot />
          <VersionBadge text="0" color="#ec4899" label="" />
        </div>

        {/* 底部标签 */}
        <div
          style={{
            marginTop: 24,
            display: "flex",
            gap: 12,
            opacity: tagSpring,
          }}
        >
          {["npm", "开源生态", "依赖管理"].map((tag) => (
            <div
              key={tag}
              style={{
                padding: "6px 18px",
                borderRadius: 20,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.7)",
                fontSize: 16,
                fontWeight: 400,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const VersionBadge: React.FC<{ text: string; color: string; label: string }> = ({
  text,
  color,
}) => (
  <div
    style={{
      width: 80,
      height: 80,
      borderRadius: 16,
      background: color,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: 48,
      fontWeight: 900,
      color: "white",
      boxShadow: `0 8px 32px ${color}66`,
    }}
  >
    {text}
  </div>
);

const Dot: React.FC = () => (
  <div
    style={{
      fontSize: 48,
      fontWeight: 900,
      color: "rgba(255,255,255,0.5)",
      margin: "0 6px",
    }}
  >
    .
  </div>
);
