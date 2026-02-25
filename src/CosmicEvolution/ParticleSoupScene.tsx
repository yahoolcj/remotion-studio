import React, { useMemo } from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ThreeCanvas } from "@remotion/three";
import * as THREE from "three";

/**
 * 场景 4：粒子汤 / 夸克-胶子等离子体
 * 大量彩色粒子在空间中激烈碰撞运动
 */

const QUARK_COUNT = 200;
const GLUON_COUNT = 100;

export const ParticleSoupScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // 温度下降视觉 — 颜色从白热到橙红
  const tempProgress = interpolate(frame, [0, 300], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 温度条
  const tempDisplay = interpolate(frame, [0, 300], [10000, 1000], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at center, #2a0a0a 0%, #0a0208 60%, #000 100%)",
      }}
    >
      {/* 3D 粒子场 */}
      <div style={{ position: "absolute", inset: 0 }}>
        <ThreeCanvas
          width={width}
          height={height}
          camera={{ position: [0, 0, 10], fov: 60 }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[0, 0, 0]} intensity={1} color="#ff6b35" />
          <Quarks frame={frame} fps={fps} tempProgress={tempProgress} />
          <Gluons frame={frame} fps={fps} />
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
          color: "rgba(255,107,53,0.6)",
          opacity: interpolate(frame, [5, 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        t = 10⁻⁶ ~ 1 秒
      </div>

      {/* 温度指示器 */}
      <div
        style={{
          position: "absolute",
          top: 30,
          right: 40,
          textAlign: "right",
          opacity: interpolate(frame, [10, 30], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>温度</div>
        <div
          style={{
            fontSize: 24,
            fontWeight: 900,
            color: interpolate(tempProgress, [0, 1], [0, 1]) > 0.5
              ? "rgba(255,150,50,0.8)"
              : "rgba(255,220,180,0.8)",
            textShadow: "0 0 20px rgba(255,107,53,0.3)",
          }}
        >
          ~{Math.round(tempDisplay)} 亿 K
        </div>
      </div>

      {/* 图例 */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          left: 40,
          display: "flex",
          gap: 20,
          opacity: interpolate(frame, [20, 40], [0, 0.7], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Legend color="#ef4444" label="上夸克" />
        <Legend color="#22c55e" label="下夸克" />
        <Legend color="#3b82f6" label="奇夸克" />
        <Legend color="#fbbf24" label="胶子" />
      </div>
    </AbsoluteFill>
  );
};

const Legend: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
    <div
      style={{
        width: 10,
        height: 10,
        borderRadius: "50%",
        background: color,
        boxShadow: `0 0 8px ${color}`,
      }}
    />
    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 700 }}>
      {label}
    </span>
  </div>
);

// ---- 夸克粒子 ----
const Quarks: React.FC<{ frame: number; fps: number; tempProgress: number }> = ({
  frame,
  fps,
  tempProgress,
}) => {
  const data = useMemo(() => {
    const offsets: [number, number, number][] = [];
    const colors: [number, number, number][] = [];
    const speeds: [number, number, number][] = [];
    const quarkColors = [
      [1, 0.27, 0.27],    // 红
      [0.13, 0.77, 0.33],  // 绿
      [0.23, 0.51, 0.98],  // 蓝
    ];

    for (let i = 0; i < QUARK_COUNT; i++) {
      offsets.push([
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
      ]);
      colors.push(quarkColors[i % 3] as [number, number, number]);
      speeds.push([
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 1.5,
      ]);
    }
    return { offsets, colors, speeds };
  }, []);

  // 运动减速（随温度下降）
  const speedFactor = 1 - tempProgress * 0.6;

  return (
    <>
      {data.offsets.map((offset, i) => {
        const t = (frame / fps) * speedFactor;
        const x = offset[0] + Math.sin(t * data.speeds[i][0] + i) * 2;
        const y = offset[1] + Math.cos(t * data.speeds[i][1] + i * 0.7) * 1.5;
        const z = offset[2] + Math.sin(t * data.speeds[i][2] + i * 1.3) * 1;

        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshStandardMaterial
              color={new THREE.Color(data.colors[i][0], data.colors[i][1], data.colors[i][2])}
              emissive={new THREE.Color(data.colors[i][0] * 0.3, data.colors[i][1] * 0.3, data.colors[i][2] * 0.3)}
              transparent
              opacity={0.85}
            />
          </mesh>
        );
      })}
    </>
  );
};

// ---- 胶子粒子 ----
const Gluons: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const data = useMemo(() => {
    const offsets: [number, number, number][] = [];
    const speeds: [number, number, number][] = [];

    for (let i = 0; i < GLUON_COUNT; i++) {
      offsets.push([
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 7,
      ]);
      speeds.push([
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 2,
      ]);
    }
    return { offsets, speeds };
  }, []);

  return (
    <>
      {data.offsets.map((offset, i) => {
        const t = frame / fps;
        const x = offset[0] + Math.sin(t * data.speeds[i][0] + i * 2) * 2.5;
        const y = offset[1] + Math.cos(t * data.speeds[i][1] + i * 1.3) * 2;
        const z = offset[2] + Math.sin(t * data.speeds[i][2] + i) * 1.5;

        return (
          <mesh key={i} position={[x, y, z]}>
            <octahedronGeometry args={[0.05, 0]} />
            <meshStandardMaterial
              color="#fbbf24"
              emissive="#fbbf24"
              emissiveIntensity={0.4}
              transparent
              opacity={0.7}
            />
          </mesh>
        );
      })}
    </>
  );
};
