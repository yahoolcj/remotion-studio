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
 * 场景 10：现代宇宙
 * 3D 宇宙大尺度纤维结构 + Webb 图片
 */

const NODE_COUNT = 120;
const FILAMENT_COUNT = 200;

export const ModernUniverseScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const pillarsSpring = spring({ frame, fps, config: { damping: 15 }, delay: 100 });

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at center, #0a0525 0%, #020108 60%, #000 100%)",
      }}
    >
      {/* 3D 大尺度结构 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: interpolate(frame, [0, 30], [0, 0.8], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        <ThreeCanvas
          width={width}
          height={height}
          camera={{ position: [0, 0, 15], fov: 55 }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.15} />
          <pointLight position={[5, 5, 5]} intensity={0.4} color="#818cf8" />
          <pointLight position={[-5, -3, 3]} intensity={0.3} color="#f472b6" />
          <CosmicWeb frame={frame} fps={fps} />
        </ThreeCanvas>
      </div>

      {/* Webb 图片 — 右下角 */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          right: 40,
          transform: `scale(${interpolate(pillarsSpring, [0, 1], [0.7, 1])})`,
          opacity: pillarsSpring,
        }}
      >
        <div
          style={{
            borderRadius: 12,
            overflow: "hidden",
            border: "1px solid rgba(129,140,248,0.15)",
            boxShadow: "0 0 40px rgba(129,140,248,0.08)",
          }}
        >
          <Img
            src={staticFile("CosmicEvolution/pillars-of-creation.png")}
            style={{ width: 200, height: 280, objectFit: "cover" }}
          />
        </div>
        <div
          style={{
            textAlign: "center",
            marginTop: 6,
            fontSize: 10,
            color: "rgba(255,255,255,0.25)",
          }}
        >
          Webb — 创生之柱
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
          color: "rgba(129,140,248,0.6)",
          opacity: interpolate(frame, [5, 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        t = 138 亿年 — 今天
      </div>

      {/* 数据标注 */}
      <div
        style={{
          position: "absolute",
          top: 30,
          right: 40,
          textAlign: "right",
          opacity: interpolate(frame, [30, 50], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>可观测宇宙</div>
        <div
          style={{
            fontSize: 20,
            fontWeight: 900,
            color: "rgba(129,140,248,0.7)",
          }}
        >
          ~2000 亿个星系
        </div>
      </div>

      {/* 底部标注 */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          left: 40,
          maxWidth: 400,
          fontSize: 14,
          fontWeight: 700,
          color: "rgba(255,255,255,0.35)",
          opacity: interpolate(frame, [60, 90], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        星系团通过暗物质丝线连接，
        <br />
        构成壮观的宇宙纤维结构
      </div>
    </AbsoluteFill>
  );
};

// ---- 3D 宇宙纤维网 ----
const CosmicWeb: React.FC<{ frame: number; fps: number }> = ({ frame }) => {
  // 节点 — 代表星系团
  const nodes = useMemo(() => {
    const data: [number, number, number][] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      data.push([
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 10,
      ]);
    }
    return data;
  }, []);

  // 纤维线 — 连接近邻节点
  const filaments = useMemo(() => {
    const lines: { from: [number, number, number]; to: [number, number, number] }[] = [];
    for (let i = 0; i < FILAMENT_COUNT; i++) {
      const a = Math.floor(Math.random() * NODE_COUNT);
      let b = Math.floor(Math.random() * NODE_COUNT);
      if (b === a) b = (a + 1) % NODE_COUNT;
      lines.push({ from: nodes[a], to: nodes[b] });
    }
    return lines;
  }, [nodes]);

  const filamentGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (const { from, to } of filaments) {
      points.push(new THREE.Vector3(...from));
      points.push(new THREE.Vector3(...to));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [filaments]);

  const filamentMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color("#818cf8"),
        transparent: true,
        opacity: 0.08,
      }),
    [],
  );

  const nodeMaterial = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.1,
        color: "#c4b5fd",
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  const nodeGeometry = useMemo(() => {
    const pos = new Float32Array(NODE_COUNT * 3);
    for (let i = 0; i < NODE_COUNT; i++) {
      pos[i * 3] = nodes[i][0];
      pos[i * 3 + 1] = nodes[i][1];
      pos[i * 3 + 2] = nodes[i][2];
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return geo;
  }, [nodes]);

  return (
    <group rotation={[0.1, frame * 0.003, 0]}>
      <lineSegments geometry={filamentGeometry} material={filamentMaterial} />
      <points geometry={nodeGeometry} material={nodeMaterial} />
    </group>
  );
};
