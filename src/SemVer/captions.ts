import type { CaptionSegment } from "../shared/Captions";

/**
 * SemVer 教学视频 — 解说字幕数据
 *
 * 设计原则：
 * - 每段字幕不超过屏幕 70% 宽度（约 20 个汉字一行）
 * - 超出部分分段显示
 * - 正常语速约 4 字/秒，每段留 0.5 秒呼吸间隔
 * - fps = 30
 *
 * 时间轴说明：
 * startFrame 是相对于该场景内部的局部帧（Sequence 内 useCurrentFrame 从 0 开始）
 * 全局偏移在 index.tsx 的 Captions 层中通过 globalOffset 参数叠加
 */

// ============================================================
// 场景 1: Intro 开场（时长 180 帧 = 6 秒）
// ============================================================
export const introCaptions: CaptionSegment[] = [
  { text: "大家好，今天给大家介绍", startFrame: 45, durationFrames: 70 },
  { text: "SemVer 语义化版本号规范", startFrame: 115, durationFrames: 60 },
];

// ============================================================
// 场景 2: 版本号结构（时长 270 帧 = 9 秒）
// ============================================================
export const structureCaptions: CaptionSegment[] = [
  { text: "一个标准的语义化版本号", startFrame: 10, durationFrames: 65 },
  { text: "由三部分组成，用点号分隔", startFrame: 80, durationFrames: 65 },
  { text: "分别是主版本号、次版本号和修订号", startFrame: 150, durationFrames: 75 },
  { text: "也就是 MAJOR.MINOR.PATCH 这个格式", startFrame: 228, durationFrames: 42 },
];

// ============================================================
// 场景 3: MAJOR 主版本号（时长 300 帧 = 10 秒）
// ============================================================
export const majorCaptions: CaptionSegment[] = [
  { text: "第一位是主版本号", startFrame: 10, durationFrames: 55 },
  { text: "当你做了不兼容的 API 变更时", startFrame: 70, durationFrames: 65 },
  { text: "就需要递增主版本号", startFrame: 140, durationFrames: 55 },
  { text: "比如 React 从 17 升到 18", startFrame: 200, durationFrames: 55 },
  { text: "引入了并发渲染，这就是破坏性变更", startFrame: 258, durationFrames: 42 },
];

// ============================================================
// 场景 4: MINOR 次版本号（时长 270 帧 = 9 秒）
// ============================================================
export const minorCaptions: CaptionSegment[] = [
  { text: "第二位是次版本号", startFrame: 10, durationFrames: 55 },
  { text: "当你新增了功能但保持向后兼容时", startFrame: 70, durationFrames: 70 },
  { text: "就递增次版本号", startFrame: 145, durationFrames: 50 },
  { text: "旧代码完全不受影响，可以放心升级", startFrame: 200, durationFrames: 70 },
];

// ============================================================
// 场景 5: PATCH 修订号（时长 270 帧 = 9 秒）
// ============================================================
export const patchCaptions: CaptionSegment[] = [
  { text: "第三位是修订号，专门用来修复 Bug", startFrame: 10, durationFrames: 70 },
  { text: "不会添加任何新功能", startFrame: 85, durationFrames: 55 },
  { text: "你可以安全地升级，无需改动任何代码", startFrame: 145, durationFrames: 70 },
  { text: "就像图中这个除零错误的修复", startFrame: 220, durationFrames: 50 },
];

// ============================================================
// 场景 6: 预发布与构建元数据（时长 330 帧 = 11 秒）
// ============================================================
export const preReleaseCaptions: CaptionSegment[] = [
  { text: "除了三位数字，还有扩展标识符", startFrame: 10, durationFrames: 65 },
  { text: "通过连字符可以标记预发布版本", startFrame: 80, durationFrames: 65 },
  { text: "比如 alpha、beta、rc 这些标签", startFrame: 150, durationFrames: 65 },
  { text: "表示版本还不够稳定，不建议在生产环境使用", startFrame: 220, durationFrames: 75 },
  { text: "通过加号可以附加构建元数据", startFrame: 300, durationFrames: 30 },
];

// ============================================================
// 场景 7: 版本比较规则（时长 330 帧 = 11 秒）
// ============================================================
export const comparisonCaptions: CaptionSegment[] = [
  { text: "版本号之间怎么比较大小呢？", startFrame: 10, durationFrames: 60 },
  { text: "规则很简单：先比主版本号", startFrame: 75, durationFrames: 60 },
  { text: "主版本号相同再比次版本号", startFrame: 140, durationFrames: 60 },
  { text: "次版本号也相同就比修订号", startFrame: 205, durationFrames: 60 },
  { text: "预发布版本始终低于同号正式版", startFrame: 270, durationFrames: 60 },
];

// ============================================================
// 场景 8: 实际应用（时长 630 帧 = 21 秒，分两页）
// ============================================================
export const realWorldCaptions: CaptionSegment[] = [
  // 第一页：Changelog（0 ~ 330 帧）
  { text: "来看看实际项目中版本号是怎么用的", startFrame: 10, durationFrames: 70 },
  { text: "这是一个组件库的更新日志", startFrame: 85, durationFrames: 65 },
  { text: "1.30.0 新增了多个 feature", startFrame: 155, durationFrames: 65 },
  { text: "属于新增功能，所以递增次版本号 Y", startFrame: 225, durationFrames: 75 },
  { text: "而 1.29.6 只修复了一个 Bug", startFrame: 305, durationFrames: 25 },
  // 第二页：版本列表（330 ~ 630 帧）
  { text: "所以只递增修订号 Z", startFrame: 340, durationFrames: 60 },
  { text: "再看这个 npm 包的版本列表", startFrame: 405, durationFrames: 65 },
  { text: "从 0.x 到 1.x 是主版本号升级", startFrame: 475, durationFrames: 65 },
  { text: "代表 API 正式稳定，不再随意变更", startFrame: 545, durationFrames: 65 },
];

// ============================================================
// 场景 9: Outro 结尾（时长 210 帧 = 7 秒）
// ============================================================
export const outroCaptions: CaptionSegment[] = [
  { text: "掌握了 SemVer", startFrame: 10, durationFrames: 50 },
  { text: "你就能更好地管理项目依赖", startFrame: 65, durationFrames: 60 },
  { text: "合理地进行版本升级", startFrame: 130, durationFrames: 50 },
];
