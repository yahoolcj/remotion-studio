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
 * 场景 5：核合成与原子诞生
 * 质子/中子结合 → 原子核 → 电子被俘获 → 原子
 */
export const NucleosynthesisScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // 阶段 1: 质子中子碰撞结合（0~150帧）
  // 阶段 2: 原子核形成 + 电子环绕（150~300帧）
  const phase = interpolate(frame, [0, 300], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at center, #1a0a2e 0%, #080418 60%, #000 100%)",
      }}
    >
      {/* 3D 原子模型 */}
      <div style={{ position: "absolute", inset: 0 }}>
        <ThreeCanvas
          width={width}
          height={height}
          camera={{ position: [0, 0, 8], fov: 55 }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[3, 3, 3]} intensity={0.6} color="#818cf8" />
          <pointLight position={[-3, -2, 2]} intensity={0.4} color="#f472b6" />
          <AtomModel frame={frame} fps={fps} phase={phase} />
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
          color: "rgba(129,140,248,0.6)",
          opacity: interpolate(frame, [5, 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        t = 3 分钟 ~ 38 万年
      </div>

      {/* 右侧标签 */}
      <div
        style={{
          position: "absolute",
          top: 30,
          right: 40,
          textAlign: "right",
        }}
      >
        <div
          style={{
            fontSize: 18,
            fontWeight: 900,
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "4px",
            opacity: interpolate(frame, [5, 20], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          NUCLEOSYNTHESIS
        </div>
      </div>

      {/* 阶段标签 */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          width: "100%",
          textAlign: "center",
        }}
      >
        {frame < 150 ? (
          <div
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: "rgba(239,68,68,0.7)",
              opacity: interpolate(frame, [20, 40, 140, 150], [0, 1, 1, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            质子 + 中子 → 原子核
          </div>
        ) : (
          <div
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: "rgba(56,189,248,0.7)",
              opacity: interpolate(frame, [155, 175], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            电子被俘获 → 第一个原子诞生
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

// ---- 3D 原子模型 ----
const AtomModel: React.FC<{
  frame: number;
  fps: number;
  phase: number;
}> = ({ frame, fps, phase }) => {
  // 阶段 1：散落的核子互相接近
  // 阶段 2：形成原子核 + 电子轨道
  const nucleusScale = interpolate(phase, [0, 0.3, 0.5], [0, 0.3, 1], {
    extrapolateRight: "clamp",
  });
  const electronOrbitOpacity = interpolate(phase, [0.4, 0.6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 核子散布 → 聚拢
  const nucleonSpread = interpolate(phase, [0, 0.4], [3, 0], {
    extrapolateRight: "clamp",
  });

  const protonMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#ef4444"),
        emissive: new THREE.Color("#ef4444"),
        emissiveIntensity: 0.3,
        roughness: 0.3,
      }),
    [],
  );

  const neutronMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#3b82f6"),
        emissive: new THREE.Color("#3b82f6"),
        emissiveIntensity: 0.3,
        roughness: 0.3,
      }),
    [],
  );

  const electronMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#38bdf8"),
        emissive: new THREE.Color("#38bdf8"),
        emissiveIntensity: 0.5,
      }),
    [],
  );

  const orbitMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#38bdf8"),
        transparent: true,
        opacity: 0.15,
        side: THREE.DoubleSide,
      }),
    [],
  );

  // 核子位置
  const protonPositions: [number, number, number][] = [
    [0.3 + nucleonSpread * 0.8, 0.2, 0],
    [-0.2, 0.3 + nucleonSpread * 0.6, 0.1],
  ];
  const neutronPositions: [number, number, number][] = [
    [-0.3, -0.2 - nucleonSpread * 0.7, 0],
    [0.2, -0.1, 0.3 + nucleonSpread * 0.5],
  ];

  // 电子轨道角度
  const electronAngle1 = (frame / fps) * 3;
  const electronAngle2 = (frame / fps) * 2.5 + Math.PI;
  const orbitRadius = 2.5;

  return (
    <group rotation={[0.3, frame * 0.005, 0]}>
      {/* 原子核 — 质子 */}
      {protonPositions.map((pos, i) => (
        <mesh key={`p-${i}`} position={pos} scale={nucleusScale * 0.4} material={protonMaterial}>
          <sphereGeometry args={[1, 16, 16]} />
        </mesh>
      ))}

      {/* 原子核 — 中子 */}
      {neutronPositions.map((pos, i) => (
        <mesh key={`n-${i}`} position={pos} scale={nucleusScale * 0.4} material={neutronMaterial}>
          <sphereGeometry args={[1, 16, 16]} />
        </mesh>
      ))}

      {/* 电子轨道环 */}
      <mesh rotation={[Math.PI / 4, 0, 0]} material={orbitMaterial}>
        <torusGeometry args={[orbitRadius, 0.02, 8, 64]} />
      </mesh>
      <mesh rotation={[-Math.PI / 3, Math.PI / 4, 0]} material={orbitMaterial}>
        <torusGeometry args={[orbitRadius, 0.02, 8, 64]} />
      </mesh>

      {/* 电子 */}
      <mesh
        position={[
          Math.cos(electronAngle1) * orbitRadius * 0.7,
          Math.sin(electronAngle1) * orbitRadius * 0.7,
          Math.sin(electronAngle1) * orbitRadius * 0.5,
        ]}
        scale={electronOrbitOpacity * 0.15}
        material={electronMaterial}
      >
        <sphereGeometry args={[1, 12, 12]} />
      </mesh>
      <mesh
        position={[
          Math.cos(electronAngle2) * orbitRadius * 0.6,
          Math.sin(electronAngle2) * orbitRadius * 0.5,
          -Math.cos(electronAngle2) * orbitRadius * 0.6,
        ]}
        scale={electronOrbitOpacity * 0.15}
        material={electronMaterial}
      >
        <sphereGeometry args={[1, 12, 12]} />
      </mesh>
    </group>
  );
};
