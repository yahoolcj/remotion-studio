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
 * 场景 6：宇宙微波背景辐射
 * 3D 半透明球面 + NASA WMAP 全天图
 */
export const CMBScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 200 }, delay: 5 });
  const imageSpring = spring({ frame, fps, config: { damping: 15 }, delay: 40 });
  const labelSpring = spring({ frame, fps, config: { damping: 200 }, delay: 80 });

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at center, #0f0a2a 0%, #050310 60%, #000 100%)",
      }}
    >
      {/* 3D 背景层 — 旋转球面代表 CMB */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: interpolate(frame, [0, 30], [0, 0.35], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        <ThreeCanvas
          width={width}
          height={height}
          camera={{ position: [0, 0, 4], fov: 50 }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.4} />
          <CMBSphere frame={frame} />
        </ThreeCanvas>
      </div>

      {/* 标题 */}
      <div
        style={{
          position: "absolute",
          top: 35,
          left: 40,
          fontSize: 14,
          fontWeight: 700,
          color: "rgba(251,191,36,0.6)",
          opacity: titleSpring,
        }}
      >
        t = 38 万年 — 宇宙变得透明
      </div>

      {/* 中央 WMAP 图 */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${interpolate(imageSpring, [0, 1], [0.6, 1])})`,
          opacity: imageSpring,
        }}
      >
        <div
          style={{
            borderRadius: 20,
            overflow: "hidden",
            border: "2px solid rgba(251,191,36,0.15)",
            boxShadow: "0 0 60px rgba(251,191,36,0.1)",
          }}
        >
          <Img
            src={staticFile("CosmicEvolution/cmb-wmap.jpg")}
            style={{ width: 560, height: 280, objectFit: "cover" }}
          />
        </div>

        {/* 图片标注 */}
        <div
          style={{
            textAlign: "center",
            marginTop: 12,
            fontSize: 13,
            color: "rgba(255,255,255,0.35)",
            opacity: labelSpring,
          }}
        >
          NASA / WMAP 九年微波天空图 — 宇宙的 "第一张照片"
        </div>
      </div>

      {/* 右上角标签 */}
      <div
        style={{
          position: "absolute",
          top: 30,
          right: 40,
          fontSize: 18,
          fontWeight: 900,
          color: "rgba(255,255,255,0.2)",
          letterSpacing: "3px",
          opacity: titleSpring,
        }}
      >
        CMB
      </div>

      {/* 注释标签 */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          width: "100%",
          textAlign: "center",
          fontSize: 15,
          fontWeight: 700,
          color: "rgba(251,191,36,0.5)",
          opacity: interpolate(frame, [120, 150], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        色彩差异 = 温度波动 ≈ 万分之一度 → 未来星系的种子
      </div>
    </AbsoluteFill>
  );
};

// ---- 3D CMB 球面 ----
const CMBSphere: React.FC<{ frame: number }> = ({ frame }) => {
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#d4a028"),
        metalness: 0.1,
        roughness: 0.8,
        transparent: true,
        opacity: 0.2,
        wireframe: true,
        side: THREE.DoubleSide,
      }),
    [],
  );

  return (
    <mesh rotation={[0.2, frame * 0.003, 0.1]} material={material}>
      <sphereGeometry args={[2.5, 32, 32]} />
    </mesh>
  );
};
