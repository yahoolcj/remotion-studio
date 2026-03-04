import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { Intro } from "../shared/Intro";
import { Outro } from "../shared/Outro";
import { Captions, type CaptionSegment } from "../shared/Captions";
import { WhatIsSkillScene } from "./WhatIsSkillScene";
import { WhatIsZ1DesignScene } from "./WhatIsZ1DesignScene";
import { EditorSupportScene } from "./EditorSupportScene";
import { InstallGuideScene } from "./InstallGuideScene";
import { UsageDevPageScene } from "./UsageDevPageScene";
import { UsageQueryMigrateScene } from "./UsageQueryMigrateScene";
import { ComponentOverviewScene } from "./ComponentOverviewScene";
import { MaintenanceFAQScene } from "./MaintenanceFAQScene";
import {
  introCaptions,
  whatIsSkillCaptions,
  whatIsZ1DesignCaptions,
  editorSupportCaptions,
  installGuideCaptions,
  usageDevPageCaptions,
  usageQueryMigrateCaptions,
  componentOverviewCaptions,
  maintenanceFAQCaptions,
  outroCaptions,
} from "./captions";

const SCENE_DURATIONS = {
  intro: 180,
  whatIsSkill: 300,
  whatIsZ1Design: 270,
  editorSupport: 240,
  installGuide: 270,
  usageDevPage: 300,
  usageQueryMigrate: 300,
  componentOverview: 330,
  maintenanceFAQ: 270,
  outro: 210,
};

const T = 20;

const SUMMARY_POINTS = [
  "渐进式加载，低上下文开销",
  "55 个组件完整文档，随用随查",
  "开发、查询、迁移三大场景全覆盖",
];

function buildGlobalCaptions(): CaptionSegment[] {
  const scenes = [
    { dur: SCENE_DURATIONS.intro, caps: introCaptions },
    { dur: SCENE_DURATIONS.whatIsSkill, caps: whatIsSkillCaptions },
    { dur: SCENE_DURATIONS.whatIsZ1Design, caps: whatIsZ1DesignCaptions },
    { dur: SCENE_DURATIONS.editorSupport, caps: editorSupportCaptions },
    { dur: SCENE_DURATIONS.installGuide, caps: installGuideCaptions },
    { dur: SCENE_DURATIONS.usageDevPage, caps: usageDevPageCaptions },
    { dur: SCENE_DURATIONS.usageQueryMigrate, caps: usageQueryMigrateCaptions },
    { dur: SCENE_DURATIONS.componentOverview, caps: componentOverviewCaptions },
    { dur: SCENE_DURATIONS.maintenanceFAQ, caps: maintenanceFAQCaptions },
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

export const SkillGuideVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.intro}>
          <Intro title="z1-design-dev Skill 使用指南" />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.whatIsSkill}>
          <WhatIsSkillScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: T })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.whatIsZ1Design}>
          <WhatIsZ1DesignScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.editorSupport}>
          <EditorSupportScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: T })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.installGuide}>
          <InstallGuideScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.usageDevPage}>
          <UsageDevPageScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: T })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.usageQueryMigrate}>
          <UsageQueryMigrateScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.componentOverview}>
          <ComponentOverviewScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: T })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.maintenanceFAQ}>
          <MaintenanceFAQScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.outro}>
          <Outro summaryPoints={SUMMARY_POINTS} />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      <Captions segments={GLOBAL_CAPTIONS} />
    </AbsoluteFill>
  );
};

const allDurations: number[] = [
  SCENE_DURATIONS.intro,
  SCENE_DURATIONS.whatIsSkill,
  SCENE_DURATIONS.whatIsZ1Design,
  SCENE_DURATIONS.editorSupport,
  SCENE_DURATIONS.installGuide,
  SCENE_DURATIONS.usageDevPage,
  SCENE_DURATIONS.usageQueryMigrate,
  SCENE_DURATIONS.componentOverview,
  SCENE_DURATIONS.maintenanceFAQ,
  SCENE_DURATIONS.outro,
];
export const TOTAL_DURATION =
  allDurations.reduce((a: number, b: number) => a + b, 0) -
  9 * T;
