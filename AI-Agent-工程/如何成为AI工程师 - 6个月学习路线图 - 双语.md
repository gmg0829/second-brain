---
url: "https://x.com/DeRonin_/status/2033587293064204349"
author: "Ronin (@DeRonin_)"
title: "How to become an AI Engineer in 6 months (RESOURCES)"
source: "X (Twitter)"
date: "2026-03-17"
tags: [AI, Engineering, Roadmap, Learning]
---

# How to become an AI Engineer in 6 months (RESOURCES)

## Introduction

AI engineering has quickly become one of the most valuable skill sets in tech.

**The problem is** that most beginners have no clear idea what they should actually study.

- Some start with machine learning theory
- Some get stuck endlessly watching tutorials
- Others jump straight into prompts and agents without understanding APIs, backend basics

**The result is usually the same**: a lot of confusion and very little practical skill.

If your goal is to become an AI engineer, you don't need to master every field of AI. You need to learn how to build useful AI systems in the real world.

This means learning how to:

- Build end-to-end applications with LLMs
- Work with model APIs such as OpenAI and Anthropic
- Properly design prompts and context
- Use structured outputs and tool calling
- Add retrieval when needed
- Deploy projects so people can actually use them

---

## 中文

AI 工程已成为科技领域最有价值的技能之一。

**问题在于**：大多数初学者并不清楚自己到底应该学什么。

- 有人从机器学习理论开始
- 有人陷入无休止地看教程
- 有人直接跳到提示词和 Agent，但不懂 API、后端基础

**结果往往一样**：学了很多，但真正能动手的能力很少。

如果你想成为 AI 工程师，不需要掌握人工智能的每个领域。你需要的是学会如何在现实世界中构建有用的 AI 系统。

这意味着你需要学会：

- 使用 LLM 构建端到端应用
- 调用 OpenAI 和 Anthropic 等模型 API
- 正确设计提示词和上下文
- 使用结构化输出和工具调用
- 按需添加检索能力
- 部署项目让人们真正能用

---

## Key Points

> AI engineering is fundamentally **software engineering**, focused on **building products** not training models.

> 6-month roadmap: Month 1 Fundamentals → Month 2 LLM Development → Month 3 RAG → Month 4 Agents → Month 5 Deployment → Month 6 Specialization

> Best learning approach: **Build**, don't just watch tutorials.

---

## 中文

> AI 工程本质是**软件工程**，核心是**构建产品**而非训练模型。

> 6 个月路线图：Month 1 基础 → Month 2 LLM 开发 → Month 3 RAG → Month 4 Agent → Month 5 部署 → Month 6 专攻方向

> 最佳学习方式：**动手构建**，而非只看教程。

---

## Monthly Milestones

| Month | Goal | Core Skills |
|-------|------|-------------|
| Month 1 | Solid coding fundamentals | Python, Git, API, FastAPI |
| Month 2 | Master LLM App Development | Prompt Engineering, Structured Output, Tool Calling, Streaming |
| Month 3 | Learn RAG Properly | Embedding, Chunking, Vector DB, Reranking |
| Month 4 | Agents, Workflows, Evals | Agent Loop, Multi-step Workflow, Evals |
| Month 5 | Deployment, Product Thinking | Docker, Auth, Langfuse/LangSmith, Cost Monitoring |
| Month 6 | Specialize and Get Hired | AI Product / Applied ML / AI Automation Engineer |

---

## 中文

| 月份 | 目标 | 核心技能 |
|------|------|----------|
| Month 1 | 扎实的编程基础 | Python, Git, API, FastAPI |
| Month 2 | 掌握 LLM 应用开发 | Prompt Engineering, Structured Output, Tool Calling, Streaming |
| Month 3 | 深入学习 RAG | Embedding, Chunking, Vector DB, Reranking |
| Month 4 | Agent、工作流、评估 | Agent Loop, Multi-step Workflow, Evals |
| Month 5 | 部署、产品思维、可靠性 | Docker, Auth, Langfuse/LangSmith, Cost Monitoring |
| Month 6 | 选择方向求职 | AI Product / Applied ML / AI Automation Engineer |

---

## Month 1: Programming & Fundamentals

**Goal**: Become a functional Python developer

You don't need to be an expert, you just need to stop Googling basic syntax and be able to build simple programs confidently.

AI engineering is first and foremost software engineering. Everything in the later months assumes you can write clean Python, use the terminal, call APIs, and manage a codebase.

### What to Learn

#### 1. Python

Python is the language of AI engineering. Almost every library, API, and tutorial you'll encounter is in Python.

