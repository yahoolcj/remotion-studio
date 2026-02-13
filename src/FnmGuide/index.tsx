import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { Intro } from "../shared/Intro";
import { Outro } from "../shared/Outro";
import { Captions, type CaptionSegment } from "../shared/Captions";
import { PainPointScene } from "./PainPointScene";
import { WhatIsFnmScene } from "./WhatIsFnmScene";
import { InstallScene } from "./InstallScene";
import { CommandsScene } from "./CommandsScene";
import { AutoSwitchScene } from "./AutoSwitchScene";
import { DualTermScene } from "./DualTermScene";
import { CheatSheetScene } from "./CheatSheetScene";
import {
  introCaptions,
  painPointCaptions,
  whatIsFnmCaptions,
  installCaptions,
  commandsCaptions,
  autoSwitchCaptions,
  dualTermCaptions,
  cheatSheetCaptions,
  outroCaptions,
} from "./captions";

// ========== 场景时长（fps=30）==========
const SCENE_DURATIONS = {
  intro: 180,       //  6 秒  — 通用开场
  painPoint: 270,   //  9 秒  — nvm 的困境
  whatIsFnm: 240,   //  8 秒  — 什么是 fnm
  install: 300,     // 10 秒  — 安装 fnm
  commands: 300,    // 10 秒  — 核心命令（nvm→fnm 迁移）
  autoSwitch: 300,  // 10 秒  — 项目级自动切换
  dualTerm: 330,    // 11 秒  — 双终端实战
  cheatSheet: 270,  //  9 秒  — 速查表
  outro: 210,       //  7 秒  — 通用结尾
};

const T = 20; // 转场帧数

const SUMMARY_POINTS = [
  "fnm install / use — 安装和切换版本",
  ".nvmrc — 项目级版本自动切换",
  "配置 Shell 环境是关键第一步",
  "Rust 编写，比 nvm 快得多",
];

// ========== 计算全局字幕时间轴 ==========
function buildGlobalCaptions(): CaptionSegment[] {
  const scenes = [
    { dur: SCENE_DURATIONS.intro, caps: introCaptions },
    { dur: SCENE_DURATIONS.painPoint, caps: painPointCaptions },
    { dur: SCENE_DURATIONS.whatIsFnm, caps: whatIsFnmCaptions },
    { dur: SCENE_DURATIONS.install, caps: installCaptions },
    { dur: SCENE_DURATIONS.commands, caps: commandsCaptions },
    { dur: SCENE_DURATIONS.autoSwitch, caps: autoSwitchCaptions },
    { dur: SCENE_DURATIONS.dualTerm, caps: dualTermCaptions },
    { dur: SCENE_DURATIONS.cheatSheet, caps: cheatSheetCaptions },
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
export const FnmGuideVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <TransitionSeries>
        {/* 场景 1: 通用开场 */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.intro}>
          <Intro title="如何同时使用不同 Node 版本？" />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* 场景 2: nvm 的困境 */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.painPoint}>
          <PainPointScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* 场景 3: 什么是 fnm */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.whatIsFnm}>
          <WhatIsFnmScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* 场景 4: 安装 fnm */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.install}>
          <InstallScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* 场景 5: 核心命令（nvm→fnm 迁移） */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.commands}>
          <CommandsScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* 场景 6: 项目级自动切换 */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.autoSwitch}>
          <AutoSwitchScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* 场景 7: 双终端实战 */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.dualTerm}>
          <DualTermScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* 场景 8: 速查表 */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.cheatSheet}>
          <CheatSheetScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* 场景 9: 通用结尾 */}
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
  SCENE_DURATIONS.painPoint,
  SCENE_DURATIONS.whatIsFnm,
  SCENE_DURATIONS.install,
  SCENE_DURATIONS.commands,
  SCENE_DURATIONS.autoSwitch,
  SCENE_DURATIONS.dualTerm,
  SCENE_DURATIONS.cheatSheet,
  SCENE_DURATIONS.outro,
];
export const TOTAL_DURATION =
  allDurations.reduce((a: number, b: number) => a + b, 0) -
  8 * T; // 8 个转场
