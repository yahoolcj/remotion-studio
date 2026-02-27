import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { Intro } from "../shared/Intro";
import { Outro } from "../shared/Outro";
import { Captions, type CaptionSegment } from "../shared/Captions";
import { WhyCacheScene } from "./WhyCacheScene";
import { CacheOverviewScene } from "./CacheOverviewScene";
import { CacheControlScene } from "./CacheControlScene";
import { ExpiresVsMaxAgeScene } from "./ExpiresVsMaxAgeScene";
import { ETagScene } from "./ETagScene";
import { LastModifiedScene } from "./LastModifiedScene";
import { DecisionTreeScene } from "./DecisionTreeScene";
import { BestPracticeScene } from "./BestPracticeScene";
import {
  introCaptions,
  whyCacheCaptions,
  cacheOverviewCaptions,
  cacheControlCaptions,
  expiresVsMaxAgeCaptions,
  etagCaptions,
  lastModifiedCaptions,
  decisionTreeCaptions,
  bestPracticeCaptions,
  outroCaptions,
} from "./captions";

// ========== 场景时长（fps=30）==========
const SCENE_DURATIONS = {
  intro: 180,          //  6 秒  — 通用开场
  whyCache: 270,       //  9 秒  — 为什么需要缓存
  cacheOverview: 270,  //  9 秒  — 缓存总览
  cacheControl: 360,   // 12 秒  — Cache-Control 指令
  expiresVsMaxAge: 270, //  9 秒  — Expires vs max-age
  etag: 360,           // 12 秒  — ETag
  lastModified: 270,   //  9 秒  — Last-Modified
  decisionTree: 360,   // 12 秒  — 决策流程图
  bestPractice: 270,   //  9 秒  — 最佳实践
  outro: 210,          //  7 秒  — 通用结尾
};

const T = 20; // 转场帧数

const SUMMARY_POINTS = [
  "强缓存通过 Cache-Control / Expires 控制",
  "协商缓存通过 ETag / Last-Modified 验证",
  "实际项目中两者搭配使用效果最佳",
];

// ========== 计算全局字幕时间轴 ==========
function buildGlobalCaptions(): CaptionSegment[] {
  const scenes = [
    { dur: SCENE_DURATIONS.intro, caps: introCaptions },
    { dur: SCENE_DURATIONS.whyCache, caps: whyCacheCaptions },
    { dur: SCENE_DURATIONS.cacheOverview, caps: cacheOverviewCaptions },
    { dur: SCENE_DURATIONS.cacheControl, caps: cacheControlCaptions },
    { dur: SCENE_DURATIONS.expiresVsMaxAge, caps: expiresVsMaxAgeCaptions },
    { dur: SCENE_DURATIONS.etag, caps: etagCaptions },
    { dur: SCENE_DURATIONS.lastModified, caps: lastModifiedCaptions },
    { dur: SCENE_DURATIONS.decisionTree, caps: decisionTreeCaptions },
    { dur: SCENE_DURATIONS.bestPractice, caps: bestPracticeCaptions },
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
    globalOffset += dur - (i < scenes.length - 1 ? T : 0);
  }

  return result;
}

const GLOBAL_CAPTIONS = buildGlobalCaptions();

// ========== 主组件 ==========
export const HttpCacheVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <TransitionSeries>
        {/* 场景 1: 通用开场 */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.intro}>
          <Intro title="一文搞懂 HTTP 缓存" />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* 场景 2: 为什么需要缓存 */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.whyCache}>
          <WhyCacheScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* 场景 3: 缓存总览 */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.cacheOverview}>
          <CacheOverviewScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* 场景 4: Cache-Control 指令 */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.cacheControl}>
          <CacheControlScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* 场景 5: Expires vs max-age */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.expiresVsMaxAge}>
          <ExpiresVsMaxAgeScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* 场景 6: ETag */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.etag}>
          <ETagScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* 场景 7: Last-Modified */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.lastModified}>
          <LastModifiedScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* 场景 8: 决策流程图 */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.decisionTree}>
          <DecisionTreeScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* 场景 9: 最佳实践 */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.bestPractice}>
          <BestPracticeScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* 场景 10: 通用结尾 */}
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
  SCENE_DURATIONS.whyCache,
  SCENE_DURATIONS.cacheOverview,
  SCENE_DURATIONS.cacheControl,
  SCENE_DURATIONS.expiresVsMaxAge,
  SCENE_DURATIONS.etag,
  SCENE_DURATIONS.lastModified,
  SCENE_DURATIONS.decisionTree,
  SCENE_DURATIONS.bestPractice,
  SCENE_DURATIONS.outro,
];
export const TOTAL_DURATION =
  allDurations.reduce((a: number, b: number) => a + b, 0) -
  9 * T; // 9 个转场
