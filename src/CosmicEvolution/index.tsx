import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { Intro } from "../shared/Intro";
import { Outro } from "../shared/Outro";
import { Captions, type CaptionSegment } from "../shared/Captions";
import { BigBangScene } from "./BigBangScene";
import { InflationScene } from "./InflationScene";
import { ParticleSoupScene } from "./ParticleSoupScene";
import { NucleosynthesisScene } from "./NucleosynthesisScene";
import { CMBScene } from "./CMBScene";
import { DarkAgeScene } from "./DarkAgeScene";
import { GalaxyScene } from "./GalaxyScene";
import { SolarSystemScene } from "./SolarSystemScene";
import { ModernUniverseScene } from "./ModernUniverseScene";
import { TimelineScene } from "./TimelineScene";
import {
  introCaptions,
  bigBangCaptions,
  inflationCaptions,
  particleSoupCaptions,
  nucleosynthesisCaptions,
  cmbCaptions,
  darkAgeCaptions,
  galaxyCaptions,
  solarSystemCaptions,
  modernUniverseCaptions,
  timelineCaptions,
  outroCaptions,
} from "./captions";

// ========== 场景时长（fps=30）==========
const SCENE_DURATIONS = {
  intro: 180,             //  6 秒
  bigBang: 360,           // 12 秒
  inflation: 300,         // 10 秒
  particleSoup: 300,      // 10 秒
  nucleosynthesis: 300,   // 10 秒
  cmb: 300,               // 10 秒
  darkAge: 360,           // 12 秒
  galaxy: 360,            // 12 秒
  solarSystem: 360,       // 12 秒
  modernUniverse: 300,    // 10 秒
  timeline: 240,          //  8 秒
  outro: 210,             //  7 秒
};

const T = 20; // 转场帧数

const SUMMARY_POINTS = [
  "大爆炸创造了时间、空间与物质",
  "暴胀让宇宙在瞬间膨胀 10²⁶ 倍",
  "核合成赋予宇宙最初的元素",
  "第一颗恒星点亮了黑暗",
  "星系汇聚成壮观的宇宙纤维网",
];

// ========== 计算全局字幕时间轴 ==========
function buildGlobalCaptions(): CaptionSegment[] {
  const scenes = [
    { dur: SCENE_DURATIONS.intro, caps: introCaptions },
    { dur: SCENE_DURATIONS.bigBang, caps: bigBangCaptions },
    { dur: SCENE_DURATIONS.inflation, caps: inflationCaptions },
    { dur: SCENE_DURATIONS.particleSoup, caps: particleSoupCaptions },
    { dur: SCENE_DURATIONS.nucleosynthesis, caps: nucleosynthesisCaptions },
    { dur: SCENE_DURATIONS.cmb, caps: cmbCaptions },
    { dur: SCENE_DURATIONS.darkAge, caps: darkAgeCaptions },
    { dur: SCENE_DURATIONS.galaxy, caps: galaxyCaptions },
    { dur: SCENE_DURATIONS.solarSystem, caps: solarSystemCaptions },
    { dur: SCENE_DURATIONS.modernUniverse, caps: modernUniverseCaptions },
    { dur: SCENE_DURATIONS.timeline, caps: timelineCaptions },
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
export const CosmicEvolutionVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <TransitionSeries>
        {/* 1. 通用开场 */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.intro}>
          <Intro title="从奇点到星辰：宇宙 138 亿年演化史" />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* 2. 奇点与大爆炸 */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.bigBang}>
          <BigBangScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* 3. 暴胀时期 */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.inflation}>
          <InflationScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* 4. 粒子汤 */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.particleSoup}>
          <ParticleSoupScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* 5. 核合成与原子诞生 */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.nucleosynthesis}>
          <NucleosynthesisScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* 6. 宇宙微波背景辐射 */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.cmb}>
          <CMBScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* 7. 暗黑时代与第一颗恒星 */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.darkAge}>
          <DarkAgeScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* 8. 星系形成 */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.galaxy}>
          <GalaxyScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* 9. 太阳系与地球 */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.solarSystem}>
          <SolarSystemScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* 10. 现代宇宙 */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.modernUniverse}>
          <ModernUniverseScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* 11. 时间轴总览 */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.timeline}>
          <TimelineScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* 12. 通用结尾 */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.outro}>
          <Outro summaryPoints={SUMMARY_POINTS} />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {/* 字幕层 */}
      <Captions segments={GLOBAL_CAPTIONS} />
    </AbsoluteFill>
  );
};

// ========== 导出总帧数 ==========
const allDurations: number[] = [
  SCENE_DURATIONS.intro,
  SCENE_DURATIONS.bigBang,
  SCENE_DURATIONS.inflation,
  SCENE_DURATIONS.particleSoup,
  SCENE_DURATIONS.nucleosynthesis,
  SCENE_DURATIONS.cmb,
  SCENE_DURATIONS.darkAge,
  SCENE_DURATIONS.galaxy,
  SCENE_DURATIONS.solarSystem,
  SCENE_DURATIONS.modernUniverse,
  SCENE_DURATIONS.timeline,
  SCENE_DURATIONS.outro,
];
export const TOTAL_DURATION =
  allDurations.reduce((a: number, b: number) => a + b, 0) -
  11 * T; // 11 个转场
