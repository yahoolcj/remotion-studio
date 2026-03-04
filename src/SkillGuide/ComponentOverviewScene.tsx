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

const CATEGORIES = [
  {
    name: "基础组件",
    items: "Button, Icon, Tag, Avatar, Badge...",
    count: 9,
    color: "#6366f1",
  },
  {
    name: "表单组件",
    items: "Checkbox, Radio, Switch",
    count: 3,
    color: "#3b82f6",
  },
  {
    name: "数据展示",
    items: "Table, Pagination, Carousel, Image...",
    count: 10,
    color: "#a855f7",
  },
  {
    name: "反馈组件",
    items: "Modal, Drawer, Message, Loading...",
    count: 9,
    color: "#ec4899",
  },
  {
    name: "导航组件",
    items: "Menu, Tabs, Breadcrumb, NavTab...",
    count: 6,
    color: "#f59e0b",
  },
  {
    name: "布局组件",
    items: "Split, ResizeBox, Scrollbar",
    count: 3,
    color: "#22d3ee",
  },
  {
    name: "业务组件",
    items: "Map, Charts, Upload, Transfer...",
    count: 15,
    color: "#22c55e",
  },
];

export const ComponentOverviewScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 200 }, delay: 5 });

  const numberSpring = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 60 },
    delay: 18,
  });

  const numberValue = Math.round(interpolate(numberSpring, [0, 1], [0, 55]));

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        fontFamily,
        padding: "36px 50px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
      }}
    >
      {/* 标题 */}
      <div
        style={{
          fontSize: 36,
          fontWeight: 900,
          color: "white",
          opacity: titleSpring,
          transform: `translateY(${interpolate(titleSpring, [0, 1], [25, 0])}px)`,
        }}
      >
        内置组件一览
      </div>

      {/* 大数字 */}
      <div
        style={{
          fontSize: 72,
          fontWeight: 900,
          background: "linear-gradient(135deg, #6366f1, #a855f7, #ec4899)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          opacity: numberSpring,
          transform: `scale(${interpolate(numberSpring, [0, 1], [0.5, 1])})`,
        }}
      >
        {numberValue}
      </div>
      <div
        style={{
          fontSize: 16,
          color: "rgba(255,255,255,0.4)",
          marginTop: -8,
          opacity: numberSpring,
        }}
      >
        个内置组件，完整文档随用随查
      </div>

      {/* 分类标签 */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 12,
          marginTop: 12,
          maxWidth: 900,
        }}
      >
        {CATEGORIES.map((cat, i) => {
          const catSpring = spring({
            frame,
            fps,
            config: { damping: 12, stiffness: 80 },
            delay: 50 + i * 16,
          });

          return (
            <div
              key={cat.name}
              style={{
                padding: "12px 20px",
                borderRadius: 14,
                background: "rgba(255,255,255,0.04)",
                border: `1.5px solid ${cat.color}40`,
                display: "flex",
                flexDirection: "column",
                gap: 4,
                minWidth: 150,
                opacity: catSpring,
                transform: `translateY(${interpolate(catSpring, [0, 1], [20, 0])}px) scale(${interpolate(catSpring, [0, 1], [0.9, 1])})`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: cat.color,
                  }}
                >
                  {cat.name}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: cat.color,
                    padding: "1px 7px",
                    borderRadius: 6,
                    background: `${cat.color}18`,
                  }}
                >
                  {cat.count}
                </div>
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.35)",
                  lineHeight: 1.3,
                }}
              >
                {cat.items}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
