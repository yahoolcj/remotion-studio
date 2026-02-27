/**
 * build-site.mjs
 *
 * 构建可部署的静态站点：
 * 1. 将 public/ 目录复制到 dist/
 * 2. 将 out/videos/ 中已渲染的视频复制到 dist/videos/
 *
 * 使用方式：
 *   pnpm render:all       # 先渲染视频（本地执行）
 *   pnpm build:site       # 再构建站点
 *   # 然后部署 dist/ 目录到 Vercel / Netlify / 任意静态托管
 */

import { cpSync, mkdirSync, existsSync, readdirSync } from "fs";
import { join } from "path";

const ROOT = process.cwd();
const DIST = join(ROOT, "dist");
const PUBLIC = join(ROOT, "public");
const VIDEOS_SRC = join(ROOT, "out", "videos");
const VIDEOS_DEST = join(DIST, "videos");

console.log("🔨 Building site...\n");

// 1. 清理并创建 dist
mkdirSync(DIST, { recursive: true });

// 2. 复制 public/ → dist/
if (existsSync(PUBLIC)) {
  cpSync(PUBLIC, DIST, { recursive: true });
  console.log("✅ Copied public/ → dist/");
} else {
  console.error("❌ public/ directory not found");
  process.exit(1);
}

// 3. 复制渲染好的视频
mkdirSync(VIDEOS_DEST, { recursive: true });

if (existsSync(VIDEOS_SRC)) {
  const files = readdirSync(VIDEOS_SRC).filter((f) => f.endsWith(".mp4"));
  for (const file of files) {
    cpSync(join(VIDEOS_SRC, file), join(VIDEOS_DEST, file));
    console.log(`✅ Copied video: ${file}`);
  }
  if (files.length === 0) {
    console.log("⚠️  No .mp4 files found in out/videos/");
    console.log('   Run "pnpm render:all" first to generate videos');
  }
} else {
  console.log("⚠️  out/videos/ not found — no videos will be included");
  console.log('   Run "pnpm render:all" first to generate videos');
}

console.log("\n✨ Site built to dist/");
console.log("   Deploy the dist/ directory to Vercel, Netlify, or any static host");
