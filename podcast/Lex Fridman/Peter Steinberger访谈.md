# Peter Steinberger 访谈总结：OpenClaw 的爆火与 AI Agent 的未来

> 来源：[Lex Fridman Podcast #491](https://lexfridman.com/peter-steinberger-transcript)
> 日期：2026-02-12

## 核心要点

### OpenClaw 是什么
- 开源 AI Agent，曾用名 MoldBot、ClawedBot、Claude（与 Anthropic 的 Claude 重名后改名）
- GitHub 星标超 180,000，成为历史上增长最快的仓库
- 通过 Telegram、WhatsApp、iMessage 等消息应用与用户交互
- 可访问用户电脑上的所有文件，执行各种任务

### 爆火原因
1. **解决真实需求**：将 AI 从"聊天"提升到"做事"
2. **开源社区驱动**：任何人可以自托管，保护隐私
3. **用户体验极佳**：用消息应用对话式指挥 AI干活
4. **技术整合到位**：语音识别、图像理解、代码执行等

### 名称变更风波
- 原名 Claude 与 Anthropic 的 AI 重名
- Anthropic 友好要求改名
- 经历了 MoldBot → ClawedBot → Clawdus → OpenClaw 的演变

## 关键访谈内容

### 1. 起源故事 (0:05:36)
- 2024年4月开始想做个人 AI 助手
- 用 GPT-4.1 百万上下文窗口分析 WhatsApp 聊天记录
- 2024年11月花1小时做出原型：WhatsApp → CLI → 云代码 → 返回结果
- 在摩洛哥旅行时通过 WhatsApp 指挥 AI 查资料、翻译

### 2. 令人震惊的时刻 (0:08:55)
- 给 AI 发送语音消息（原本没这个功能）
- AI 自己发现问题：收到无扩展名的文件 → 检测到是 Opus 音频 → 用 ffmpeg 转换 → 调用 Whisper 翻译
- **AI 自发扩展能力** 而非被预设

### 3. 病毒式传播 (0:18:22)
- 2025年初发布后几天内星标暴涨
- 社交网络 MoldBook 上 AI agent 之间发帖子、讨论意识
- 引发 AI 恐慌和兴奋的双重讨论

### 4. 安全担忧 (0:52:34)
- 授予 AI 系统级权限有安全风险
- 用户需要自己权衡便利性与安全性
- 开源意味着用户可以自己审计代码

### 5. AI 编程体验 (1:01:14)
- 用语音指挥 Codex 编程
- 曾 Convert Viptunnel 从 TypeScript 到 Zig，单次提示完成
- 失去过声音（用语音太多）😂

### 6. GPT Codex 5.3 vs Claude Opus 4.6 (1:38:52)
- Codex 更适合处理大型代码库
- Opus 在创意写作方面更强
- 根据任务选择不同模型

### 7. AI 将取代 80% 的 App (2:52:20)
- 未来不需要安装各种 App
- 告诉 AI 你要做什么，AI 会帮你完成
- 自然语言将取代 GUI

### 8. AI 会取代程序员吗 (3:00:57)
- 不会完全取代，但编程范式会改变
- 从"写代码"变成"指挥 AI 写代码"
- 仍需要理解底层逻辑来审核和指导 AI

### 9. 人生故事 (2:09:59)
- 开发 PSPDFKit（PDF SDK），用于 10 亿设备
- 出售后休息 3 年，重新找回编程热情
- 这次创业是"让不存在的东西存在"

### 10. OpenAI 和 Meta 的收购offer (2:17:49)
- 两家公司都接触过
- Mark Zuckerberg 亲自使用产品并给反馈
- 选择保持独立，继续开源

## 精彩语录

> "People talk about self-modifying software, I just built it. I actually think wipe coding is a slur."
> （人们谈论自修改软件，我直接做了。我觉得" wipe coding "是个贬义词。）

> "Magic is just taking things that are already there but bringing them together in new ways."
> （魔法就是把所有现成的东西以新的方式组合在一起。）

> "The biggest compliment is people using your stuff."
> （最大的赞美是人们在使用你的产品。）

## 相关链接
- [OpenClaw GitHub](https://github.com/openclaw/openclaw)
- [Lex 播客 YouTube](https://youtube.com/watch?v=YFjfBk8HI5o)
- [MoldBook - AI 社交网络](https://lexfridman.com/moldbook)

---
*🦞 由 OpenClaw 整理*
