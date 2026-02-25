import React, { useMemo } from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { ThreeCanvas } from "@remotion/three";
import * as THREE from "three";

/**
 * 场景 7：宇宙暗黑时代与第一颗恒星
 * 从全黑到第一缕星光
 */

const STAR_COUNT = 80;

export const DarkAgeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // 阶段 1: 黑暗（0~120帧）
  // 阶段 2: 第一颗恒星点亮（120~200帧）
  // 阶段 3: 更多恒星出现（200~360帧）

  const firstStarGlow = interpolate(frame, [100, 140, 200], [0, 0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {/* 3D 星空 */}
      <div style={{ position: "absolute", inset: 0 }}>
        <ThreeCanvas
          width={width}
          height={height}
          camera={{ position: [0, 0, 10], fov: 60 }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.05} />
          <FirstStar frame={frame} fps={fps} />
          <EmergingStars frame={frame} fps={fps} />
        </ThreeCanvas>
      </div>

      {/* 中心光晕 — 第一颗恒星 */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 300,
          height: 300,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(255,240,200,0.8) 0%, rgba(255,200,100,0.2) 30%, transparent 60%)",
          borderRadius: "50%",
          opacity: firstStarGlow,
          pointerEvents: "none",
        }}
      />

      {/* 暗黑时代文字 */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: 36,
          fontWeight: 900,
          color: "rgba(255,255,255,0.15)",
          letterSpacing: "12px",
          opacity: interpolate(frame, [10, 30, 100, 130], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        DARK AGES
      </div>

      {/* 时间标注 */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 40,
          fontSize: 14,
          fontWeight: 700,
          color: "rgba(255,200,100,0.5)",
          opacity: interpolate(frame, [5, 25], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        t = 38 万年 ~ 1 亿年
      </div>

      {/* 第一颗恒星标注 */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          width: "100%",
          textAlign: "center",
          fontSize: 20,
          fontWeight: 900,
          color: "rgba(255,220,150,0.7)",
          opacity: interpolate(frame, [160, 190], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          textShadow: "0 0 30px rgba(255,200,100,0.3)",
        }}
      >
        第一颗恒星点燃了宇宙
      </div>
    </AbsoluteFill>
  );
};

// ---- 第一颗恒星 ----
const FirstStar: React.FC<{ frame: number; fps: number }> = ({ frame }) => {
  const scale = interpolate(frame, [100, 140, 200, 250], [0, 0.05, 0.4, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#fff8e1"),
        transparent: true,
        opacity: 0.95,
      }),
    [],
  );

  if (frame < 100) return null;

  return (
    <mesh scale={scale} material={material}>
      <sphereGeometry args={[1, 16, 16]} />
    </mesh>
  );
};

// ---- 逐渐出现的星星 ----
const EmergingStars: React.FC<{ frame: number; fps: number }> = ({ frame }) => {
  const stars = useMemo(() => {
    const data: { pos: [number, number, number]; delay: number; size: number }[] = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      data.push({
        pos: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 10 - 3,
        ],
        delay: 180 + Math.random() * 160,
        size: 0.02 + Math.random() * 0.06,
      });
    }
    return data;
  }, []);

  return (
    <>
      {stars.map((star, i) => {
        const opacity = interpolate(
          frame,
          [star.delay, star.delay + 20],
          [0, 0.8],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        if (opacity < 0.01) return null;
        return (
          <mesh key={i} position={star.pos} scale={star.size}>
            <sphereGeometry args={[1, 6, 6]} />
            <meshBasicMaterial
              color="#fffbe6"
              transparent
              opacity={opacity}
            />
          </mesh>
        );
      })}
    </>
  );
};
