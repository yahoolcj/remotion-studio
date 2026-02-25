import React, { useMemo } from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ThreeCanvas } from "@remotion/three";
import * as THREE from "three";

/**
 * 场景 9：太阳系与地球形成
 * 3D 太阳 + 行星轨道 + 行星
 */

const PLANETS: {
  name: string;
  color: string;
  orbit: number;
  size: number;
  speed: number;
  delay: number;
}[] = [
  { name: "水星", color: "#9ca3af", orbit: 1.8, size: 0.08, speed: 4.5, delay: 80 },
  { name: "金星", color: "#fbbf24", orbit: 2.3, size: 0.12, speed: 3.5, delay: 100 },
  { name: "地球", color: "#3b82f6", orbit: 2.9, size: 0.13, speed: 3, delay: 120 },
  { name: "火星", color: "#ef4444", orbit: 3.4, size: 0.1, speed: 2.5, delay: 140 },
  { name: "木星", color: "#d97706", orbit: 4.2, size: 0.28, speed: 1.5, delay: 160 },
  { name: "土星", color: "#eab308", orbit: 5, size: 0.22, speed: 1.2, delay: 175 },
];

export const SolarSystemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at center, #1a0f05 0%, #050208 60%, #000 100%)",
      }}
    >
      {/* 3D 太阳系 */}
      <div style={{ position: "absolute", inset: 0 }}>
        <ThreeCanvas
          width={width}
          height={height}
          camera={{ position: [0, 6, 10], fov: 45 }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.1} />
          <pointLight position={[0, 0, 0]} intensity={3} color="#fff5e1" distance={20} />
          <Sun frame={frame} fps={fps} />
          {PLANETS.map((p) => (
            <Planet
              key={p.name}
              {...p}
              frame={frame}
              fps={fps}
            />
          ))}
          <BackgroundStars />
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
          color: "rgba(255,200,100,0.6)",
          opacity: interpolate(frame, [5, 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        t ≈ 92 亿年 — 46 亿年前
      </div>

      {/* 地球标注 */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          width: "100%",
          textAlign: "center",
          fontSize: 18,
          fontWeight: 900,
          color: "rgba(59,130,246,0.7)",
          opacity: interpolate(frame, [180, 210], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          textShadow: "0 0 20px rgba(59,130,246,0.3)",
        }}
      >
        其中一颗蓝色的岩石行星 — 就是地球 🌍
      </div>
    </AbsoluteFill>
  );
};

// ---- 太阳 ----
const Sun: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const scale = interpolate(frame, [0, 40], [0, 0.6], { extrapolateRight: "clamp" });
  const pulse = 1 + Math.sin(frame * 0.05) * 0.03;

  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#fff8dc"),
      }),
    [],
  );

  return (
    <mesh scale={scale * pulse} material={material}>
      <sphereGeometry args={[1, 32, 32]} />
    </mesh>
  );
};

// ---- 行星 ----
const Planet: React.FC<{
  color: string;
  orbit: number;
  size: number;
  speed: number;
  delay: number;
  frame: number;
  fps: number;
  name: string;
}> = ({ color, orbit, size, speed, delay, frame, fps, name }) => {
  const opacity = interpolate(frame, [delay, delay + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const angle = (frame / fps) * speed;
  const x = Math.cos(angle) * orbit;
  const z = Math.sin(angle) * orbit;

  const planetMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        metalness: 0.2,
        roughness: 0.6,
        transparent: true,
        opacity,
      }),
    [color, opacity],
  );

  const orbitMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#ffffff"),
        transparent: true,
        opacity: Math.min(opacity * 0.1, 0.1),
        side: THREE.DoubleSide,
      }),
    [opacity],
  );

  // 地球高亮
  const isEarth = name === "地球";
  const earthGlow = isEarth
    ? interpolate(frame, [180, 220], [0, 0.5], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  return (
    <group>
      {/* 轨道环 */}
      <mesh rotation={[Math.PI / 2, 0, 0]} material={orbitMaterial}>
        <torusGeometry args={[orbit, 0.005, 8, 64]} />
      </mesh>

      {/* 行星 */}
      <mesh position={[x, 0, z]} scale={size} material={planetMaterial}>
        <sphereGeometry args={[1, 16, 16]} />
      </mesh>

      {/* 地球发光环 */}
      {isEarth && earthGlow > 0 && (
        <mesh position={[x, 0, z]} scale={size * 2.5}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial
            color="#3b82f6"
            transparent
            opacity={earthGlow * 0.3}
          />
        </mesh>
      )}
    </group>
  );
};

// ---- 背景星星 ----
const BackgroundStars: React.FC = () => {
  const { positions } = useMemo(() => {
    const count = 300;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = -10 - Math.random() * 20;
    }
    return { positions: pos };
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.04,
        color: "#ffffff",
        transparent: true,
        opacity: 0.6,
      }),
    [],
  );

  return <points geometry={geometry} material={material} />;
};
