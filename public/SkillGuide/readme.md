<Auchor></Auchor>

# z1-design-dev

## 什么是 Skills？

[Agent Skills](https://docs.anthropic.com/en/docs/agents-and-tools/agent-skills/overview) 是由 Anthropic 提出的一种**模块化能力扩展规范**。每个 Skill 将指令、元数据和可选资源（脚本、模板、参考文档等）打包为一个独立的目录，AI 编程助手会在对话过程中**按需自动加载**相关内容，而非一次性消耗大量上下文。

::: tip 核心机制 —— 渐进式加载（Progressive Disclosure）
Skill 包含三层内容，按需逐层加载：
1. **元数据**（始终加载）：Skill 名称和描述，仅占约 100 tokens，用于让 AI 判断何时触发
2. **指令**（触发时加载）：SKILL.md 主体，包含工作流、最佳实践和操作指南
3. **资源**（按需加载）：参考文档、脚本、模板等，仅在被引用时才进入上下文窗口

这意味着你可以安装多个 Skill 而几乎不会产生额外的上下文开销。
:::

`z1-design-dev` 是基于此规范、专为 z1-design 组件库打造的 Skill，安装后 AI 将：

- **优先使用 z1-design 组件**编写所有 Vue 页面，其次使用 Element UI、Ant Design 等第三方组件代码
- **熟悉全部 55 个组件**的标签名、属性、事件、插槽和用法示例
- **遵循组件库开发规范**，包括标准的列表页、表单弹窗、详情抽屉等页面模板
- **正确使用设计变量**（CSS Variables），保持视觉风格统一

## 使用环境

z1-design-dev 遵循 anthropics/skill标准。你可以在任何支持skill的编辑器或者终端中使用。

目前已支持编辑器：

- [Cursor](https://www.cursor.com/)

- [Trae](https://trae.ai/)

- [Claude Code](https://claude.ai/code)

- [Windsurf](https://windsurf.ai/)

- [VS Code](https://code.visualstudio.com/) 需搭配`Copilot`或`Cline` 等支持skills的AI插件使用

## 安装

最新版本`v1.0.3`

1. <a :href="$withBase('/z1-design-dev-1.0.3.zip')" download>点击下载最新z1-design-dev压缩包</a>
2. 【cursor\claude code\Trea\Windsurf】解压，并将`z1-design-dev`放在项目根目录下的.cursor/skills或.claude/skills目录下
3. 【其他】将`z1-design-dev`资源根据AI插件提示导入

::: warning 注意
不同编辑器的导入方式略有差异，请参考对应编辑器的 Skill 安装文档。
:::

## 使用方式



::: tip
使用 / + `z1-design-dev` 触发Skill 会在你与 AI 对话时自动生效。
:::

### 场景一：开发页面

直接告诉 AI 你要开发什么页面，它会自动使用 z1-design 组件：

```
用户：帮我写一个用户管理页面，包含查询、表格和新增编辑弹窗
```



::: tip 结果
AI 将生成使用 `z1-table-layout`、`z1-table-search`、`z1-table`、`z1-modal` 等组件的标准代码。
:::

### 场景二：查询组件用法

当你不确定某个组件怎么用时：

```
用户：z1-table 怎么实现多选？
用户：消息提示怎么用？
用户：Drawer 抽屉组件有哪些属性？
```

::: tip 结果
AI 会读取内置的组件文档，给出准确的用法说明和代码示例。
:::

### 场景三：迁移旧代码

如果现有代码使用了 Element UI 或 Ant Design：

```
用户：把这个页面的 Element UI 组件替换成 z1-design
```

::: tip 结果
AI 会自动将 `el-button` → `z1-button`、`el-table` → `z1-table`、`el-dialog` → `z1-modal` 等进行对照替换。
:::

## Skill 内容概览

### 内置组件（55个）

| 分类 | 组件 |
|------|------|
| **基础组件** | Button, Icon, Tag, Avatar, Badge, Text, Divider, Space, Empty |
| **表单组件** | Checkbox, Radio, Switch |
| **数据展示** | Table, TableLayout, TableSearch, TableConfig, TableTool, Statistic, Pagination, Carousel, Image, ImageViewer |
| **反馈组件** | Modal, Drawer, Message, Loading, Progress, Alert, Popover, Tooltip |
| **导航组件** | Menu, Tabs, NavTab, Breadcrumb, Subsection, Active |
| **布局组件** | Split, ResizeBox, Scrollbar |
| **业务组件** | Map, MapFence, Region, Transfer, TransferTree, DynamicView, ApplicationMenu, Charts, DataExport, Upload, CountDown, Watermark, ConfigProvider, LicensePlate, Lottie, Lefttree |

### 内置文档

每个组件均包含完整的使用文档：功能说明、代码示例、Attributes（属性）、Events（事件）、Slots（插槽）、Methods（方法）。

此外还包含安装配置、主题定制、国际化、设计变量等指南。

## 维护与更新

当组件库文档有更新时，在项目根目录运行以下命令即可同步更新 Skill 的内置文档：

```shell
npm run sync:skill
```

::: warning 维护提醒
该命令会自动从 `docs/docs/components/` 读取最新的组件文档，清理格式后写入 Skill 的 references 目录。每次组件库文档变更后，请记得执行此命令以保持 Skill 文档同步。
:::

## 常见问题

### AI 仍然生成了 Element UI 组件？

::: tip 排查步骤
确认 Skill 已正确安装并启用。在编辑器的 Skill / Agent 设置中检查 `z1-design-dev` 是否处于开启状态。如已启用但仍有问题，尝试重启编辑器后重新对话。
:::

### 某个组件的用法不正确？

::: warning 解决方法
Skill 的文档与组件库文档同步生成。如果发现 AI 给出的用法有误，请先确认组件库文档是否为最新版本，然后运行 `npm run sync:skill` 重新同步。
:::

### 可以在其他 AI 工具中使用吗？

::: tip
z1-design-dev 遵循 anthropics/skill 标准，支持任何兼容 SKILL 规范的 AI 编辑器。
:::