**Resources**:
- [Python for Everybody (Coursera)](https://www.coursera.org/specializations/python) - Best starting point for beginners
- [freeCodeCamp Python Course (YouTube)](https://www.youtube.com/watch?v=rfscVS0vtbw) - 4-hour comprehensive
- [CS50P (Harvard)](https://cs50.harvard.edu/python/) - More rigorous
- [Official Python docs](https://docs.python.org/3/tutorial/) - Authoritative reference

**Focus on**: Variables, data types, loops, conditionals, functions, lists, dictionaries, file I/O, JSON, classes, error handling, virtual environments

**Practice project**: Build a CLI tool like a personal expense tracker or a script calling a public API.

#### 2. Git and GitHub

How professional developers save and share code.

**Resources**:
- [GitHub Skills](https://skills.github.com/) - Official interactive courses
- [Learn Git Branching](https://learngitbranching.js.org/) - Best visual tool
- [Pro Git Book](https://git-scm.com/book/en/v2) - Comprehensive reference

**Focus on**: git init, add, commit, push, pull, branching, .gitignore

#### 3. CLI / Terminal

AI engineers run scripts, install packages, manage servers from command line.

**Resources**:
- [50 most popular Linux & Terminal commands (YouTube)](https://www.youtube.com/watch?v=ZtqBQ68cfJc)
- [The Missing Semester (MIT)](https://missing.csail.mit.edu/)

**Focus on**: cd, ls, pwd, mkdir, rm, cat, less, grep, running Python scripts, environment variables

#### 4. JSON, APIs, HTTP, Async

You'll call LLM APIs from Month 2, so understand how web APIs work first.

**Resources**:
- [HTTP basics – MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)
- [REST API Tutorial](https://restfulapi.net/)
- [Python requests library](https://requests.readthedocs.io/en/latest/)
- [Python async/await](https://realpython.com/async-io-python/)

**Focus on**: GET/POST requests, calling APIs in Python, JSON, HTTP status codes

#### 5. Basic SQL and Pandas

You'll regularly need to inspect, query, and manipulate data.

**Resources**:
- [SQLBolt](https://sqlbolt.com/) - Fast SQL intro
- [Pandas getting started](https://pandas.pydata.org/docs/getting_started/index.html)
- [Kaggle Pandas course](https://www.kaggle.com/learn/pandas)

**Focus on**: SELECT, WHERE, GROUP BY, JOIN / Loading CSVs, filtering, selecting columns

#### 6. FastAPI

**Resources**:
- [FastAPI Official Tutorial](https://fastapi.tiangolo.com/tutorial/)
- [Python API Development (freeCodeCamp)](https://www.youtube.com/watch?v=ZtqBQ68cfJc)

**Focus on**: GET/POST endpoints, path/query parameters, Pydantic, uvicorn

### Month 1 Milestone

By end of month:
- ✅ Write Python programs that read/write files, call APIs, handle errors
- ✅ Version code with Git and push to GitHub
- ✅ Navigate terminal without hesitation
- ✅ Understand HTTP requests and make one in Python
- ✅ Query SQLite with basic SQL
- ✅ Build and run a simple FastAPI app locally

---

## 中文

## Month 1: 编程与 fundamentals

**目标**：成为一个能写代码的 Python 开发者

你不需要成为专家，只需要不再查基础语法，能自信地构建简单程序。

AI 工程首先是软件工程。后续所有月份都假设你能写干净的 Python、会用终端、调用 API、管理代码库。

### 学习重点

#### 1. Python

AI 工程的语言。几乎所有库、API、教程都是 Python。

**资源**：
- [Python for Everybody (Coursera)](https://www.coursera.org/specializations/python) - 初学者最佳起点
- [freeCodeCamp Python Course (YouTube)](https://www.youtube.com/watch?v=rfscVS0vtbw) - 4 小时全面
- [CS50P (Harvard)](https://cs50.harvard.edu/python/) - 更严格
- [Official Python docs](https://docs.python.org/3/tutorial/) - 权威参考

**重点**：变量、数据类型、循环、条件、函数、列表、字典、文件 I/O、JSON、类、错误处理、虚拟环境

**练习项目**：构建一个 CLI 工具，如个人支出追踪器或调用公开 API 的脚本。

#### 2. Git and GitHub

专业开发者保存和共享代码的方式。

**资源**：
- [GitHub Skills](https://skills.github.com/) - 官方互动课程
- [Learn Git Branching](https://learngitbranching.js.org/) - 最好的可视化工具
- [Pro Git Book](https://git-scm.com/book/en/v2) - 全面参考

**重点**：git init, add, commit, push, pull, 分支, .gitignore

#### 3. CLI / Terminal

AI 工程师需要完全在命令行运行脚本、安装包、管理服务器。

**资源**：
- [50 most popular Linux & Terminal commands (YouTube)](https://www.youtube.com/watch?v=ZtqBQ68cfJc)
- [The Missing Semester (MIT)](https://missing.csail.mit.edu/)

**重点**：cd, ls, pwd, mkdir, rm, cat, less, grep, 运行 Python 脚本, 环境变量

#### 4. JSON, APIs, HTTP, Async

Month 2 你就要开始调用 LLM API，所以需要先理解 web API 工作方式。

**资源**：
- [HTTP basics – MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)
- [REST API Tutorial](https://restfulapi.net/)
- [Python requests library](https://requests.readthedocs.io/en/latest/)
- [Python async/await](https://realpython.com/async-io-python/)

**重点**：GET/POST 请求、在 Python 中调用 API、JSON、HTTP 状态码

#### 5. Basic SQL and Pandas

定期需要检查、查询、操作数据。

**资源**：
- [SQLBolt](https://sqlbolt.com/) - 快速 SQL 入门
- [Pandas getting started](https://pandas.pydata.org/docs/getting_started/index.html)
- [Kaggle Pandas course](https://www.kaggle.com/learn/pandas)

**重点**：SELECT, WHERE, GROUP BY, JOIN / 加载 CSV、过滤、选择列

#### 6. FastAPI

**资源**：
- [FastAPI Official Tutorial](https://fastapi.tiangolo.com/tutorial/)
- [Python API Development (freeCodeCamp)](https://www.youtube.com/watch?v=ZtqBQ68cfJc)

**重点**：GET/POST 端点、路径/查询参数、Pydantic、uvicorn

### Month 1 里程碑

到月底你应该能：
- ✅ 写 Python 程序读写文件、调用 API、处理错误
- ✅ 用 Git 管理代码并推送到 GitHub
- ✅ 毫不犹豫地操作终端
- ✅ 理解 HTTP 请求并用 Python 发送
- ✅ 用基础 SQL 查询 SQLite 数据库
- ✅ 本地构建运行简单 FastAPI 应用

---

## Month 2: Master LLM App Development

**Goal**: Build real AI apps using OpenAI and Anthropic APIs

By end, write reliable prompts, get structured data from models, make models call your functions. This is the core of AI engineering.

### What to Learn

#### 1. Prompting Fundamentals

Prompting is the craft of writing instructions that produce consistent, reliable outputs from probabilistic models.

**Resources**:
- [Anthropic Interactive Prompt Engineering Tutorial](https://github.com/anthropics/prompt-eng-interactive-tutorial)
- [Anthropic Prompt Engineering Docs](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview)
- [OpenAI Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering)
- [PromptingGuide.ai](https://www.promptingguide.ai/)

**Focus on**: System vs user messages, specificity, chain-of-thought, few-shot prompting

#### 2. Structured Outputs / JSON Schemas

Real apps need structured data, not raw text.

**Resources**:
- [OpenAI Structured Outputs Guide](https://platform.openai.com/docs/guides/structured-outputs)
- [Instructor library](https://python.useinstructor.com/)

**Practice**: Build invoice/receipt parser.

#### 3. Function / Tool Calling

Transforms LLM from text generator to something that can take actions.

**Resources**:
- [OpenAI Function Calling Guide](https://platform.openai.com/docs/guides/function-calling)
- [Anthropic Tool Use Docs](https://docs.anthropic.com/en/docs/build-with-claude/tool-use)

**Practice**: Build assistant with 3 tools: get_weather, calculate, search_notes.

#### 4. Streaming Responses

Show output as it's being generated, word by word.

**Resources**:
- [OpenAI Streaming Docs](https://platform.openai.com/docs/api-reference/streaming)
- [Anthropic Streaming Docs](https://docs.anthropic.com/en/api/messages-streaming)

> **Tip**: Streaming is almost always right for user-facing apps.

#### 5. Conversation State

LLMs are stateless. Conversation history is managed by sending full message list with every request.

**Resources**:
- [OpenAI Managing Conversations](https://platform.openai.com/docs/guides/conversation-state)
- [Anthropic Messages API](https://docs.anthropic.com/en/api/messages)

**Practice**: Build terminal multi-turn chatbot with /reset command.

#### 6. Cost, Latency, Token Basics

Ship without understanding costs = surprise bills and slow apps.

**Resources**:
- [OpenAI Pricing](https://openai.com/api/pricing)
- [Anthropic Pricing](https://www.anthropic.com/pricing)
- [Tokenizer Tool](https://platform.openai.com/tokenizer)

> Don't use GPT-4/Opus for everything – cheaper models are often enough.

#### 7. Failure Handling

LLM APIs fail. Rate limits, timeouts, malformed JSON.

**Resources**:
- [OpenAI Error Codes](https://platform.openai.com/docs/guides/error-codes)
- [Tenacity](https://tenacity.readthedocs.io/) - Retry library

#### 8. Prompt Injection Awareness

Prompt injection is #1 security risk in LLM apps.

**Resources**:
- [OWASP Top 10 for LLM Apps](https://genai.owasp.org/llmrisk/llm01-prompt-injection/)

### Month 2 Milestone

By end of month:
- ✅ Write prompts that produce consistent outputs
- ✅ Get structured JSON with Pydantic + Instructor
- ✅ Wire tool calling for model to call Python functions
- ✅ Stream responses via FastAPI
- ✅ Manage multi-turn conversation history
- ✅ Estimate token cost before requests
- ✅ Handle API errors without crashing

---

## 中文

## Month 2: 掌握 LLM 应用开发

**目标**：使用 OpenAI 和 Anthropic API 构建真正的 AI 应用

到月底你应该能熟练编写可靠的提示词、从模型获取结构化数据、让模型调用你的函数。这是 AI 工程的核心。

### 学习重点

#### 1. Prompting Fundamentals

提示词不仅仅是礼貌地问问题。这是编写指令的工艺，能从本质上概率性的模型产生一致可靠的输出。

**资源**：
- [Anthropic Interactive Prompt Engineering Tutorial](https://github.com/anthropics/prompt-eng-interactive-tutorial)
- [Anthropic Prompt Engineering Docs](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview)
- [OpenAI Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering)
- [PromptingGuide.ai](https://www.promptingguide.ai/)

**重点**：System vs user messages、精确性、chain-of-thought、few-shot prompting

#### 2. Structured Outputs / JSON Schemas

真实应用中几乎不需要从 LLM 获取原始文本，而是需要可解析、存储的结构化数据。

**资源**：
- [OpenAI Structured Outputs Guide](https://platform.openai.com/docs/guides/structured-outputs)
- [Instructor library](https://python.useinstructor.com/)

**练习**：构建发票/收据解析器。

#### 3. Function / Tool Calling

工具调用将 LLM 从文本生成器转变为可以采取行动的事物。

**资源**：
- [OpenAI Function Calling Guide](https://platform.openai.com/docs/guides/function-calling)
- [Anthropic Tool Use Docs](https://docs.anthropic.com/en/docs/build-with-claude/tool-use)

**练习**：构建有三个工具的助手：get_weather、calculate、search_notes。

#### 4. Streaming Responses

流式输出是显示模型正在生成的同时就显示输出——逐字——而不是等待完整响应。

**资源**：
- [OpenAI Streaming Docs](https://platform.openai.com/docs/api-reference/streaming)
- [Anthropic Streaming Docs](https://docs.anthropic.com/en/api/messages-streaming)

> **Tip**: 流式输出几乎是面向用户应用的正确选择。

#### 5. Conversation State

LLM 是无状态的——调用之间没有记忆。对话历史是通过在每次请求时发送完整消息列表来管理的。

**资源**：
- [OpenAI Managing Conversations](https://platform.openai.com/docs/guides/conversation-state)
- [Anthropic Messages API](https://docs.anthropic.com/en/api/messages)

**练习**：构建带 /reset 命令的终端多轮聊天机器人。

#### 6. Cost, Latency, Token Basics

不了解成本和 token 就发布 AI 应用，会导致收到惊人账单和应用缓慢。

**资源**：
- [OpenAI Pricing](https://openai.com/api/pricing)
- [Anthropic Pricing](https://www.anthropic.com/pricing)
- [Tokenizer Tool](https://platform.openai.com/tokenizer)

> 不要什么都用 GPT-4/Opus——便宜模型通常对简单任务足够好。

#### 7. Failure Handling

LLM API 会失败。速率限制、响应超时、格式错误的 JSON。

**资源**：
- [OpenAI Error Codes](https://platform.openai.com/docs/guides/error-codes)
- [Tenacity](https://tenacity.readthedocs.io/) - 重试库

#### 8. Prompt Injection Awareness

提示词注入是 LLM 应用的 #1 安全风险。

**资源**：
- [OWASP Top 10 for LLM Apps](https://genai.owasp.org/llmrisk/llm01-prompt-injection/)

### Month 2 里程碑

到月底你应该能：
- ✅ 写提示词产生一致可靠的输出
- ✅ 使用 Pydantic + Instructor 从任何模型获取结构化 JSON 数据
- ✅ 连接工具调用让模型调用你的 Python 函数
- ✅ 通过 FastAPI 端点实时流式传输响应
- ✅ 正确管理多轮对话历史
- ✅ 发送请求前估算 token 成本
- ✅ 处理 API 错误、超时和坏输出而不崩溃

---

## Month 3: Learn RAG Properly

**Goal**: Build systems where LLMs answer from your documents

By end: ingest docs, embed/store, retrieve chunks, produce grounded, accurate, citable answers. RAG is the most in-demand practical skill in AI engineering.

### What to Learn

#### 1. Embeddings

Text embedding is text projected into high-dimensional vector space. Semantically similar text ends up close together – enabling similarity search.

**Resources**:
- [Stack Overflow: Intuitive Intro to Embeddings](https://stackoverflow.blog/2023/11/09/an-intuitive-introduction-to-text-embeddings/)
- [OpenAI Embeddings Guide](https://platform.openai.com/docs/guides/embeddings)

**Practice**: Embed 20 sentences, build nearest-neighbor search for top 3 similar.

#### 2. Chunking

Break docs into smaller pieces before embedding. How you chunk affects retrieval quality.

**Resources**:
- [Weaviate: Chunking Strategies](https://weaviate.io/blog/chunking-strategies-for-rag)
- [LangChain Text Splitters](https://python.langchain.com/docs/concepts/text_splitters/)

> **Tip**: Start with RecursiveCharacterTextSplitter, chunk_size=500, chunk_overlap=50.

#### 3. Vector Databases

Store and search embeddings efficiently.

**Resources**:
- [Chroma](https://docs.trychroma.com/) - Local prototyping
- [Pinecone](https://www.pinecone.io/learn/) - Managed scale
- [Qdrant](https://qdrant.tech/documentation/) - Open-source with filters
- [pgvector](https://github.com/pgvector/pgvector) - For PostgreSQL users

**Practice**: Index 50-100 docs into Chroma, query for top 5 relevant chunks.

#### 4. Metadata Filtering

Constrain retrieval by date, source, document type.

#### 5. Reranking

Two-stage: embed/search (fast) → rerank top-k (accurate). Dramatically better quality.

**Resources**:
- [Cohere Reranking](https://docs.cohere.com/docs/reranking-with-cohere)

#### 6. Retrieval Quality Issues

Most RAG failures are retrieval failures, not model failures.

**Common issues**:
- Semantic drift → fix: query rewriting, HyDE
- Chunk boundary problems → fix: increase overlap
- Top-k too small → fix: increase top_k

#### 7. Hallucination Reduction

RAG dramatically reduces but doesn't eliminate hallucinations.

**Resources**:
- [Zep: Reducing LLM Hallucinations](https://www.getzep.com/ai-agents/reducing-llm-hallucinations/)

#### 8. Citations and Grounding

Grounded RAG tells you where the answer came from.

#### 9. RAG Framework: LangChain or LlamaIndex

Don't build from scratch:

- **LlamaIndex**: Optimized for search/indexing
- **LangChain**: Orchestration engine

**Practice**: Build "chat with your docs" app.

### Month 3 Milestone

By end of month:
- ✅ Explain what embedding is
- ✅ Chunk documents intelligently
- ✅ Store/query embeddings in vector database
- ✅ Add reranking
- ✅ Debug retrieval failures
- ✅ Build complete RAG pipeline

---

## 中文

## Month 3: 深入学习 RAG

**目标**：构建让 LLM 能从你的文档回答问题的系统

到月底你应该能摄取文档、嵌入存储、检索 chunk、产生有依据的答案。RAG 是目前最需求的实用技能。

### 学习重点

#### 1. Embeddings

文本 embedding 是文本被投影到高维向量空间。语义相似的文本靠得很近。

**资源**：
- [Stack Overflow: Intuitive Intro to Embeddings](https://stackoverflow.blog/2023/11/09/an-intuitive-introduction-to-text-embeddings/)
- [OpenAI Embeddings Guide](https://platform.openai.com/docs/guides/embeddings)

**练习**：嵌入 20 个句子，构建最近邻搜索。

#### 2. Chunking

将文档分解成小块再嵌入。

**资源**：
- [Weaviate: Chunking Strategies](https://weaviate.io/blog/chunking-strategies-for-rag)

> **Tip**: 从 RecursiveCharacterTextSplitter 开始，chunk_size=500。

#### 3. Vector Databases

高效存储和搜索 embedding。

**资源**：
- [Chroma](https://docs.trychroma.com/)
- [Pinecone](https://www.pinecone.io/learn/)

**练习**：将 50-100 文档索引到 Chroma。

#### 4. Metadata Filtering

按日期、来源、文档类型约束检索。

#### 5. Reranking

两阶段检索：嵌入/搜索 → 重排序。

**资源**：
- [Cohere Reranking](https://docs.cohere.com/docs/reranking-with-cohere)

#### 6. Retrieval Quality Issues

大多数 RAG 失败是检索失败。

#### 7. Hallucination Reduction

RAG 显著减少幻觉，但不能完全消除。

#### 8. Citations and Grounding

有依据的 RAG 告诉你答案来自哪里。

#### 9. RAG 框架：LangChain 还是 LlamaIndex

- **LlamaIndex**：为搜索优化
- **LangChain**：编排引擎

**练习**：构建"与文档聊天"应用。

### Month 3 里程碑

到月底你应该能：
- ✅ 解释什么是 embedding
- ✅ 智能 chunk 文档
- ✅ 在向量数据库中存储查询 embedding
- ✅ 添加重排序
- ✅ 调试检索失败
- ✅ 构建完整 RAG 管道

---

## Month 4: Agents, Tools, Workflows, Evals

**Goal**: Build systems that autonomously take sequences of actions

By end: build real agent from scratch, understand when agents are wrong choice.

### What to Learn

#### 1. Agent Loops

Agent = goal-driven system cycling through observe → reason → act.

**Resources**:
- [Anthropic: Building Effective Agents](https://www.anthropic.com/research/building-effective-agents)
- [LangChain Academy: Intro to LangGraph](https://academy.langchain.com/courses/intro-to-langgraph)

**Practice**: Build agent from scratch using OpenAI/Anthropic API only.

#### 2. Tool Selection

Writing good tools is half the job.

**Resources**:
- [OpenAI: Function Calling Best Practices](https://platform.openai.com/docs/guides/function-calling/best-practices)

#### 3. State Management

In LangGraph, state = shared memory flowing through graph.

**Resources**:
- [LangGraph State Management](https://langchain-ai.github.io/langgraph/concepts/low_level/#state)

#### 4. Retries and Failure Handling

Agents fail differently from regular LLM calls.

**Resources**:
- [LangGraph Error Handling](https://langchain-ai.github.io/langgraph/how-tos/autofill-tool-errors/)

#### 5. When NOT to Use Agents

Most important overlooked skill. Agents are slow, expensive, unpredictable.

> **Memorize**: 3 fixed LLM calls always faster, cheaper than agent.

**Resources**:
- [Anthropic: Building effective agents](https://www.anthropic.com/research/building-effective-agents)

#### 6. Multi-Step Workflows

Between "single prompt" and "full agent" lies workflows.

**Practice**: Build 3-step content pipeline.

#### 7. Evaluation Harnesses

Evals = how you know if AI system actually works.

**Resources**:
- [DeepEval](https://deepeval.com/docs/getting-started)
- [LangSmith](https://smith.langchain.com/)

> Evals are not optional. Every change without evals is a gamble.

#### 8. Task Success Metrics

Metrics telling whether agent accomplishes actual goal.

### Month 4 Milestone

By end of month:
- ✅ Explain agent loop and implement from scratch
- ✅ Write tool descriptions
- ✅ Manage agent state with LangGraph
- ✅ Handle failures
- ✅ Decide when agent/workflow needed
- ✅ Build workflows
- ✅ Write evals

---

## 中文

## Month 4: Agents、Tools、Workflows、Evals

**目标**：构建可以自主采取一系列行动的系统

到月底你应该能从零构建真正的 Agent、理解什么时候 Agent 是错误的选择。

### 学习重点

#### 1. Agent Loops

Agent = 目标驱动的系统，循环观察 → 推理 → 行动。

**资源**：
- [Anthropic: Building Effective Agents](https://www.anthropic.com/research/building-effective-agents)
- [LangChain Academy: Intro to LangGraph](https://academy.langchain.com/courses/intro-to-langgraph)

**练习**：从零构建 Agent。

#### 2. Tool Selection

写好工具是半壁江山。

**资源**：
- [OpenAI: Function Calling Best Practices](https://platform.openai.com/docs/guides/function-calling/best-practices)

#### 3. State Management

在 LangGraph 中，state = 流经图的共享内存。

**资源**：
- [LangGraph State Management](https://langchain-ai.github.io/langgraph/concepts/low_level/#state)

#### 4. 重试和失败处理

Agent 失败方式不同于常规 LLM 调用。

**资源**：
- [LangGraph Error Handling](https://langchain-ai.github.io/langgraph/how-tos/autofill-tool-errors/)

#### 5. 什么时候不用 Agent

最重要但最容易被忽视的技能。

> **记住**：3 个固定 LLM 调用永远比 Agent 快、便宜、易调试。

**资源**：
- [Anthropic: Building effective agents](https://www.anthropic.com/research/building-effective-agents)

#### 6. Multi-Step Workflows

"单提示"和"完全 Agent"之间有工作流。

**练习**：构建 3 步内容管道。

#### 7. Evaluation Harnesses

Evals = 知道 AI 系统是否真的有效。

**资源**：
- [DeepEval](https://deepeval.com/docs/getting-started)
- [LangSmith](https://smith.langchain.com/)

> Evals 不是可选的。

#### 8. Task Success Metrics

衡量 Agent 是否完成实际目标的指标。

### Month 4 里程碑

到月底你应该能：
- ✅ 解释 Agent 循环并从零实现
- ✅ 写工具描述
- ✅ 用 LangGraph 管理 Agent 状态
- ✅ 处理失败
- ✅ 决定什么时候用 Agent/工作流
- ✅ 构建工作流
- ✅ 写 evals

---

## Month 5: Deployment, Product Thinking, Reliability

**Goal**: Make everything production-ready

By end: deploy app handling real users, real traffic, real failures.

### What to Learn

#### 1. FastAPI Production Patterns

You know how to build FastAPI. Now make it survive production traffic.

**Resources**:
- [FastAPI Deployment Docs](https://fastapi.tiangolo.com/deployment/)
- [FastAPI Best Practices](https://fastlaunchapi.dev/blog/fastapi-best-practices-production-2026)

**Focus on**: Gunicorn + Uvicorn workers, health checks, CORS middleware

#### 2. Docker

Stop saying "it works on my machine."

**Resources**:
- [Docker Getting Started](https://docs.docker.com/get-started/)

**Practice**: Containerize RAG app with docker-compose.

#### 3. Background Jobs and Queues

LLM calls are slow. Users leave if they wait 30 seconds.

**Resources**:
- [Celery](https://docs.celeryq.dev/en/stable/getting-started/introduction.html)

#### 4. Auth and API Key Security

AI app with API needs authentication.

**Resources**:
- [FastAPI Security](https://fastapi.tiangolo.com/tutorial/security/)
- [OWASP API Security](https://owasp.org/API-Security/)

#### 5. Logging and Observability

In production, if you can't see, you can't fix.

**Resources**:
- [Langfuse](https://langfuse.com/docs/observability/overview)
- [LangSmith](https://smith.langchain.com/)

#### 6. Prompt Version Management

Prompts are code. Need version control, testing, rollback.

#### 7. Cost Monitoring

LLM APIs charge per token. No cost control = surprise bills.

**Resources**:
- [OpenAI Usage](https://platform.openai.com/usage)
- [Helicone](https://www.helicone.ai/)

#### 8. Caching

20% users ask similar questions = pay 20 times.

**Resources**:
- [Redis](https://redis.io/docs/)
- [GPTCache](https://github.com/zilliztech/GPTCache)

### Month 5 Milestone

By end of month:
- ✅ Deploy FastAPI + LLM in Docker with production config
- ✅ Handle long tasks with background jobs
- ✅ Secure API with auth and rate limits
- ✅ Trace LLM calls with Langfuse/LangSmith
- ✅ Manage prompts with version control
- ✅ Monitor costs in real time
- ✅ Cache LLM responses

---

## 中文

## Month 5: 部署、产品思维和可靠性

**目标**：将一切变得生产就绪

到月底你应该能部署处理真实用户、真实流量、真实失败的应用。

### 学习重点

#### 1. FastAPI Production Patterns

知道如何构建 FastAPI。现在让它承受生产流量。

**资源**：
- [FastAPI Deployment Docs](https://fastapi.tiangolo.com/deployment/)
- [FastAPI Best Practices](https://fastlaunchapi.dev/blog/fastapi-best-practices-production-2026)

**重点**：Gunicorn + Uvicorn workers、健康检查、CORS 中间件

#### 2. Docker

停止说"它在我机器上能工作"。

**资源**：
- [Docker Getting Started](https://docs.docker.com/get-started/)

**练习**：用 docker-compose 容器化 RAG 应用。

#### 3. Background Jobs and Queues

LLM 调用很慢。用户等 30 秒会离开。

**资源**：
- [Celery](https://docs.celeryq.dev/en/stable/getting-started/introduction.html)

#### 4. Auth and API Key Security

AI app 有 API 需要认证。

**资源**：
- [FastAPI Security](https://fastapi.tiangolo.com/tutorial/security/)
- [OWASP API Security](https://owasp.org/API-Security/)

#### 5. Logging and Observability

生产中看不到就无法修复。

**资源**：
- [Langfuse](https://langfuse.com/docs/observability/overview)
- [LangSmith](https://smith.langchain.com/)

#### 6. Prompt Version Management

提示词是代码。需要版本控制、测试、回滚。

#### 7. Cost Monitoring

LLM API 按 token 收费。没有成本控制 = 惊人账单。

**资源**：
- [OpenAI Usage](https://platform.openai.com/usage)
- [Helicone](https://www.helicone.ai/)

#### 8. Caching

20% 用户问类似问题 = 付 20 次钱。

**资源**：
- [Redis](https://redis.io/docs/)
- [GPTCache](https://github.com/zilliztech/GPTCache)

### Month 5 里程碑

到月底你应该能：
- ✅ 用 Docker 生产配置部署 FastAPI + LLM
- ✅ 用后台作业处理长时间任务
- ✅ 用 auth 和速率限制保护 API
- ✅ 用 Langfuse/LangSmith 追踪 LLM 调用
- ✅ 用版本控制管理提示词
- ✅ 实时监控成本
- ✅ 缓存 LLM 响应

---

## Month 6: Specialize and Get Hired

Knowledge applies in three directions:

### Direction 1: AI Product Engineer

Best for startup jobs fast.

Focus: LLM apps, RAG, agents, deployment, product UX.

**Resources**:
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [Streamlit](https://docs.streamlit.io/)
- [Google: People + AI Guidebook](https://pair.withgoogle.com/guidebook/)

### Direction 2: Applied ML / LLM Engineer

For deeper technical roles.

Focus: fine-tuning, inference optimization, open-source models.

**Resources**:
- [OpenAI Fine-tuning](https://platform.openai.com/docs/guides/fine-tuning)
- [Unsloth](https://github.com/unslothai/unsloth)
- [Ollama](https://ollama.ai/)
- [vLLM](https://github.com/vllm-project/vllm)

### Direction 3: AI Automation Engineer

For building for businesses immediately.

Focus: workflow orchestration, business process automation.

**Resources**:
- [n8n](https://docs.n8n.io/)
- [Zapier AI Actions](https://zapier.com/ai)

---

## 中文

## Month 6: 专攻方向和求职

知识应用于三个方向：

### 方向 1: AI Product Engineer

最适合快速找到初创公司工作。

专注：LLM apps、RAG、agents、部署、产品 UX。

**资源**：
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [Streamlit](https://docs.streamlit.io/)
- [Google: People + AI Guidebook](https://pair.withgoogle.com/guidebook/)

### 方向 2: Applied ML / LLM Engineer

适合更深入技术角色。

专注：fine-tuning、推理优化、开源模型。

**资源**：
- [OpenAI Fine-tuning](https://platform.openai.com/docs/guides/fine-tuning)
- [Unsloth](https://github.com/unslothai/unsloth)
- [Ollama](https://ollama.ai/)
- [vLLM](https://github.com/vllm-project/vllm)

### 方向 3: AI Automation Engineer

适合立即为企业构建。

专注：工作流编排、业务流程自动化。

**资源**：
- [n8n](https://docs.n8n.io/)
- [Zapier

**资源**：
- [n8n](https://docs.n8n.io/)
- [Zapier AI Actions](https://zapier.com/ai)

---

## Conclusion: What to Expect After 6 Months?

Honestly, without some investment, this roadmap won't make you senior in 6 months.

But it will make you someone who can build, ship, deploy real AI systems solving real problems.

And right now, that's exactly what the market pays for.

### Market Demand

- Job postings grew 25% YoY
- 56% wage premium for AI skills
- Only 1% companies "AI mature" – 99% still need help

### Salary Levels (2026)

**Full-time (US)**:
- Junior: $90K-$130K
- Mid-level (3-5 yrs): $155K-$200K
- Senior: $195K-$350K+

**Freelance**:
- AI agent dev: $175-$300/hour
- RAG: $150-$250/hour
- LLM integration: $125-$200/hour

### Key Actions

1. **Pick one project each month and build it.** Not read. Build.
2. **Start sharing what you learn.** Write on X, LinkedIn.
3. **Don't wait until you feel ready.** You never will.

6 months is enough to change everything – if you actually put in the work.

---

## 中文

## 结论：6 个月后能期待什么？

说实话，没有一些资金投入，这个路线图不会让你在 6 个月成为高级 AI 工程师。

但它会让你成为能构建、发布和部署解决真实问题的真实 AI 系统的人。

而现在，这正是市场支付的。

### 市场需求

- 职位发布同比增长 25%
- AI 技能工资溢价 56%
- 只有 1% 公司"AI 成熟"，99% 仍然需要帮助

### 薪资水平（2026年）

**全职（美国）**：
- 初级：$90K-$130K
- 中级（3-5 年）：$155K-$200K
- 高级：$195K-$350K+

**自由职业**：
- AI agent 开发：$175-$300/小时
- RAG 实现：$150-$250/小时
- LLM 集成：$125-$200/小时

### 关键行动

1. **从每个月选择一个项目构建**。不是看教程，是构建。
2. **开始分享你学的**。在 X、LinkedIn 上写。
3. **不要等到感觉准备好了**。你永远不会感觉准备好。

6 个月如果你真的投入工作，足以改变一切。

---

*Original ~10,000+ words by Ronin (@DeRonin_)*  
*Translation: gmg-clawbot 🦞*
