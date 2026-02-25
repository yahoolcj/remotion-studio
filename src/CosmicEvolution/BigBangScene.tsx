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
 * 场景 2：奇点与大爆炸
 * 3D 粒子爆炸 — 从中心极亮光点向外飞散
 */
export const BigBangScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // 阶段 1: 奇点蓄力（0~60帧）
  // 阶段 2: 爆炸扩散（60~180帧）
  // 阶段 3: 余辉扩展（180~360帧）

  const singularityPhase = interpolate(frame, [0, 60], [0, 1], {
    extrapolateRight: "clamp",
  });
  const explosionPhase = interpolate(frame, [60, 180], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 背景 — 从纯黑渐变到深紫
  const bgOpacity = interpolate(frame, [60, 180], [0, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 中心光晕
  const glowScale = interpolate(
    frame,
    [0, 30, 55, 65, 120],
    [0, 0.3, 1.2, 8, 15],
    { extrapolateRight: "clamp" },
  );
  const glowOpacity = interpolate(
    frame,
    [0, 30, 60, 65, 180],
    [0, 0.8, 1, 0.9, 0.1],
    { extrapolateRight: "clamp" },
  );

  // 文字标注
  const labelOpacity = interpolate(frame, [10, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const labelFade = interpolate(frame, [50, 60], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {/* 渐变背景 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, rgba(80,20,120,0.3) 0%, transparent 60%)",
          opacity: bgOpacity,
        }}
      />

      {/* 3D 粒子层 */}
      <div style={{ position: "absolute", inset: 0 }}>
        <ThreeCanvas
          width={width}
          height={height}
          camera={{ position: [0, 0, 12], fov: 65 }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.2} />
          <pointLight position={[0, 0, 0]} intensity={2} color="#fff8e1" />
          <ExplosionParticles frame={frame} fps={fps} />
          <SingularityCore frame={frame} fps={fps} />
        </ThreeCanvas>
      </div>

      {/* 中心光晕（2D 叠加增强效果） */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 200,
          height: 200,
          transform: `translate(-50%, -50%) scale(${glowScale})`,
          background:
            "radial-gradient(circle, rgba(255,255,240,0.9) 0%, rgba(255,200,100,0.4) 30%, rgba(200,100,255,0.1) 60%, transparent 80%)",
          borderRadius: "50%",
          opacity: glowOpacity,
          pointerEvents: "none",
        }}
      />

      {/* 奇点标注文字 */}
      <div
        style={{
          position: "absolute",
          bottom: 180,
          width: "100%",
          textAlign: "center",
          fontSize: 20,
          fontWeight: 700,
          color: "rgba(255,255,255,0.6)",
          letterSpacing: "6px",
          opacity: labelOpacity * labelFade,
        }}
      >
        奇 点
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
          opacity: interpolate(frame, [70, 90], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        t = 0 — 大爆炸
      </div>
    </AbsoluteFill>
  );
};

// ---- 3D 粒子爆炸 ----
const PARTICLE_COUNT = 600;

const ExplosionParticles: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  // 预计算粒子方向和颜色
  const { positions, colors, velocities } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);
    const vel = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // 球面均匀分布
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const speed = 0.3 + Math.random() * 0.8;
      vel[i * 3] = Math.sin(phi) * Math.cos(theta) * speed;
      vel[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * speed;
      vel[i * 3 + 2] = Math.cos(phi) * speed;

      pos[i * 3] = 0;
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = 0;

      // 颜色：白→黄→橙→红 随机分布
      const colorPhase = Math.random();
      if (colorPhase < 0.3) {
        col[i * 3] = 1; col[i * 3 + 1] = 1; col[i * 3 + 2] = 0.95; // 白
      } else if (colorPhase < 0.6) {
        col[i * 3] = 1; col[i * 3 + 1] = 0.85; col[i * 3 + 2] = 0.3; // 黄
      } else if (colorPhase < 0.85) {
        col[i * 3] = 1; col[i * 3 + 1] = 0.55; col[i * 3 + 2] = 0.1; // 橙
      } else {
        col[i * 3] = 1; col[i * 3 + 1] = 0.2; col[i * 3 + 2] = 0.1; // 红
      }
    }
    return { positions: pos, colors: col, velocities: vel };
  }, []);

  // 计算当前帧粒子位置
  const currentPositions = useMemo(() => {
    const cp = new Float32Array(PARTICLE_COUNT * 3);
    const explosionStart = 60;
    const t = Math.max(0, (frame - explosionStart) / fps);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      cp[i * 3] = velocities[i * 3] * t * 8;
      cp[i * 3 + 1] = velocities[i * 3 + 1] * t * 8;
      cp[i * 3 + 2] = velocities[i * 3 + 2] * t * 8;
    }
    return cp;
  }, [frame, fps, velocities]);

  const particleOpacity = interpolate(frame, [55, 65, 300, 360], [0, 1, 0.8, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(currentPositions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [currentPositions, colors]);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.08,
        vertexColors: true,
        transparent: true,
        opacity: particleOpacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [particleOpacity],
  );

  if (frame < 55) return null;

  return <points geometry={geometry} material={material} />;
};

// ---- 3D 奇点核心 ----
const SingularityCore: React.FC<{ frame: number; fps: number }> = ({
  frame,
}) => {
  const scale = interpolate(frame, [0, 55, 65, 120], [0.05, 0.5, 3, 0.3], {
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(frame, [0, 20, 55, 70, 200], [0, 0.8, 1, 0.6, 0.1], {
    extrapolateRight: "clamp",
  });

  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#fffbe6"),
        transparent: true,
        opacity,
      }),
    [opacity],
  );

  return (
    <mesh scale={scale} material={material}>
      <sphereGeometry args={[1, 32, 32]} />
    </mesh>
  );
};
