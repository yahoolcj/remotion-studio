import type { CaptionSegment } from "../shared/Captions";

/**
 * z1-design-dev Skill 介绍视频 — 解说字幕数据
 *
 * 每段字幕 ≤ 20 字，语速约 4 字/秒，段间留约 0.5 秒
 * fps = 30
 * startFrame 为场景内局部帧
 */

// ============================================================
// 场景 1: Intro 开场（时长 180 帧 = 6 秒）
// ============================================================
export const introCaptions: CaptionSegment[] = [
  { text: "大家好，今天介绍一个实用工具", startFrame: 45, durationFrames: 60 },
  { text: "z1-design-dev Skill", startFrame: 110, durationFrames: 65 },
];

// ============================================================
// 场景 2: WhatIsSkill（时长 300 帧 = 10 秒）
// ============================================================
export const whatIsSkillCaptions: CaptionSegment[] = [
  { text: "Agent Skills 是 Anthropic 提出的", startFrame: 10, durationFrames: 60 },
  { text: "一种模块化能力扩展规范", startFrame: 75, durationFrames: 55 },
  { text: "它采用渐进式加载机制", startFrame: 135, durationFrames: 55 },
  { text: "安装多个 Skill 几乎不消耗额外上下文", startFrame: 195, durationFrames: 65 },
];

// ============================================================
// 场景 3: WhatIsZ1Design（时长 270 帧 = 9 秒）
// ============================================================
export const whatIsZ1DesignCaptions: CaptionSegment[] = [
  { text: "z1-design-dev 专为 z1-design 组件库打造", startFrame: 10, durationFrames: 65 },
  { text: "安装后 AI 会优先使用 z1-design 组件", startFrame: 80, durationFrames: 65 },
  { text: "熟悉全部 55 个组件的用法", startFrame: 150, durationFrames: 60 },
];

// ============================================================
// 场景 4: EditorSupport（时长 240 帧 = 8 秒）
// ============================================================
export const editorSupportCaptions: CaptionSegment[] = [
  { text: "它遵循 Anthropic 的 Skill 标准", startFrame: 10, durationFrames: 60 },
  { text: "支持 Cursor、Trae、Claude Code 等编辑器", startFrame: 75, durationFrames: 70 },
  { text: "VS Code 需搭配 AI 插件使用", startFrame: 150, durationFrames: 60 },
];

// ============================================================
// 场景 5: InstallGuide（时长 270 帧 = 9 秒）
// ============================================================
export const installGuideCaptions: CaptionSegment[] = [
  { text: "安装只需三步", startFrame: 10, durationFrames: 45 },
  { text: "下载压缩包，解压后放入 skills 目录", startFrame: 60, durationFrames: 70 },
  { text: "最新版本是 v1.0.3", startFrame: 135, durationFrames: 55 },
  { text: "不同编辑器的导入方式略有差异", startFrame: 195, durationFrames: 60 },
];

// ============================================================
// 场景 6: UsageDevPage（时长 300 帧 = 10 秒）
// ============================================================
export const usageDevPageCaptions: CaptionSegment[] = [
  { text: "第一个场景是开发页面", startFrame: 10, durationFrames: 55 },
  { text: "告诉 AI 你要什么页面", startFrame: 70, durationFrames: 55 },
  { text: "它会自动使用 z1-design 组件", startFrame: 130, durationFrames: 60 },
  { text: "生成标准的 Vue 代码", startFrame: 195, durationFrames: 55 },
];

// ============================================================
// 场景 7: UsageQueryMigrate（时长 300 帧 = 10 秒）
// ============================================================
export const usageQueryMigrateCaptions: CaptionSegment[] = [
  { text: "第二个场景是查询组件用法", startFrame: 10, durationFrames: 60 },
  { text: "不确定怎么用时，直接问 AI", startFrame: 75, durationFrames: 60 },
  { text: "第三个场景是迁移旧代码", startFrame: 140, durationFrames: 60 },
  { text: "Element UI 组件自动替换为 z1-design", startFrame: 205, durationFrames: 65 },
];

// ============================================================
// 场景 8: ComponentOverview（时长 330 帧 = 11 秒）
// ============================================================
export const componentOverviewCaptions: CaptionSegment[] = [
  { text: "Skill 内置了 55 个组件的完整文档", startFrame: 10, durationFrames: 65 },
  { text: "涵盖基础、表单、数据展示等七大分类", startFrame: 80, durationFrames: 65 },
  { text: "每个组件都有属性、事件、插槽的说明", startFrame: 150, durationFrames: 65 },
  { text: "还包含代码示例，随用随查", startFrame: 220, durationFrames: 60 },
];

// ============================================================
// 场景 9: MaintenanceFAQ（时长 270 帧 = 9 秒）
// ============================================================
export const maintenanceFAQCaptions: CaptionSegment[] = [
  { text: "组件库更新后运行同步命令即可", startFrame: 10, durationFrames: 60 },
  { text: "npm run sync:skill 保持文档最新", startFrame: 75, durationFrames: 60 },
  { text: "遇到问题先检查 Skill 是否启用", startFrame: 140, durationFrames: 60 },
  { text: "重启编辑器后重新对话试试", startFrame: 205, durationFrames: 55 },
];

// ============================================================
// 场景 10: Outro 结尾（时长 210 帧 = 7 秒）
// ============================================================
export const outroCaptions: CaptionSegment[] = [
  { text: "以上就是 z1-design-dev Skill 的介绍", startFrame: 30, durationFrames: 65 },
  { text: "赶快安装试试吧", startFrame: 100, durationFrames: 50 },
];
