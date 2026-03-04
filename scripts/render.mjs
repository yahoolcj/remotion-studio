#!/usr/bin/env node

/**
 * 动态渲染脚本 — 支持通过参数指定要渲染的 Composition
 *
 * 用法:
 *   pnpm render <CompositionId>            渲染指定视频到 public/videos/<id>.mp4
 *   pnpm render <id> --output path.mp4     指定输出路径
 *   pnpm render <id> --codec h264          指定编码格式
 *   pnpm render <id> --quality 80          指定 crf/quality
 *   pnpm render --list                     列出所有可用的 Composition
 *   pnpm render --all                      渲染全部视频
 *
 * 示例:
 *   pnpm render SkillGuide
 *   pnpm render SemVer --output ./my-video.mp4
 *   pnpm render HttpCache --codec h264 --quality 18
 *   pnpm render --all
 */

import { execSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const COMPOSITIONS = [
  "SemVer",
  "FnmGuide",
  "HttpCache",
  "CosmicEvolution",
  "SkillGuide",
];

const args = process.argv.slice(2);

function printHelp() {
  console.log(`
动态渲染脚本 — Remotion Video Renderer

用法:
  pnpm render <CompositionId> [options]

可用 Composition:
${COMPOSITIONS.map((c) => `  - ${c}`).join("\n")}

选项:
  --output, -o <path>   输出文件路径 (默认: public/videos/<id>.mp4)
  --codec <codec>       视频编码 (默认: h264, 可选: h264, h265, vp8, vp9, prores)
  --quality <crf>       质量/CRF 值 (编码相关, 越低质量越高)
  --scale <number>      缩放比例 (默认: 1)
  --list, -l            列出所有可用的 Composition
  --all                 渲染全部视频
  --help, -h            显示帮助信息

示例:
  pnpm render SkillGuide
  pnpm render SemVer --output ./my-video.mp4
  pnpm render HttpCache --codec h264 --quality 18
  pnpm render --all
`);
}

function parseArgs(args) {
  const result = { ids: [], options: {} };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    switch (arg) {
      case "--help":
      case "-h":
        result.options.help = true;
        break;
      case "--list":
      case "-l":
        result.options.list = true;
        break;
      case "--all":
        result.options.all = true;
        break;
      case "--output":
      case "-o":
        result.options.output = args[++i];
        break;
      case "--codec":
        result.options.codec = args[++i];
        break;
      case "--quality":
        result.options.quality = args[++i];
        break;
      case "--scale":
        result.options.scale = args[++i];
        break;
      default:
        if (!arg.startsWith("-")) {
          result.ids.push(arg);
        } else {
          console.error(`未知选项: ${arg}`);
          process.exit(1);
        }
    }
  }
  return result;
}

function renderComposition(id, options = {}) {
  if (!COMPOSITIONS.includes(id)) {
    const match = COMPOSITIONS.find(
      (c) => c.toLowerCase() === id.toLowerCase(),
    );
    if (match) {
      id = match;
    } else {
      console.error(
        `错误: 未找到 Composition "${id}"\n可用: ${COMPOSITIONS.join(", ")}`,
      );
      process.exit(1);
    }
  }

  const output = options.output || `public/videos/${id}.mp4`;

  const outputDir = dirname(output);
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  const cmdParts = ["remotion render", id, output];

  if (options.codec) cmdParts.push(`--codec ${options.codec}`);
  if (options.quality) cmdParts.push(`--crf ${options.quality}`);
  if (options.scale) cmdParts.push(`--scale ${options.scale}`);

  const cmd = cmdParts.join(" ");

  console.log(`\n🎬 渲染 ${id} → ${output}`);
  console.log(`   命令: ${cmd}\n`);

  try {
    execSync(cmd, { stdio: "inherit" });
    console.log(`\n✅ ${id} 渲染完成 → ${output}\n`);
  } catch {
    console.error(`\n❌ ${id} 渲染失败\n`);
    process.exit(1);
  }
}

const parsed = parseArgs(args);

if (parsed.options.help || (args.length === 0)) {
  printHelp();
  process.exit(0);
}

if (parsed.options.list) {
  console.log("\n可用的 Composition:\n");
  COMPOSITIONS.forEach((c) => console.log(`  - ${c}`));
  console.log();
  process.exit(0);
}

if (parsed.options.all) {
  console.log(`\n🎬 批量渲染全部 ${COMPOSITIONS.length} 个视频...\n`);
  for (const id of COMPOSITIONS) {
    renderComposition(id, {});
  }
  console.log(`\n🎉 全部 ${COMPOSITIONS.length} 个视频渲染完成！\n`);
  process.exit(0);
}

if (parsed.ids.length === 0) {
  console.error("错误: 请指定要渲染的 Composition ID\n");
  printHelp();
  process.exit(1);
}

for (const id of parsed.ids) {
  renderComposition(id, parsed.options);
}
