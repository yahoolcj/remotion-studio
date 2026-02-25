import type { CaptionSegment } from "../shared/Captions";

/**
 * 宇宙演化教学视频 — 解说字幕数据
 *
 * fps = 30, 正常语速约 4 字/秒
 * startFrame 是场景内局部帧
 */

// ============================================================
// 场景 1: Intro 开场（180 帧 = 6 秒）
// ============================================================
export const introCaptions: CaptionSegment[] = [
  { text: "大家好，今天带大家了解", startFrame: 45, durationFrames: 60 },
  { text: "从奇点到星辰的宇宙演化历程", startFrame: 110, durationFrames: 65 },
];

// ============================================================
// 场景 2: 奇点与大爆炸（360 帧 = 12 秒）
// ============================================================
export const bigBangCaptions: CaptionSegment[] = [
  { text: "138 亿年前", startFrame: 10, durationFrames: 50 },
  { text: "整个宇宙被压缩在一个无限小的奇点中", startFrame: 65, durationFrames: 70 },
  { text: "大爆炸发生了", startFrame: 140, durationFrames: 50 },
  { text: "时间、空间、物质在一瞬间诞生", startFrame: 195, durationFrames: 65 },
  { text: "这是一切的起点", startFrame: 265, durationFrames: 55 },
];

// ============================================================
// 场景 3: 暴胀时期（300 帧 = 10 秒）
// ============================================================
export const inflationCaptions: CaptionSegment[] = [
  { text: "在诞生后的一万亿分之一秒内", startFrame: 10, durationFrames: 65 },
  { text: "宇宙发生了指数级膨胀", startFrame: 80, durationFrames: 60 },
  { text: "体积扩大了至少 10 的 26 次方倍", startFrame: 145, durationFrames: 70 },
  { text: "这就是宇宙暴胀", startFrame: 220, durationFrames: 55 },
];

// ============================================================
// 场景 4: 粒子汤（300 帧 = 10 秒）
// ============================================================
export const particleSoupCaptions: CaptionSegment[] = [
  { text: "此时的宇宙是一锅极高温的粒子汤", startFrame: 10, durationFrames: 65 },
  { text: "夸克和胶子还无法结合", startFrame: 80, durationFrames: 55 },
  { text: "随着温度逐渐下降", startFrame: 140, durationFrames: 50 },
  { text: "质子和中子开始形成", startFrame: 195, durationFrames: 60 },
];

// ============================================================
// 场景 5: 核合成与原子诞生（300 帧 = 10 秒）
// ============================================================
export const nucleosynthesisCaptions: CaptionSegment[] = [
  { text: "大爆炸后仅 3 分钟", startFrame: 10, durationFrames: 55 },
  { text: "氢核和氦核在核合成中诞生", startFrame: 70, durationFrames: 65 },
  { text: "38 万年后，电子被原子核俘获", startFrame: 140, durationFrames: 65 },
  { text: "宇宙变得透明，光子得以自由传播", startFrame: 210, durationFrames: 70 },
];

// ============================================================
// 场景 6: 宇宙微波背景辐射（300 帧 = 10 秒）
// ============================================================
export const cmbCaptions: CaptionSegment[] = [
  { text: "这是宇宙的第一张照片", startFrame: 10, durationFrames: 55 },
  { text: "宇宙微波背景辐射", startFrame: 70, durationFrames: 55 },
  { text: "记录了 38 万年前宇宙的温度波动", startFrame: 130, durationFrames: 65 },
  { text: "这些微小的波动就是未来星系的种子", startFrame: 200, durationFrames: 70 },
];

// ============================================================
// 场景 7: 暗黑时代与第一颗恒星（360 帧 = 12 秒）
// ============================================================
export const darkAgeCaptions: CaptionSegment[] = [
  { text: "之后宇宙陷入了漫长的黑暗", startFrame: 10, durationFrames: 60 },
  { text: "没有恒星，没有光源", startFrame: 75, durationFrames: 55 },
  { text: "持续了将近一亿年", startFrame: 135, durationFrames: 55 },
  { text: "直到第一批恒星在引力坍缩中点燃", startFrame: 195, durationFrames: 70 },
  { text: "黑暗终于被打破", startFrame: 270, durationFrames: 55 },
];

// ============================================================
// 场景 8: 星系形成（360 帧 = 12 秒）
// ============================================================
export const galaxyCaptions: CaptionSegment[] = [
  { text: "恒星在引力作用下聚集", startFrame: 10, durationFrames: 55 },
  { text: "形成了最初的星系", startFrame: 70, durationFrames: 55 },
  { text: "这是哈勃望远镜拍摄的深空场照片", startFrame: 130, durationFrames: 70 },
  { text: "每一个光点都是一个遥远的星系", startFrame: 205, durationFrames: 65 },
  { text: "数千亿颗恒星组成一个星系", startFrame: 275, durationFrames: 60 },
];

// ============================================================
// 场景 9: 太阳系与地球（360 帧 = 12 秒）
// ============================================================
export const solarSystemCaptions: CaptionSegment[] = [
  { text: "46 亿年前", startFrame: 10, durationFrames: 45 },
  { text: "一片巨大的分子云开始坍缩", startFrame: 60, durationFrames: 60 },
  { text: "中心形成了太阳", startFrame: 125, durationFrames: 55 },
  { text: "周围的碎片逐渐聚合为行星", startFrame: 185, durationFrames: 65 },
  { text: "其中一颗蓝色的岩石行星就是地球", startFrame: 255, durationFrames: 70 },
];

// ============================================================
// 场景 10: 现代宇宙（300 帧 = 10 秒）
// ============================================================
export const modernUniverseCaptions: CaptionSegment[] = [
  { text: "今天的宇宙拥有数千亿个星系", startFrame: 10, durationFrames: 65 },
  { text: "它们通过暗物质丝线相互连接", startFrame: 80, durationFrames: 65 },
  { text: "组成壮观的宇宙纤维结构", startFrame: 150, durationFrames: 60 },
  { text: "而宇宙仍在加速膨胀", startFrame: 215, durationFrames: 60 },
];

// ============================================================
// 场景 11: 时间轴总览（240 帧 = 8 秒）
// ============================================================
export const timelineCaptions: CaptionSegment[] = [
  { text: "从大爆炸到今天", startFrame: 10, durationFrames: 55 },
  { text: "138 亿年的壮阔历程", startFrame: 70, durationFrames: 60 },
  { text: "浓缩在这条时间轴上", startFrame: 135, durationFrames: 55 },
];

// ============================================================
// 场景 12: Outro 结尾（210 帧 = 7 秒）
// ============================================================
export const outroCaptions: CaptionSegment[] = [
  { text: "宇宙的故事还在继续", startFrame: 10, durationFrames: 55 },
  { text: "而我们就是星尘", startFrame: 70, durationFrames: 55 },
];
