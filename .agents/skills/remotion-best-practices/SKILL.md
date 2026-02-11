---
name: remotion-best-practices
description: Best practices for Remotion - Video creation in React
metadata:
  tags: remotion, video, react, animation, composition
---

## When to use

Use this skills whenever you are dealing with Remotion code to obtain the domain-specific knowledge.

## Captions

When dealing with captions or subtitles, load the [./rules/subtitles.md](./rules/subtitles.md) file for more information.

## Using FFmpeg

For some video operations, such as trimming videos or detecting silence, FFmpeg should be used. Load the [./rules/ffmpeg.md](./rules/ffmpeg.md) file for more information.

## Audio visualization

When needing to visualize audio (spectrum bars, waveforms, bass-reactive effects), load the [./rules/audio-visualization.md](./rules/audio-visualization.md) file for more information.

## 视频开头和结尾规范

所有教学/解说视频**必须**使用统一的开场（Intro）和结尾（Outro）组件，位于 `src/shared/` 目录。

### 开场组件 `<Intro>`

- 文件：`src/shared/Intro.tsx`
- 署名 **"花蛤豆腐汤"** 自动展示，无需传入
- 通过 `title` prop 传入当前视频的大标题（每个视频不同）
- 推荐时长：**120 帧**（4 秒 @30fps）

```tsx
import { Intro } from "../shared/Intro";

<TransitionSeries.Sequence durationInFrames={120}>
  <Intro title="你的视频标题" />
</TransitionSeries.Sequence>
```

**Props 类型：**

```tsx
type IntroProps = {
  title: string; // 必填，视频大标题
};
```

### 结尾组件 `<Outro>`

- 文件：`src/shared/Outro.tsx`
- 自动展示 **"谢谢观看"** 和署名 **"花蛤豆腐汤"**
- 通过 `summaryPoints` prop 传入总结要点（可选，不传则只显示谢谢观看）
- 推荐时长：无总结时 **90 帧**（3 秒），有总结时 **150 帧**（5 秒）@30fps

```tsx
import { Outro } from "../shared/Outro";

// 带总结
<TransitionSeries.Sequence durationInFrames={150}>
  <Outro summaryPoints={["要点一", "要点二", "要点三"]} />
</TransitionSeries.Sequence>

// 不带总结
<TransitionSeries.Sequence durationInFrames={90}>
  <Outro />
</TransitionSeries.Sequence>
```

**Props 类型：**

```tsx
type OutroProps = {
  summaryPoints?: string[]; // 可选，总结要点列表
};
```

### 新建视频时的标准结构

```tsx
<TransitionSeries>
  {/* 1. 通用开场 — 必须放在第一个 */}
  <TransitionSeries.Sequence durationInFrames={120}>
    <Intro title="视频标题" />
  </TransitionSeries.Sequence>

  <TransitionSeries.Transition ... />

  {/* 2. 正文场景 */}
  <TransitionSeries.Sequence durationInFrames={...}>
    <YourScene />
  </TransitionSeries.Sequence>

  <TransitionSeries.Transition ... />

  {/* N. 通用结尾 — 必须放在最后 */}
  <TransitionSeries.Sequence durationInFrames={150}>
    <Outro summaryPoints={[...]} />
  </TransitionSeries.Sequence>
</TransitionSeries>
```

## How to use

Read individual rule files for detailed explanations and code examples:

- [rules/3d.md](rules/3d.md) - 3D content in Remotion using Three.js and React Three Fiber
- [rules/animations.md](rules/animations.md) - Fundamental animation skills for Remotion
- [rules/assets.md](rules/assets.md) - Importing images, videos, audio, and fonts into Remotion
- [rules/audio.md](rules/audio.md) - Using audio and sound in Remotion - importing, trimming, volume, speed, pitch
- [rules/calculate-metadata.md](rules/calculate-metadata.md) - Dynamically set composition duration, dimensions, and props
- [rules/can-decode.md](rules/can-decode.md) - Check if a video can be decoded by the browser using Mediabunny
- [rules/charts.md](rules/charts.md) - Chart and data visualization patterns for Remotion (bar, pie, line, stock charts)
- [rules/compositions.md](rules/compositions.md) - Defining compositions, stills, folders, default props and dynamic metadata
- [rules/extract-frames.md](rules/extract-frames.md) - Extract frames from videos at specific timestamps using Mediabunny
- [rules/fonts.md](rules/fonts.md) - Loading Google Fonts and local fonts in Remotion
- [rules/get-audio-duration.md](rules/get-audio-duration.md) - Getting the duration of an audio file in seconds with Mediabunny
- [rules/get-video-dimensions.md](rules/get-video-dimensions.md) - Getting the width and height of a video file with Mediabunny
- [rules/get-video-duration.md](rules/get-video-duration.md) - Getting the duration of a video file in seconds with Mediabunny
- [rules/gifs.md](rules/gifs.md) - Displaying GIFs synchronized with Remotion's timeline
- [rules/images.md](rules/images.md) - Embedding images in Remotion using the Img component
- [rules/light-leaks.md](rules/light-leaks.md) - Light leak overlay effects using @remotion/light-leaks
- [rules/lottie.md](rules/lottie.md) - Embedding Lottie animations in Remotion
- [rules/measuring-dom-nodes.md](rules/measuring-dom-nodes.md) - Measuring DOM element dimensions in Remotion
- [rules/measuring-text.md](rules/measuring-text.md) - Measuring text dimensions, fitting text to containers, and checking overflow
- [rules/sequencing.md](rules/sequencing.md) - Sequencing patterns for Remotion - delay, trim, limit duration of items
- [rules/tailwind.md](rules/tailwind.md) - Using TailwindCSS in Remotion
- [rules/text-animations.md](rules/text-animations.md) - Typography and text animation patterns for Remotion
- [rules/timing.md](rules/timing.md) - Interpolation curves in Remotion - linear, easing, spring animations
- [rules/transitions.md](rules/transitions.md) - Scene transition patterns for Remotion
- [rules/transparent-videos.md](rules/transparent-videos.md) - Rendering out a video with transparency
- [rules/trimming.md](rules/trimming.md) - Trimming patterns for Remotion - cut the beginning or end of animations
- [rules/videos.md](rules/videos.md) - Embedding videos in Remotion - trimming, volume, speed, looping, pitch
- [rules/parameters.md](rules/parameters.md) - Make a video parametrizable by adding a Zod schema
- [rules/maps.md](rules/maps.md) - Add a map using Mapbox and animate it
