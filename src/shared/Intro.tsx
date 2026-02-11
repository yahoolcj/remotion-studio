import {
  AbsoluteFill,
  Easing,
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

export type IntroProps = {
  title: string;
};

/**
 * 通用开场片段 — 所有视频统一使用
 *
 * 展示署名 "花蛤豆腐汤" + 动态传入的视频标题
 * 推荐时长：120 帧（4 秒 @30fps）
 */
export const Intro: React.FC<IntroProps> = ({ title }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // ======== 动画时间线 ========

  // 0. 背景渐显
  const bgOpacity = interpolate(frame, [0, 0.3 * fps], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 1. 中心爆发光环 — 快速放大后缩小稳定
  const burstSpring = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 160, mass: 0.8 },
    delay: 2,
  });
  const burstScale = interpolate(burstSpring, [0, 1], [0, 3.5]);
  const burstOpacity = interpolate(burstSpring, [0, 0.6, 1], [0, 0.6, 0.12]);

  // 2. 粒子光带旋转
  const particleRotation = interpolate(frame, [0, 4 * fps], [0, 90], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // 3. 署名 — 从上方滑入
  const authorSpring = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 140 },
    delay: 8,
  });
  const authorY = interpolate(authorSpring, [0, 1], [-40, 0]);

  // 4. 左右装饰线从中心展开
  const lineProgress = interpolate(frame, [14, 14 + 0.6 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // 5. 主标题 — 巨大、从底部弹跳入场
  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 80, mass: 1.2 },
    delay: 16,
  });
  const titleY = interpolate(titleSpring, [0, 1], [120, 0]);
  const titleScale = interpolate(titleSpring, [0, 1], [0.4, 1]);
  const titleOpacity = interpolate(titleSpring, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 6. 标题底部发光条脉冲
  const glowPulse = interpolate(
    frame,
    [28, 28 + 0.5 * fps, 28 + 1 * fps, 28 + 1.5 * fps],
    [0, 1, 0.6, 0.8],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // 7. "presents" 标签
  const presentsSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 38,
  });

  // 8. 角落装饰框
  const cornerSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 10,
  });
  const cornerSize = interpolate(cornerSpring, [0, 1], [0, 60]);

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(145deg, #070515 0%, #1a1145 40%, #0d0b2e 70%, #12061f 100%)",
        fontFamily,
        opacity: bgOpacity,
        overflow: "hidden",
      }}
    >
      {/* ---- 背景网格 ---- */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), " +
            "linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: interpolate(frame, [0, 1 * fps], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      />

      {/* ---- 中心爆发光环 ---- */}
      <div
        style={{
          position: "absolute",
          top: height / 2 - 300,
          left: width / 2 - 300,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(129,140,248,0.5) 0%, rgba(168,85,247,0.2) 40%, transparent 70%)",
          transform: `scale(${burstScale})`,
          opacity: burstOpacity,
        }}
      />

      {/* ---- 旋转光带 ---- */}
      <div
        style={{
          position: "absolute",
          top: height / 2 - 400,
          left: width / 2 - 400,
          width: 800,
          height: 800,
          borderRadius: "50%",
          border: "1px solid rgba(129,140,248,0.08)",
          transform: `rotate(${particleRotation}deg)`,
          opacity: interpolate(frame, [4, 1 * fps], [0, 0.5], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        {/* 光点 */}
        {[0, 60, 120, 200, 280, 340].map((deg) => (
          <div
            key={deg}
            style={{
              position: "absolute",
              top: 400 + Math.sin((deg * Math.PI) / 180) * 398,
              left: 400 + Math.cos((deg * Math.PI) / 180) * 398,
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: deg % 120 === 0 ? "#818cf8" : "#f472b6",
              boxShadow: `0 0 12px 4px ${deg % 120 === 0 ? "rgba(129,140,248,0.6)" : "rgba(244,114,182,0.6)"}`,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </div>

      {/* ---- 飘浮几何装饰 ---- */}
      <FloatingShape
        x={width * 0.12}
        y={height * 0.2}
        size={40}
        color="rgba(99,102,241,0.12)"
        rotation={frame * 0.8}
        delay={6}
        shape="diamond"
      />
      <FloatingShape
        x={width * 0.85}
        y={height * 0.25}
        size={28}
        color="rgba(244,114,182,0.1)"
        rotation={-frame * 0.6}
        delay={10}
        shape="circle"
      />
      <FloatingShape
        x={width * 0.08}
        y={height * 0.75}
        size={32}
        color="rgba(168,85,247,0.1)"
        rotation={frame * 0.5}
        delay={14}
        shape="square"
      />
      <FloatingShape
        x={width * 0.9}
        y={height * 0.72}
        size={36}
        color="rgba(99,102,241,0.1)"
        rotation={-frame * 0.7}
        delay={8}
        shape="diamond"
      />
      <FloatingShape
        x={width * 0.3}
        y={height * 0.85}
        size={22}
        color="rgba(244,114,182,0.08)"
        rotation={frame * 1.2}
        delay={18}
        shape="circle"
      />
      <FloatingShape
        x={width * 0.72}
        y={height * 0.12}
        size={26}
        color="rgba(168,85,247,0.08)"
        rotation={-frame * 0.9}
        delay={12}
        shape="square"
      />

      {/* ---- 四角装饰框 ---- */}
      <Corner pos="top-left" size={cornerSize} />
      <Corner pos="top-right" size={cornerSize} />
      <Corner pos="bottom-left" size={cornerSize} />
      <Corner pos="bottom-right" size={cornerSize} />

      {/* ---- 主体内容 ---- */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* 署名 */}
        <div
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "8px",
            opacity: authorSpring,
            transform: `translateY(${authorY}px)`,
          }}
        >
          花蛤豆腐汤
        </div>

        {/* presents */}
        <div
          style={{
            fontSize: 13,
            fontWeight: 400,
            color: "rgba(255,255,255,0.2)",
            letterSpacing: "10px",
            textTransform: "uppercase",
            opacity: presentsSpring,
            marginTop: 6,
            marginBottom: 20,
          }}
        >
          presents
        </div>

        {/* 左右装饰线 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              width: 120 * lineProgress,
              height: 1,
              background:
                "linear-gradient(90deg, transparent, rgba(129,140,248,0.6))",
            }}
          />
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#818cf8",
              boxShadow: "0 0 16px 4px rgba(129,140,248,0.5)",
              opacity: lineProgress,
              transform: `scale(${lineProgress})`,
            }}
          />
          <div
            style={{
              width: 120 * lineProgress,
              height: 1,
              background:
                "linear-gradient(90deg, rgba(244,114,182,0.6), transparent)",
            }}
          />
        </div>

        {/* ===== 巨大标题 ===== */}
        <div
          style={{
            fontSize: 100,
            fontWeight: 900,
            color: "white",
            textAlign: "center",
            maxWidth: 1100,
            lineHeight: 1.1,
            letterSpacing: "-2px",
            opacity: titleOpacity,
            transform: `translateY(${titleY}px) scale(${titleScale})`,
            textShadow:
              "0 0 60px rgba(129,140,248,0.35), 0 0 120px rgba(129,140,248,0.15), 0 4px 20px rgba(0,0,0,0.5)",
          }}
        >
          {title}
        </div>

        {/* 标题底部发光条 */}
        <div
          style={{
            marginTop: 24,
            width: 360 * titleSpring,
            height: 4,
            borderRadius: 2,
            background: "linear-gradient(90deg, #818cf8, #c084fc, #f472b6)",
            boxShadow: `0 0 ${20 + glowPulse * 20}px ${4 + glowPulse * 8}px rgba(129,140,248,${0.3 + glowPulse * 0.3})`,
            opacity: titleSpring,
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---- 飘浮几何装饰 ----

const FloatingShape: React.FC<{
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  delay: number;
  shape: "diamond" | "circle" | "square";
}> = ({ x, y, size, color, rotation, delay, shape }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrySpring = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay,
  });

  const floatY = Math.sin((frame + delay * 10) * 0.06) * 8;

  const borderRadius =
    shape === "circle" ? "50%" : shape === "diamond" ? "4px" : "6px";
  const extraRotation = shape === "diamond" ? 45 : 0;

  return (
    <div
      style={{
        position: "absolute",
        top: y + floatY,
        left: x,
        width: size,
        height: size,
        borderRadius,
        border: `1.5px solid ${color}`,
        background: "transparent",
        transform: `rotate(${rotation + extraRotation}deg) scale(${entrySpring})`,
        opacity: entrySpring * 0.7,
      }}
    />
  );
};

// ---- 四角装饰框 ----

const Corner: React.FC<{
  pos: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  size: number;
}> = ({ pos, size }) => {
  const isTop = pos.includes("top");
  const isLeft = pos.includes("left");

  return (
    <div
      style={{
        position: "absolute",
        top: isTop ? 28 : undefined,
        bottom: isTop ? undefined : 28,
        left: isLeft ? 28 : undefined,
        right: isLeft ? undefined : 28,
        width: size,
        height: size,
        borderTop: isTop ? "2px solid rgba(129,140,248,0.25)" : "none",
        borderBottom: isTop ? "none" : "2px solid rgba(129,140,248,0.25)",
        borderLeft: isLeft ? "2px solid rgba(129,140,248,0.25)" : "none",
        borderRight: isLeft ? "none" : "2px solid rgba(129,140,248,0.25)",
      }}
    />
  );
};
