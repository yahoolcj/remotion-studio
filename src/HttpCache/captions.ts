import type { CaptionSegment } from "../shared/Captions";

/**
 * HTTP 缓存机制教程 — 解说字幕数据
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
  { text: "大家好，今天来聊一个重要的话题", startFrame: 45, durationFrames: 60 },
  { text: "HTTP 缓存机制", startFrame: 110, durationFrames: 65 },
];

// ============================================================
// 场景 2: WhyCache — 为什么需要缓存（时长 270 帧 = 9 秒）
// ============================================================
export const whyCacheCaptions: CaptionSegment[] = [
  { text: "每次打开网页，浏览器都要向服务器请求资源", startFrame: 10, durationFrames: 65 },
  { text: "如果没有缓存，相同的文件会被反复下载", startFrame: 80, durationFrames: 65 },
  { text: "这不仅浪费带宽，还让页面加载变慢", startFrame: 150, durationFrames: 65 },
];

// ============================================================
// 场景 3: CacheOverview — 缓存总览（时长 270 帧 = 9 秒）
// ============================================================
export const cacheOverviewCaptions: CaptionSegment[] = [
  { text: "HTTP 缓存分为两大类", startFrame: 10, durationFrames: 60 },
  { text: "强缓存：直接使用本地副本，不问服务器", startFrame: 75, durationFrames: 65 },
  { text: "协商缓存：先问服务器，资源没变就用本地的", startFrame: 145, durationFrames: 70 },
];

// ============================================================
// 场景 4: CacheControl — Cache-Control 指令（时长 360 帧 = 12 秒）
// ============================================================
export const cacheControlCaptions: CaptionSegment[] = [
  { text: "Cache-Control 是最重要的缓存头", startFrame: 10, durationFrames: 60 },
  { text: "max-age 指定缓存有效期，单位是秒", startFrame: 75, durationFrames: 65 },
  { text: "no-cache 不是不缓存，而是每次都要协商验证", startFrame: 145, durationFrames: 70 },
  { text: "no-store 才是真正的不缓存", startFrame: 220, durationFrames: 60 },
  { text: "public 和 private 控制谁可以缓存", startFrame: 285, durationFrames: 60 },
];

// ============================================================
// 场景 5: ExpiresVsMaxAge — 对比（时长 270 帧 = 9 秒）
// ============================================================
export const expiresVsMaxAgeCaptions: CaptionSegment[] = [
  { text: "Expires 用绝对时间，容易因时钟不同步出问题", startFrame: 10, durationFrames: 70 },
  { text: "max-age 用相对秒数，更可靠", startFrame: 85, durationFrames: 60 },
  { text: "两者同时存在时，max-age 优先", startFrame: 150, durationFrames: 65 },
];

// ============================================================
// 场景 6: ETag — 协商缓存之 ETag（时长 360 帧 = 12 秒）
// ============================================================
export const etagCaptions: CaptionSegment[] = [
  { text: "服务器给资源一个唯一指纹，叫 ETag", startFrame: 10, durationFrames: 65 },
  { text: "浏览器下次请求时带上 If-None-Match", startFrame: 80, durationFrames: 65 },
  { text: "服务器比对指纹，没变就返回 304", startFrame: 150, durationFrames: 65 },
  { text: "304 表示「未修改」，不传内容，节省带宽", startFrame: 220, durationFrames: 70 },
];

// ============================================================
// 场景 7: LastModified — 协商缓存之时间戳（时长 270 帧 = 9 秒）
// ============================================================
export const lastModifiedCaptions: CaptionSegment[] = [
  { text: "Last-Modified 记录资源的最后修改时间", startFrame: 10, durationFrames: 65 },
  { text: "浏览器用 If-Modified-Since 询问是否有更新", startFrame: 80, durationFrames: 70 },
  { text: "缺点是精度只到秒，且某些场景不够准确", startFrame: 155, durationFrames: 65 },
];

// ============================================================
// 场景 8: DecisionTree — 完整决策流程（时长 360 帧 = 12 秒）
// ============================================================
export const decisionTreeCaptions: CaptionSegment[] = [
  { text: "完整的缓存判断流程是这样的", startFrame: 10, durationFrames: 60 },
  { text: "先看强缓存是否命中", startFrame: 75, durationFrames: 55 },
  { text: "没命中就走协商缓存", startFrame: 135, durationFrames: 55 },
  { text: "协商通过返回 304，否则返回 200 和新资源", startFrame: 195, durationFrames: 75 },
];

// ============================================================
// 场景 9: BestPractice — 最佳实践（时长 270 帧 = 9 秒）
// ============================================================
export const bestPracticeCaptions: CaptionSegment[] = [
  { text: "HTML 文件用 no-cache，保证总能获取最新版", startFrame: 10, durationFrames: 65 },
  { text: "JS 和 CSS 用长期缓存加文件名哈希", startFrame: 80, durationFrames: 65 },
  { text: "API 响应根据业务需求选择策略", startFrame: 150, durationFrames: 65 },
];

// ============================================================
// 场景 10: Outro 结尾（时长 210 帧 = 7 秒）
// ============================================================
export const outroCaptions: CaptionSegment[] = [
  { text: "掌握 HTTP 缓存", startFrame: 10, durationFrames: 50 },
  { text: "让你的网站又快又省", startFrame: 65, durationFrames: 65 },
];
