import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});

/**
 * 实际应用场景 — 分两页展示
 * 第一页 (0~pageBreak): Changelog 截图 — 展示什么时候升级 X/Y/Z
 * 第二页 (pageBreak~end): 版本列表截图 — 展示版本号在实际发布中的样子
 */

const PAGE_BREAK = 330; // 帧，前 11 秒展示第一页

export const RealWorldScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        fontFamily,
      }}
    >
      {/* 第一页：Changelog */}
      <Sequence from={0} durationInFrames={PAGE_BREAK} premountFor={30}>
        <ChangelogPage />
      </Sequence>

      {/* 第二页：版本列表 */}
      <Sequence from={PAGE_BREAK} premountFor={30}>
        <VersionListPage />
      </Sequence>
    </AbsoluteFill>
  );
};

// ========== 第一页：Changelog 截图 + 标注 ==========

const ChangelogPage: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 200 }, delay: 5 });
  const imgSpring = spring({ frame, fps, config: { damping: 15, stiffness: 100 }, delay: 15 });
  const badge1Spring = spring({ frame, fps, config: { damping: 200 }, delay: 50 });
  const badge2Spring = spring({ frame, fps, config: { damping: 200 }, delay: 75 });
  const ruleSpring = spring({ frame, fps, config: { damping: 200 }, delay: 100 });

  return (
    <AbsoluteFill
      style={{
        padding: "36px 50px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 40,
      }}
    >
      {/* 左侧：截图 */}
      <div
        style={{
          flex: "0 0 520",
          opacity: imgSpring,
          transform: `scale(${interpolate(imgSpring, [0, 1], [0.85, 1])})`,
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 16px 60px rgba(0,0,0,0.5)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Img
          src={staticFile("SemVer/changelog-example.png")}
          style={{ width: 520, display: "block" }}
        />
      </div>

      {/* 右侧：解说标注 */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {/* 标题 */}
        <div
          style={{
            fontSize: 34,
            fontWeight: 900,
            color: "white",
            opacity: titleSpring,
            transform: `translateY(${interpolate(titleSpring, [0, 1], [20, 0])}px)`,
            marginBottom: 8,
          }}
        >
          实际应用：更新日志
        </div>

        {/* MINOR 标注 */}
        <AnnotationCard
          springValue={badge1Spring}
          color="#a855f7"
          version="1.30.0"
          label="MINOR 升级"
          items={[
            "新增了多个 feature",
            "向后兼容，不影响旧功能",
            "PATCH 重置为 0",
          ]}
        />

        {/* PATCH 标注 */}
        <AnnotationCard
          springValue={badge2Spring}
          color="#ec4899"
          version="1.29.6"
          label="PATCH 升级"
          items={[
            "仅修复了一个 Bug",
            "Popover 组件 zIndex 属性问题",
            "安全升级，无破坏性变更",
          ]}
        />

        {/* 规则总结 */}
        <div
          style={{
            marginTop: 4,
            padding: "12px 18px",
            borderRadius: 12,
            background: "rgba(99,102,241,0.08)",
            border: "1px solid rgba(99,102,241,0.2)",
            opacity: ruleSpring,
            transform: `translateY(${interpolate(ruleSpring, [0, 1], [15, 0])}px)`,
          }}
        >
          <div style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
            <span style={{ color: "#a855f7", fontWeight: 700 }}>新增功能</span> → 升
            <span style={{ color: "#a855f7", fontWeight: 700 }}> Y</span>
            {"　"}
            <span style={{ color: "#ec4899", fontWeight: 700 }}>修复 Bug</span> → 升
            <span style={{ color: "#ec4899", fontWeight: 700 }}> Z</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ========== 第二页：版本列表截图 + 标注 ==========

const VersionListPage: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 200 }, delay: 5 });
  const imgSpring = spring({ frame, fps, config: { damping: 15, stiffness: 100 }, delay: 15 });
  const anno1 = spring({ frame, fps, config: { damping: 200 }, delay: 45 });
  const anno2 = spring({ frame, fps, config: { damping: 200 }, delay: 70 });
  const anno3 = spring({ frame, fps, config: { damping: 200 }, delay: 95 });
  const summarySpring = spring({ frame, fps, config: { damping: 200 }, delay: 120 });

  return (
    <AbsoluteFill
      style={{
        padding: "36px 50px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 40,
      }}
    >
      {/* 左侧：截图 */}
      <div
        style={{
          flex: "0 0 440",
          opacity: imgSpring,
          transform: `scale(${interpolate(imgSpring, [0, 1], [0.85, 1])})`,
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 16px 60px rgba(0,0,0,0.5)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Img
          src={staticFile("SemVer/versions-example.png")}
          style={{ width: 440, display: "block" }}
        />
      </div>

      {/* 右侧：解说 */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div
          style={{
            fontSize: 34,
            fontWeight: 900,
            color: "white",
            opacity: titleSpring,
            transform: `translateY(${interpolate(titleSpring, [0, 1], [20, 0])}px)`,
            marginBottom: 8,
          }}
        >
          实际应用：版本列表
        </div>

        {/* MAJOR 说明 */}
        <VersionRuleItem
          springValue={anno1}
          color="#6366f1"
          badge="X"
          title="0.x → 1.x 主版本号"
          desc="从初始开发阶段进入正式发布，API 趋于稳定"
        />

        {/* MINOR 说明 */}
        <VersionRuleItem
          springValue={anno2}
          color="#a855f7"
          badge="Y"
          title="1.0 → 1.1 → 1.2 → 1.3 → 1.4"
          desc="每次发布新功能递增次版本号，持续迭代"
        />

        {/* PATCH 说明 */}
        <VersionRuleItem
          springValue={anno3}
          color="#ec4899"
          badge="Z"
          title="1.2.0 → 1.2.1 → 1.2.2"
          desc="在同一次版本号下修复 Bug，递增修订号"
        />

        {/* 总结条 */}
        <div
          style={{
            marginTop: 8,
            padding: "14px 20px",
            borderRadius: 12,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            opacity: summarySpring,
            transform: `translateY(${interpolate(summarySpring, [0, 1], [15, 0])}px)`,
          }}
        >
          <div style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
            <span style={{ color: "#6366f1", fontWeight: 700 }}>破坏性变更</span> → 升
            <span style={{ color: "#6366f1", fontWeight: 700 }}> X</span>
            {"　"}
            <span style={{ color: "#a855f7", fontWeight: 700 }}>新增功能</span> → 升
            <span style={{ color: "#a855f7", fontWeight: 700 }}> Y</span>
            {"　"}
            <span style={{ color: "#ec4899", fontWeight: 700 }}>修复 Bug</span> → 升
            <span style={{ color: "#ec4899", fontWeight: 700 }}> Z</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ========== 子组件 ==========

const AnnotationCard: React.FC<{
  springValue: number;
  color: string;
  version: string;
  label: string;
  items: string[];
}> = ({ springValue, color, version, label, items }) => (
  <div
    style={{
      opacity: springValue,
      transform: `translateX(${interpolate(springValue, [0, 1], [25, 0])}px)`,
      display: "flex",
      gap: 14,
      alignItems: "flex-start",
    }}
  >
    {/* 版本号徽标 */}
    <div
      style={{
        flexShrink: 0,
        padding: "6px 14px",
        borderRadius: 10,
        background: `${color}22`,
        border: `1px solid ${color}44`,
        fontFamily: "'Courier New', monospace",
        fontSize: 16,
        fontWeight: 700,
        color,
      }}
    >
      {version}
    </div>

    <div>
      <div
        style={{
          fontSize: 18,
          fontWeight: 700,
          color,
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      {items.map((item) => (
        <div
          key={item}
          style={{
            fontSize: 14,
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.7,
            paddingLeft: 2,
          }}
        >
          · {item}
        </div>
      ))}
    </div>
  </div>
);

const VersionRuleItem: React.FC<{
  springValue: number;
  color: string;
  badge: string;
  title: string;
  desc: string;
}> = ({ springValue, color, badge, title, desc }) => (
  <div
    style={{
      opacity: springValue,
      transform: `translateX(${interpolate(springValue, [0, 1], [25, 0])}px)`,
      display: "flex",
      gap: 14,
      alignItems: "flex-start",
    }}
  >
    <div
      style={{
        width: 38,
        height: 38,
        borderRadius: 10,
        background: `${color}22`,
        border: `1px solid ${color}44`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 20,
        fontWeight: 900,
        color,
        flexShrink: 0,
      }}
    >
      {badge}
    </div>
    <div>
      <div
        style={{
          fontFamily: "'Courier New', monospace",
          fontSize: 16,
          fontWeight: 700,
          color: "rgba(255,255,255,0.85)",
          marginBottom: 2,
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>
        {desc}
      </div>
    </div>
  </div>
);
