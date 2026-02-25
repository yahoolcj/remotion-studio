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
 * 场景 3：暴胀时期
 * 球体指数级膨胀 + 空间网格拉伸
 */
export const InflationScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // 膨胀进度 — 指数曲线
  const inflationProgress = interpolate(frame, [0, 180], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0, 0.3, 1),
  });

  // 文字标签
  const textOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 体积数字 — 从 1 到 10^26
  const exponent = interpolate(frame, [30, 200], [0, 26], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at center, #1a0a3e 0%, #0a0520 50%, #000 100%)",
      }}
    >
      {/* 3D 膨胀球体 + 网格 */}
      <div style={{ position: "absolute", inset: 0 }}>
        <ThreeCanvas
          width={width}
          height={height}
          camera={{ position: [0, 0, 18], fov: 55 }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.15} />
          <pointLight position={[0, 0, 0]} intensity={1.5} color="#c084fc" />
          <directionalLight position={[5, 5, 5]} intensity={0.3} color="#818cf8" />
          <InflationSphere frame={frame} fps={fps} progress={inflationProgress} />
          <SpaceGrid frame={frame} fps={fps} progress={inflationProgress} />
        </ThreeCanvas>
      </div>

      {/* 时间标注 */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 40,
          fontSize: 14,
          fontWeight: 700,
          color: "rgba(192,132,252,0.6)",
          opacity: textOpacity,
        }}
      >
        t = 10⁻³⁶ ~ 10⁻³² 秒
      </div>

      {/* 体积倍率 */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          width: "100%",
          textAlign: "center",
          opacity: interpolate(frame, [50, 70], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <span
          style={{
            fontSize: 48,
            fontWeight: 900,
            color: "rgba(192,132,252,0.8)",
            textShadow: "0 0 40px rgba(192,132,252,0.4)",
          }}
        >
          ×10
        </span>
        <sup
          style={{
            fontSize: 32,
            fontWeight: 900,
            color: "rgba(255,255,255,0.9)",
          }}
        >
          {Math.round(exponent)}
        </sup>
      </div>

      {/* 暴胀标签 */}
      <div
        style={{
          position: "absolute",
          top: 30,
          right: 40,
          fontSize: 18,
          fontWeight: 900,
          color: "rgba(255,255,255,0.3)",
          letterSpacing: "4px",
          opacity: textOpacity,
        }}
      >
        INFLATION
      </div>
    </AbsoluteFill>
  );
};

// ---- 膨胀球体 ----
const InflationSphere: React.FC<{
  frame: number;
  fps: number;
  progress: number;
}> = ({ frame, progress }) => {
  // 球体从小到巨大
  const scale = 0.3 + progress * 12;
  const opacity = interpolate(progress, [0, 0.3, 0.8, 1], [0.8, 0.5, 0.2, 0.08]);

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#7c3aed"),
        metalness: 0.1,
        roughness: 0.3,
        transparent: true,
        opacity,
        side: THREE.DoubleSide,
        transmission: 0.7,
        thickness: 2,
        wireframe: false,
      }),
    [opacity],
  );

  return (
    <mesh
      scale={scale}
      rotation={[frame * 0.003, frame * 0.005, 0]}
      material={material}
    >
      <icosahedronGeometry args={[1, 3]} />
    </mesh>
  );
};

// ---- 空间网格 ----
const GRID_LINES = 20;

const SpaceGrid: React.FC<{
  frame: number;
  fps: number;
  progress: number;
}> = ({ frame, progress }) => {
  const gridScale = 1 + progress * 5;
  const gridOpacity = interpolate(progress, [0, 0.1, 0.5, 1], [0, 0.3, 0.15, 0.05]);

  const gridGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const size = 20;
    const step = size / GRID_LINES;

    // 横线
    for (let i = -GRID_LINES / 2; i <= GRID_LINES / 2; i++) {
      points.push(new THREE.Vector3(-size / 2, i * step, 0));
      points.push(new THREE.Vector3(size / 2, i * step, 0));
    }
    // 竖线
    for (let i = -GRID_LINES / 2; i <= GRID_LINES / 2; i++) {
      points.push(new THREE.Vector3(i * step, -size / 2, 0));
      points.push(new THREE.Vector3(i * step, size / 2, 0));
    }

    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, []);

  const gridMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color("#818cf8"),
        transparent: true,
        opacity: gridOpacity,
      }),
    [gridOpacity],
  );

  return (
    <lineSegments
      geometry={gridGeometry}
      material={gridMaterial}
      scale={[gridScale, gridScale, 1]}
      position={[0, 0, -3]}
      rotation={[frame * 0.001, 0, 0]}
    />
  );
};
