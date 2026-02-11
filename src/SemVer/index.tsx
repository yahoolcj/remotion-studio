import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { Intro } from "../shared/Intro";
import { Outro } from "../shared/Outro";
import { Captions, type CaptionSegment } from "../shared/Captions";
import { StructureScene } from "./StructureScene";
import { MajorScene } from "./MajorScene";
import { MinorScene } from "./MinorScene";
import { PatchScene } from "./PatchScene";
import { PreReleaseScene } from "./PreReleaseScene";
import { ComparisonScene } from "./ComparisonScene";
import { RealWorldScene } from "./RealWorldScene";
import {
  introCaptions,
  structureCaptions,
  majorCaptions,
  minorCaptions,
  patchCaptions,
  preReleaseCaptions,
  comparisonCaptions,
  realWorldCaptions,
  outroCaptions,
} from "./captions";

// ========== 场景时长（fps=30）==========
// 按正常语速拉长，确保字幕完整朗读 + 留出呼吸间隔
const SCENE_DURATIONS = {
  intro: 180,        //  6 秒  — 通用开场
  structure: 270,    //  9 秒
  major: 300,        // 10 秒
  minor: 270,        //  9 秒
  patch: 270,        //  9 秒
  preRelease: 330,   // 11 秒
  comparison: 330,   // 11 秒
  realWorld: 630,    // 21 秒  — 实际应用（两页）
  outro: 210,        //  7 秒  — 通用结尾
};

const T = 20; // 转场帧数

const SUMMARY_POINTS = [
  "MAJOR — 不兼容的 API 变更",
  "MINOR — 向后兼容的新功能",
  "PATCH — 向后兼容的 Bug 修复",
  "预发布标识不保证稳定性",
  "构建元数据不影响版本比较",
];

// ========== 计算全局字幕时间轴 ==========
// TransitionSeries 中，每个转场使前后场景重叠 T 帧
// 场景 N 的全局起始帧 = sum(前 N 个场景时长) - N * T

function buildGlobalCaptions(): CaptionSegment[] {
  const scenes = [
    { dur: SCENE_DURATIONS.intro, caps: introCaptions },
    { dur: SCENE_DURATIONS.structure, caps: structureCaptions },
    { dur: SCENE_DURATIONS.major, caps: majorCaptions },
    { dur: SCENE_DURATIONS.minor, caps: minorCaptions },
    { dur: SCENE_DURATIONS.patch, caps: patchCaptions },
    { dur: SCENE_DURATIONS.preRelease, caps: preReleaseCaptions },
    { dur: SCENE_DURATIONS.comparison, caps: comparisonCaptions },
    { dur: SCENE_DURATIONS.realWorld, caps: realWorldCaptions },
    { dur: SCENE_DURATIONS.outro, caps: outroCaptions },
  ];

  const result: CaptionSegment[] = [];
  let globalOffset = 0;

  for (let i = 0; i < scenes.length; i++) {
    const { dur, caps } = scenes[i];
    for (const seg of caps) {
      result.push({
        text: seg.text,
        startFrame: globalOffset + seg.startFrame,
        durationFrames: seg.durationFrames,
      });
    }
    // 下一个场景的起始 = 当前偏移 + 当前时长 - 转场重叠
    globalOffset += dur - (i < scenes.length - 1 ? T : 0);
  }

  return result;
}

const GLOBAL_CAPTIONS = buildGlobalCaptions();

// ========== 主组件 ==========
export const SemVerVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <TransitionSeries>
        {/* 通用开场 */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.intro}>
          <Intro title="语义化版本号规范" />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* 版本号结构 */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.structure}>
          <StructureScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* MAJOR */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.major}>
          <MajorScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* MINOR */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.minor}>
          <MinorScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* PATCH */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.patch}>
          <PatchScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* 预发布与构建元数据 */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.preRelease}>
          <PreReleaseScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* 版本比较 */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.comparison}>
          <ComparisonScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* 实际应用 */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.realWorld}>
          <RealWorldScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* 通用结尾 */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.outro}>
          <Outro summaryPoints={SUMMARY_POINTS} />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {/* 字幕层 — 叠加在所有场景之上 */}
      <Captions segments={GLOBAL_CAPTIONS} />
    </AbsoluteFill>
  );
};

// ========== 导出总帧数 ==========
const allDurations: number[] = [
  SCENE_DURATIONS.intro,
  SCENE_DURATIONS.structure,
  SCENE_DURATIONS.major,
  SCENE_DURATIONS.minor,
  SCENE_DURATIONS.patch,
  SCENE_DURATIONS.preRelease,
  SCENE_DURATIONS.comparison,
  SCENE_DURATIONS.realWorld,
  SCENE_DURATIONS.outro,
];
export const TOTAL_DURATION =
  allDurations.reduce((a: number, b: number) => a + b, 0) -
  8 * T; // 8 个转场
