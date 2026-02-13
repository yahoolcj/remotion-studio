import type { CaptionSegment } from "../shared/Captions";

/**
 * fnm Node 版本管理教程 — 解说字幕数据
 *
 * 设计原则：
 * - 每段字幕不超过屏幕 70% 宽度（约 20 个汉字一行）
 * - 超出部分分段显示
 * - 正常语速约 4 字/秒，每段留 0.5 秒呼吸间隔
 * - fps = 30
 *
 * startFrame 是相对于该场景内部的局部帧
 * 全局偏移在 index.tsx 的 buildGlobalCaptions 中叠加
 */

// ============================================================
// 场景 1: Intro 开场（时长 180 帧 = 6 秒）
// ============================================================
export const introCaptions: CaptionSegment[] = [
  { text: "大家好，今天教大家", startFrame: 45, durationFrames: 60 },
  { text: "如何同时使用不同的 Node 版本", startFrame: 110, durationFrames: 65 },
];

// ============================================================
// 场景 2: 痛点引入 — nvm 的困境（时长 270 帧 = 9 秒）
// ============================================================
export const painPointCaptions: CaptionSegment[] = [
  { text: "传统的 nvm 只能设置全局 Node 版本", startFrame: 10, durationFrames: 65 },
  { text: "切换版本后，所有终端都会受到影响", startFrame: 80, durationFrames: 65 },
  { text: "当你同时运行两个不同版本的项目时", startFrame: 150, durationFrames: 60 },
  { text: "nvm 无法做到项目级的 Node 控制", startFrame: 215, durationFrames: 50 },
];

// ============================================================
// 场景 3: 什么是 fnm（时长 240 帧 = 8 秒）
// ============================================================
export const whatIsFnmCaptions: CaptionSegment[] = [
  { text: "fnm 就是为了解决这个问题而生的", startFrame: 10, durationFrames: 65 },
  { text: "它能实现项目级的 Node 版本控制", startFrame: 80, durationFrames: 65 },
  { text: "每个项目用自己的版本，互不干扰", startFrame: 150, durationFrames: 65 },
];

// ============================================================
// 场景 4: 安装 fnm（时长 300 帧 = 10 秒）
// ============================================================
export const installCaptions: CaptionSegment[] = [
  { text: "安装 fnm 非常简单", startFrame: 10, durationFrames: 55 },
  { text: "Windows 用 winget，Mac 用 Homebrew", startFrame: 70, durationFrames: 65 },
  { text: "安装后别忘了配置 Shell 环境", startFrame: 140, durationFrames: 60 },
  { text: "把初始化命令加到你的 Shell 配置文件中", startFrame: 205, durationFrames: 70 },
];

// ============================================================
// 场景 5: 核心命令 — nvm→fnm 迁移（时长 300 帧 = 10 秒）
// ============================================================
export const commandsCaptions: CaptionSegment[] = [
  { text: "如果你之前用过 nvm，迁移非常简单", startFrame: 10, durationFrames: 65 },
  { text: "命令几乎完全一致", startFrame: 80, durationFrames: 55 },
  { text: "只需要把 nvm 替换成 fnm 就行", startFrame: 140, durationFrames: 65 },
  { text: "fnm list 查看版本，fnm default 设置默认", startFrame: 210, durationFrames: 70 },
];

// ============================================================
// 场景 6: 项目级自动切换（时长 300 帧 = 10 秒）
// ============================================================
export const autoSwitchCaptions: CaptionSegment[] = [
  { text: "最强大的功能是项目级自动切换", startFrame: 10, durationFrames: 60 },
  { text: "在项目根目录放一个 .nvmrc 文件", startFrame: 75, durationFrames: 65 },
  { text: "写入需要的 Node 版本号", startFrame: 145, durationFrames: 55 },
  { text: "进入目录时 fnm 就会自动切换", startFrame: 205, durationFrames: 65 },
];

// ============================================================
// 场景 7: 实战演示 — 双终端（时长 330 帧 = 11 秒）
// ============================================================
export const dualTermCaptions: CaptionSegment[] = [
  { text: "实际开发中你可以打开两个终端", startFrame: 10, durationFrames: 60 },
  { text: "每个终端进入不同的项目目录", startFrame: 75, durationFrames: 60 },
  { text: "fnm 会自动切换到正确的版本", startFrame: 140, durationFrames: 60 },
  { text: "两个项目同时开发，互不干扰", startFrame: 205, durationFrames: 65 },
];

// ============================================================
// 场景 8: 速查表 nvm→fnm（时长 270 帧 = 9 秒）
// ============================================================
export const cheatSheetCaptions: CaptionSegment[] = [
  { text: "最后分享几个常用技巧", startFrame: 10, durationFrames: 55 },
  { text: "install --lts 直接安装长期支持版", startFrame: 70, durationFrames: 65 },
  { text: "不用的版本可以随时卸载释放空间", startFrame: 140, durationFrames: 65 },
  { text: "项目配置文件能锁定团队统一的版本", startFrame: 210, durationFrames: 50 },
];

// ============================================================
// 场景 9: Outro 结尾（时长 210 帧 = 7 秒）
// ============================================================
export const outroCaptions: CaptionSegment[] = [
  { text: "用好 fnm", startFrame: 10, durationFrames: 50 },
  { text: "多版本 Node 管理再也不是烦恼", startFrame: 65, durationFrames: 65 },
];
