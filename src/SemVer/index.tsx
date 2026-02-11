import { AbsoluteFill, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { TitleScene } from "./TitleScene";
import { StructureScene } from "./StructureScene";
import { MajorScene } from "./MajorScene";
import { MinorScene } from "./MinorScene";
import { PatchScene } from "./PatchScene";
import { PreReleaseScene } from "./PreReleaseScene";
import { ComparisonScene } from "./ComparisonScene";
import { SummaryScene } from "./SummaryScene";


// 每个场景的帧数 (fps=30)
const SCENE_DURATIONS = {
  title: 120,        // 4 秒
  structure: 150,    // 5 秒
  major: 135,        // 4.5 秒
  minor: 135,        // 4.5 秒
  patch: 135,        // 4.5 秒
  preRelease: 150,   // 5 秒
  comparison: 150,   // 5 秒
  summary: 150,      // 5 秒
};

const TRANSITION_DURATION = 20; // 转场帧数

export const SemVerVideo: React.FC = () => {
  return (
    <AbsoluteFill>
    {/* 解说音频 — 将 TTS 生成的音频文件放到 public/SemVer/narration.mp3 即可 */}
    {/* <Audio src={staticFile("SemVer/narration.mp3")} volume={1} /> */}

    <TransitionSeries>
      {/* 场景 1: 标题页 */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.title}>
        <TitleScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* 场景 2: 版本号结构 */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.structure}>
        <StructureScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* 场景 3: MAJOR */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.major}>
        <MajorScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* 场景 4: MINOR */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.minor}>
        <MinorScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* 场景 5: PATCH */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.patch}>
        <PatchScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* 场景 6: 预发布与构建元数据 */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.preRelease}>
        <PreReleaseScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* 场景 7: 版本比较 */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.comparison}>
        <ComparisonScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* 场景 8: 总结 */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.summary}>
        <SummaryScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
    </AbsoluteFill>
  );
};

// 计算总帧数: 所有场景帧数之和 - 转场重叠帧数
const allDurations: number[] = [
  SCENE_DURATIONS.title,
  SCENE_DURATIONS.structure,
  SCENE_DURATIONS.major,
  SCENE_DURATIONS.minor,
  SCENE_DURATIONS.patch,
  SCENE_DURATIONS.preRelease,
  SCENE_DURATIONS.comparison,
  SCENE_DURATIONS.summary,
];
export const TOTAL_DURATION =
  allDurations.reduce((a: number, b: number) => a + b, 0) -
  7 * TRANSITION_DURATION; // 7 个转场
