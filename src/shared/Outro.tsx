import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { loadFont } from "@remotion/google-fonts/Inter";
import React, { useMemo } from "react";
import * as THREE from "three";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});

export type OutroProps = {
  /** 可选的总结要点列表，不传则只显示"谢谢观看" */
  summaryPoints?: string[];
};

/**
 * 通用结尾片段 — 所有视频统一使用
 *
 * 展示可选的总结要点 + "谢谢观看" + 署名 "花蛤豆腐汤"
 * 推荐时长：无总结时 90 帧（3 秒），有总结时 150 帧（5 秒）@30fps
 */
export const Outro: React.FC<OutroProps> = ({ summaryPoints }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const hasSummary = summaryPoints && summaryPoints.length > 0;

  // ---- 总结要点动画 ----
  const summaryTitleSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 5,
  });

  // ---- "谢谢观看" 入场 ----
  const thanksDelay = hasSummary ? 10 + summaryPoints.length * 12 + 15 : 8;
  const thanksSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
    delay: thanksDelay,
  });
  const thanksScale = interpolate(thanksSpring, [0, 1], [0.5, 1]);

  // ---- 装饰线 ----
  const lineDelay = thanksDelay + 12;
  const lineWidth = interpolate(
    frame,
    [lineDelay, lineDelay + 0.8 * fps],
    [0, 280],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // ---- 署名 ----
  const authorSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: lineDelay + 10,
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        fontFamily,
        padding: "60px 80px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* 背景装饰 */}
      <div
        style={{
          position: "absolute",
          top: -100,
          left: -100,
          width: 460,
          height: 460,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -80,
          right: -80,
          width: 380,
          height: 380,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)",
        }}
      />

      {/* 3D 背景层 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: interpolate(frame, [0, 0.6 * fps], [0, 0.45], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        <ThreeCanvas
          width={width}
          height={height}
          camera={{ position: [0, 0, 7], fov: 50 }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.25} />
          <directionalLight position={[4, 3, 5]} intensity={0.5} color="#818cf8" />
          <pointLight position={[-3, -2, 4]} intensity={0.35} color="#ec4899" />

          {/* 缓慢旋转的环面结 */}
          <OutroTorusKnot frame={frame} fps={fps} />

          {/* 漂浮球体 */}
          <OutroSphere position={[-3, 2, -1]} color="#818cf8" frame={frame} offset={0} />
          <OutroSphere position={[3.5, -1.8, -0.8]} color="#f472b6" frame={frame} offset={2} />
          <OutroSphere position={[-2.5, -2.5, 0.5]} color="#a78bfa" frame={frame} offset={4} />
          <OutroSphere position={[2, 2.8, -1.2]} color="#38bdf8" frame={frame} offset={6} />
        </ThreeCanvas>
      </div>

      {/* 可选：总结要点 */}
      {hasSummary && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            width: "100%",
            maxWidth: 800,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 900,
              color: "white",
              marginBottom: 12,
              opacity: summaryTitleSpring,
              transform: `translateY(${interpolate(summaryTitleSpring, [0, 1], [20, 0])}px)`,
              textAlign: "center",
            }}
          >
            核心要点
          </div>

          {summaryPoints.map((point, i) => {
            const delay = 10 + i * 12;
            const pointSpring = spring({
              frame,
              fps,
              config: { damping: 200 },
              delay,
            });

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  opacity: pointSpring,
                  transform: `translateX(${interpolate(pointSpring, [0, 1], [-30, 0])}px)`,
                  padding: "10px 20px",
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    background: "rgba(129,140,248,0.2)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: 15,
                    fontWeight: 900,
                    color: "#818cf8",
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </div>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.85)",
                  }}
                >
                  {point}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 谢谢观看 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          transform: `scale(${thanksScale})`,
          opacity: thanksSpring,
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: "white",
            letterSpacing: "4px",
            textShadow: "0 4px 30px rgba(99,102,241,0.4)",
          }}
        >
          谢谢观看
        </div>
      </div>

      {/* 装饰线 */}
      <div
        style={{
          width: lineWidth,
          height: 3,
          background: "linear-gradient(90deg, #818cf8, #f472b6)",
          borderRadius: 2,
          marginTop: 16,
        }}
      />

      {/* 署名 */}
      <div
        style={{
          marginTop: 20,
          fontSize: 24,
          fontWeight: 700,
          color: "rgba(255,255,255,0.5)",
          letterSpacing: "6px",
          opacity: authorSpring,
          transform: `translateY(${interpolate(authorSpring, [0, 1], [15, 0])}px)`,
        }}
      >
        花蛤豆腐汤
      </div>
    </AbsoluteFill>
  );
};

// ---- 3D 环面结 ----

const OutroTorusKnot: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const entryProgress = Math.min(frame / (fps * 1.5), 1);
  const easedScale = 1 - Math.pow(1 - entryProgress, 3);

  const rotX = frame * 0.006;
  const rotY = frame * 0.01;

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#7c3aed"),
        metalness: 0.4,
        roughness: 0.1,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide,
        transmission: 0.5,
        thickness: 1,
        ior: 1.4,
        wireframe: false,
      }),
    [],
  );

  return (
    <mesh rotation={[rotX, rotY, 0]} scale={easedScale * 1.2} material={material}>
      <torusKnotGeometry args={[1, 0.35, 128, 16, 2, 3]} />
    </mesh>
  );
};

// ---- 3D 漂浮球体 ----

const OutroSphere: React.FC<{
  position: [number, number, number];
  color: string;
  frame: number;
  offset: number;
}> = ({ position, color, frame, offset }) => {
  const floatY = Math.sin(frame * 0.035 + offset) * 0.4;
  const rotY = frame * 0.015;

  const entryProgress = Math.min(frame / 25, 1);
  const easedScale = (1 - Math.pow(1 - entryProgress, 3)) * 0.2;

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        metalness: 0.7,
        roughness: 0.15,
        transparent: true,
        opacity: 0.5,
        wireframe: true,
      }),
    [color],
  );

  return (
    <mesh
      position={[position[0], position[1] + floatY, position[2]]}
      rotation={[0, rotY, 0]}
      scale={easedScale}
      material={material}
    >
      <sphereGeometry args={[1, 16, 16]} />
    </mesh>
  );
};
