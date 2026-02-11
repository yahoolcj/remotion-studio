import {
  AbsoluteFill,
  interpolate,
  spring,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

/**
 * 一条字幕段落
 * - text: 显示文本
 * - startFrame: 在全局时间轴上的起始帧
 * - durationFrames: 持续帧数
 */
export type CaptionSegment = {
  text: string;
  startFrame: number;
  durationFrames: number;
};

type CaptionsProps = {
  segments: CaptionSegment[];
};

/**
 * 通用字幕层 — 叠加在视频最上层
 *
 * 显示在画面底部，最大宽度 70%，超长自动换行。
 * 每段字幕带淡入动画。
 */
export const Captions: React.FC<CaptionsProps> = ({ segments }) => {
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {segments.map((seg, i) => (
        <Sequence
          key={i}
          from={seg.startFrame}
          durationInFrames={seg.durationFrames}
          layout="none"
        >
          <CaptionBubble text={seg.text} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

const CaptionBubble: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 淡入
  const entrySpring = spring({
    frame,
    fps,
    config: { damping: 200 },
  });
  const y = interpolate(entrySpring, [0, 1], [12, 0]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 40,
      }}
    >
      <div
        style={{
          maxWidth: "70%",
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(12px)",
          borderRadius: 14,
          padding: "12px 28px",
          opacity: entrySpring,
          transform: `translateY(${y}px)`,
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          style={{
            fontSize: 26,
            fontWeight: 700,
            fontFamily,
            color: "rgba(255,255,255,0.95)",
            textAlign: "center",
            lineHeight: 1.6,
            letterSpacing: "0.5px",
          }}
        >
          {text}
        </div>
      </div>
    </AbsoluteFill>
  );
};
