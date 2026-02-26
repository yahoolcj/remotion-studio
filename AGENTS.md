# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

This is a **Remotion** video project — a programmatic video creation app built with React/TypeScript. It contains 3 video compositions (SemVer, FnmGuide, CosmicEvolution) previewed via **Remotion Studio**.

### Commands

- `pnpm dev` — starts Remotion Studio dev server on port 3000
- `pnpm build` — bundles the project (output in `build/`)
- `pnpm lint` — runs `eslint src && tsc` (note: there are pre-existing lint errors in the repo)

### Gotchas

- **esbuild postinstall**: pnpm may skip the esbuild postinstall script due to build approval policy. After `pnpm install`, run `pnpm rebuild esbuild` to ensure the platform-specific binary is downloaded. Without this, Remotion bundling/dev server will fail.
- **WebGL in cloud VMs**: The CosmicEvolution composition uses Three.js/WebGL. In GPU-less cloud environments, Chrome must be launched with `--use-angle=swiftshader-webgl --disable-gpu-sandbox --no-sandbox` for software rendering. 3D-heavy scenes may render slowly or with visual artifacts under software WebGL.
- **zod version mismatch warning**: Remotion warns about zod 4.x vs expected 3.22.3 at build time. This is cosmetic and does not block bundling or dev server.
- **`build/` directory**: Not in `.gitignore` — avoid committing it.
