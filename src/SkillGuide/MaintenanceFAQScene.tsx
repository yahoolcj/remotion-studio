import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});

const FAQS = [
  {
    q: "AI 仍然生成了 Element UI 组件？",
    a: "确认 Skill 已启用，尝试重启编辑器",
    color: "#f59e0b",
  },
  {
    q: "某个组件的用法不正确？",
    a: "运行 npm run sync:skill 重新同步",
    color: "#a855f7",
  },
  {
    q: "可以在其他 AI 工具中使用吗？",
    a: "支持任何兼容 Skill 规范的编辑器",
    color: "#22d3ee",
  },
];

export const MaintenanceFAQScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 200 }, delay: 5 });

  const terminalSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
    delay: 20,
  });

  const typingChars = "npm run sync:skill";
  const typedCount = Math.min(
    typingChars.length,
    Math.max(0, Math.floor((frame - 40) / 2)),
  );
  const typedText = typingChars.slice(0, typedCount);
  const cursorVisible = frame % 20 < 12;

  const faqTitleSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 110,
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        fontFamily,
        padding: "36px 60px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 20,
      }}
    >
      {/* 标题 */}
      <div
        style={{
          fontSize: 36,
          fontWeight: 900,
          color: "white",
          textAlign: "center",
          opacity: titleSpring,
          transform: `translateY(${interpolate(titleSpring, [0, 1], [25, 0])}px)`,
        }}
      >
        维护与常见问题
      </div>

      {/* 终端动画 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          opacity: terminalSpring,
          transform: `translateY(${interpolate(terminalSpring, [0, 1], [20, 0])}px)`,
        }}
      >
        <div
          style={{
            width: 520,
            borderRadius: 14,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {/* 终端标题栏 */}
          <div
            style={{
              height: 32,
              background: "rgba(255,255,255,0.06)",
              display: "flex",
              alignItems: "center",
              padding: "0 12px",
              gap: 6,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                background: "#ef4444",
              }}
            />
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                background: "#f59e0b",
              }}
            />
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                background: "#22c55e",
              }}
            />
            <div
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.3)",
                marginLeft: 8,
              }}
            >
              Terminal
            </div>
          </div>
          {/* 终端内容 */}
          <div
            style={{
              padding: "14px 16px",
              background: "rgba(0,0,0,0.4)",
              fontFamily: "'Courier New', monospace",
              fontSize: 15,
              color: "#22c55e",
              lineHeight: 1.8,
            }}
          >
            <span style={{ color: "#818cf8" }}>$</span> {typedText}
            {cursorVisible && (
              <span
                style={{
                  display: "inline-block",
                  width: 8,
                  height: 16,
                  background: "#22c55e",
                  marginLeft: 1,
                  verticalAlign: "middle",
                }}
              />
            )}
            {typedCount >= typingChars.length && (
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, marginTop: 4 }}>
                ✓ Skill 文档已同步更新
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FAQ 区域 */}
      <div
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: "rgba(255,255,255,0.7)",
          textAlign: "center",
          opacity: faqTitleSpring,
          marginTop: 4,
        }}
      >
        常见问题
      </div>

      <div
        style={{
          display: "flex",
          gap: 16,
          padding: "0 20px",
        }}
      >
        {FAQS.map((faq, i) => {
          const faqSpring = spring({
            frame,
            fps,
            config: { damping: 14, stiffness: 100 },
            delay: 125 + i * 22,
          });

          return (
            <div
              key={faq.q}
              style={{
                flex: 1,
                padding: "16px 18px",
                borderRadius: 14,
                background: "rgba(255,255,255,0.04)",
                border: `1.5px solid ${faq.color}30`,
                opacity: faqSpring,
                transform: `translateY(${interpolate(faqSpring, [0, 1], [20, 0])}px)`,
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: faq.color,
                  marginBottom: 8,
                }}
              >
                Q: {faq.q}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.4,
                }}
              >
                A: {faq.a}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
