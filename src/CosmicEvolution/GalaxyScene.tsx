import React, { useMemo } from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ThreeCanvas } from "@remotion/three";
import * as THREE from "three";

/**
 * 场景 8：星系形成
 * 3D 旋涡星系 + Hubble Deep Field 图片
 */

const SPIRAL_PARTICLES = 400;

export const GalaxyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // 两阶段：左半 3D 星系（0~200帧），右半 Hubble 图（120~360帧）
  const galaxyOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });
  const hubbleSpring = spring({ frame, fps, config: { damping: 15 }, delay: 120 });

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at 30% 50%, #0a0525 0%, #020108 60%, #000 100%)",
      }}
    >
      {/* 3D 旋涡星系 — 左半画面 */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "55%",
          height: "100%",
          opacity: galaxyOpacity,
        }}
      >
        <ThreeCanvas
          width={Math.round(width * 0.55)}
          height={height}
          camera={{ position: [0, 3, 6], fov: 55 }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.15} />
          <pointLight position={[0, 0, 0]} intensity={1.5} color="#c4b5fd" />
          <SpiralGalaxy frame={frame} fps={fps} />
        </ThreeCanvas>
      </div>

      {/* Hubble Deep Field — 右半画面 */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: 40,
          transform: `translateY(-50%) scale(${interpolate(hubbleSpring, [0, 1], [0.7, 1])})`,
          opacity: hubbleSpring,
        }}
      >
        <div
          style={{
            borderRadius: 16,
            overflow: "hidden",
            border: "2px solid rgba(196,181,253,0.15)",
            boxShadow: "0 0 50px rgba(139,92,246,0.1)",
          }}
        >
          <Img
            src={staticFile("CosmicEvolution/hubble-deep-field.jpg")}
            style={{ width: 360, height: 360, objectFit: "cover" }}
          />
        </div>
        <div
          style={{
            textAlign: "center",
            marginTop: 10,
            fontSize: 12,
            color: "rgba(255,255,255,0.3)",
          }}
        >
          Hubble Deep Field — 每个光点都是一个星系
        </div>
      </div>

      {/* 时间标注 */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 40,
          fontSize: 14,
          fontWeight: 700,
          color: "rgba(196,181,253,0.6)",
          opacity: interpolate(frame, [5, 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        t ≈ 2~5 亿年
      </div>
    </AbsoluteFill>
  );
};

// ---- 3D 旋涡星系 ----
const SpiralGalaxy: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const rotation = frame * 0.008;

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(SPIRAL_PARTICLES * 3);
    const col = new Float32Array(SPIRAL_PARTICLES * 3);

    for (let i = 0; i < SPIRAL_PARTICLES; i++) {
      // 螺旋臂分布
      const arm = i % 2;
      const t = (i / SPIRAL_PARTICLES) * Math.PI * 4;
      const r = 0.2 + (i / SPIRAL_PARTICLES) * 3.5;
      const armOffset = arm * Math.PI;
      const scatter = (Math.random() - 0.5) * 0.8;

      pos[i * 3] = Math.cos(t + armOffset) * r + scatter * 0.5;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.15; // 薄盘
      pos[i * 3 + 2] = Math.sin(t + armOffset) * r + scatter * 0.5;

      // 颜色：中心偏白，外围偏蓝紫
      const distFactor = r / 4;
      col[i * 3] = 0.8 - distFactor * 0.3;
      col[i * 3 + 1] = 0.7 - distFactor * 0.2;
      col[i * 3 + 2] = 0.95;
    }
    return { positions: pos, colors: col };
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.06,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  );

  // 中心发光球
  const coreMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#ede9fe"),
        transparent: true,
        opacity: 0.7,
      }),
    [],
  );

  return (
    <group rotation={[0.8, rotation, 0]}>
      <points geometry={geometry} material={material} />
      <mesh scale={0.3} material={coreMaterial}>
        <sphereGeometry args={[1, 16, 16]} />
      </mesh>
    </group>
  );
};
