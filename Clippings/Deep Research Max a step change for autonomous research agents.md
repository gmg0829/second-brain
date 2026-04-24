---
title: "Deep Research Max: a step change for autonomous research agentsDeep Research Max：自主研究代理的变革"
source: "https://x.com/GoogleAIStudio/status/2046628728210350366"
author:
  - "[[@GoogleAIStudio]]"
published: 2026-04-22
created: 2026-04-22
description: "In December, we released the Gemini Deep Research agent to developers via the Interactions API, giving developers access to Google’s most ad..."
tags:
  - "clippings"
---
![Image](https://pbs.twimg.com/media/HGb5ertXAAAN8bV?format=jpg&name=large)

[In December](https://blog.google/innovation-and-ai/technology/developers-tools/deep-research-agent-gemini-api/), we released the Gemini Deep Research agent to developers via the [Interactions API](https://blog.google/technology/developers/interactions-api), giving developers access to Google’s most advanced autonomous research capabilities. Today, we are taking these capabilities to the next level with two new evolutions of our autonomous research agent: Deep Research and Deep Research Max.[12 月](https://blog.google/innovation-and-ai/technology/developers-tools/deep-research-agent-gemini-api/)我们通过以下方式向开发者发布了 Gemini Deep Research 代理： [交互 API](https://blog.google/technology/developers/interactions-api) 这使得开发者能够使用谷歌最先进的自主研究功能。今天，我们将这些功能提升到一个新的水平，推出了自主研究代理的两个全新版本：深度研究和深度研究 Max。

With the integration of our most advanced model, Gemini 3.1 Pro, Deep Research has transformed from a sophisticated summarization engine into a foundation for enterprise workflows across finance, life sciences, market research, and more. Deep Research’s reports offer value on their own, but also serve as the first step in complex, agentic pipelines which often start with in-depth context gathering. With a single API call, developers can now trigger exhaustive research workflows that for the first time blend the open web with their proprietary data streams to deliver professional-grade, fully cited analyses.通过集成我们最先进的模型 Gemini 3.1 Pro，Deep Research 已从一个功能强大的摘要引擎转型为企业工作流程的基础，其应用领域涵盖金融、生命科学、市场研究等。Deep Research 的报告本身就极具价值，同时也是构建复杂、智能流程的第一步，这些流程通常始于深入的背景信息收集。现在，只需一次 API 调用，开发人员即可触发详尽的研究工作流程，首次将开放网络与 Deep Research 的专有数据流相结合，从而提供专业级、引用完整的分析报告。

<video preload="none" tabindex="-1" playsinline="" aria-label="Embedded video" poster="https://pbs.twimg.com/amplify_video_thumb/2046627051822530560/img/Nz_xiiIOAMOgBXCl.jpg" style="width: 100%; height: 100%; position: absolute; background-color: black; top: 0%; left: 0%; transform: rotate(0deg) scale(1.005);"><source type="video/mp4" src="blob:https://x.com/0353b76d-acfd-40e6-87c7-12f466843a2b"></video>

0:01 / 3:02

## Choose a research configuration that fits your workflow选择适合您工作流程的研究配置。

Building upon our initial release of Gemini Deep Research, we’re introducing two distinct agents designed to match your needs ranging from direct user assistance to large-scale, offline research processes:在 Gemini Deep Research 的初始版本基础上，我们推出了两个不同的代理，旨在满足您的各种需求，从直接用户协助到大规模离线研究流程：

- **Deep Research:** Optimized for speed and efficiency, this new agent replaces our preview release from December and delivers significantly reduced latency and cost at higher quality levels. It is the ideal agent for research experiences integrated directly into interactive user surfaces where lower latency is desired.**深度研究：** 这款全新代理程序针对速度和效率进行了优化，取代了我们 12 月份发布的预览版，在保证更高质量的前提下，显著降低了延迟和成本。它是直接集成到交互式用户界面中的研究体验的理想选择，尤其适用于需要低延迟的应用场景。
- **Deep Research Max:** Designed for maximum comprehensiveness and highest-quality synthesis, Max leverages extended test-time compute to iteratively reason, search and refine the final report. It is the perfect engine for asynchronous, background workflows such as a nightly cron job triggering the generation of exhaustive due diligence reports for an analyst team by morning.**Deep Research Max：** Max 旨在提供最全面的信息和最高质量的综合分析，它利用扩展的测试时间计算能力，迭代地进行推理、搜索和优化，最终生成报告。它是异步后台工作流程的理想引擎，例如，每晚的定时任务可以触发分析团队在第二天早上收到详尽的尽职调查报告。

![Image](https://pbs.twimg.com/media/HGb6JPbXUAA_pUv?format=png&name=large)

Deep Research Max represents a leap in performance across industry-standard benchmarks tracking retrieval and reasoning capabilities.

## Unlock proprietary data and rich native visuals解锁专有数据和丰富的原生视觉效果

Deep Research can now search the web, arbitrary remote MCPs, file uploads and connected file stores — or any subset of them — introducing capabilities designed to handle the complex, gated data universes that professionals rely on daily.Deep Research 现在可以搜索网络、任意远程 MCP、文件上传和连接的文件存储（或其中的任何子集），从而引入旨在处理专业人士每天依赖的复杂、受控数据宇宙的功能。

- **Model Context Protocol (MCP) support:** You can now seamlessly connect Deep Research to your custom data and specialized professional data streams (such as financial or market data providers) securely via MCP. Deep Research supports arbitrary tool definitions which transforms it from a web searcher into an autonomous agent capable of navigating any specialized data repositories.**模型上下文协议 (MCP) 支持：** 现在，您可以通过 MCP 将 Deep Research 安全地无缝连接到您的自定义数据和专业数据流（例如金融或市场数据提供商）。Deep Research 支持任意工具定义，这使其从网络搜索引擎转变为能够浏览任何专业数据存储库的自主代理。
- **Native charts and infographics:** A first for Deep Research in the Gemini API, our agent no longer just creates text; it natively generates high-quality charts and infographics in-line with HTML or [Nano Banana](https://blog.google/innovation-and-ai/technology/ai/nano-banana-2/), dynamically visualizing complex data sets to enrich analytical reports.**原生图表和信息图：** 这是 Deep Research 在 Gemini API 中的首次尝试，我们的代理不再仅仅生成文本；它能够原生生成高质量的图表和信息图，并将其直接嵌入 HTML 或 HTML 中。 [纳米香蕉](https://blog.google/innovation-and-ai/technology/ai/nano-banana-2/)动态可视化复杂数据集，以丰富分析报告。

![Image](https://pbs.twimg.com/media/HGcSqrMWkAElYEh?format=jpg&name=large)

![Image](https://pbs.twimg.com/media/HGcSqraXkAAQSxr?format=jpg&name=large)

![Image](https://pbs.twimg.com/media/HGcSqryXcAE6FCX?format=jpg&name=large)

![Image](https://pbs.twimg.com/media/HGcSqrPW0AAOojO?format=jpg&name=large)

We’ve also expanded the agent's capabilities to provide more control and transparency over the research process:我们还扩展了代理的功能，以便对研究过程提供更大的控制权和透明度：

- **Collaborative planning:** Review, guide and refine the research plan generated by the agent before it begins execution, providing granular control over the investigation's scope.**协作规划：** 在调查开始执行之前，审查、指导和完善调查人员制定的调查计划，从而对调查范围进行精细控制。
- **Extended tooling:** Combine the full suite of Gemini API tooling. Run Deep Research with Google Search, remote MCP servers, URL Context, Code Execution and File Search simultaneously — or turn off web access entirely to exclusively search over your custom data.**扩展工具：** 结合使用 Gemini API 的全套工具。同时利用 Google 搜索、远程​​ MCP 服务器、URL 上下文、代码执行和文件搜索进行深度研究——或者完全关闭网络访问，仅搜索您的自定义数据。
- **Multimodal research grounding:** Provide a combination of PDFs, CSVs, images, audio and video as input to ground the agent's research in your custom context.**多模态研究基础：** 提供 PDF、CSV、图像、音频和视频的组合作为输入，使代理的研究能够融入您的自定义上下文。
- **Real-time streaming:** Track the agent's intermediate reasoning steps with live thought summaries, and receive text and image outputs as they are generated, particularly useful for interactive user surfaces.**实时流：** 通过实时思维摘要跟踪代理的中间推理步骤，并接收生成的文本和图像输出，这对于交互式用户界面尤其有用。

## Drive real-world results with expert-grade analysis利用专家级分析，推动实际成果的取得。

Deep Research Max delivers highly comprehensive reports, rigorous factuality, and expert-grade analysis cheaper and more efficiently than ever before. Compared to our December release, Deep Research Max consults significantly more sources and identifies critical nuances the older release frequently overlooked. We have also focused on teaching Deep Research to consult a diverse array of sources and carefully weighing conflicting evidence against each other. The result is a nuanced report that draws from authoritative sources like SEC filings and open-access peer-reviewed journals, lays out information well, and transforms dense technical data into actionable, stakeholder-ready formats.Deep Research Max 以前所未有的低成本和高效方式，提供高度全面的报告、严谨的事实依据和专家级的分析。与我们 12 月份发布的版本相比，Deep Research Max 参考了更多信息来源，并识别出旧版本经常忽略的关键细节。我们还致力于训练 Deep Research 系统，使其能够参考各种不同的信息来源，并仔细权衡相互矛盾的证据。最终成果是一份细致入微的报告，它引用了美国证券交易委员会 (SEC) 文件和开放获取的同行评审期刊等权威来源，清晰地呈现信息，并将复杂的专业技术数据转化为可供利益相关者参考的实用信息。

![Image](https://pbs.twimg.com/media/HGcYQE4WEAEuUfy?format=jpg&name=large)

To make sure this tech delivers real-world results, we’re working closely with startups and enterprises in specialized and regulated fields where there is little margin for error, particularly in finance and the life sciences. For example, we are actively collaborating with [FactSet](https://www.factset.com/), [S&P](https://www.spglobal.com/ratings/en) and [PitchBook](https://pitchbook.com/) on their MCP server designs to let shared customers integrate financial data offerings into workflows powered by Deep Research, and to enable them to realize a leap in productivity by gathering context using their exhaustive data universes at lightning speed.为了确保这项技术能够带来实际应用效果，我们正与一些专业化且监管严格的领域（尤其是金融和生命科学领域）的初创公司和企业紧密合作，因为这些领域的容错空间非常有限。例如，我们正在积极与……合作。 [事实集](https://www.factset.com/) ， [标普](https://www.spglobal.com/ratings/en)和 [PitchBook](https://pitchbook.com/) 在他们的 MCP 服务器设计中，共享客户可以将金融数据产品集成到由 Deep Research 提供支持的工作流程中，并使他们能够利用其详尽的数据宇宙以闪电般的速度收集上下文，从而实现生产力的飞跃。

## Take advantage of proven Google scale performance充分利用谷歌久经考验的规模化性能

When you build with the Deep Research agent, you are tapping into the same autonomous research infrastructure that powers research capabilities within some of Google’s most popular products like [Gemini App](https://gemini.google/overview/deep-research/), [NotebookLM](https://blog.google/technology/google-labs/notebooklm-deep-research-file-types/), [Google Search](https://blog.google/products/search/google-search-ai-mode-update/#deep-search) and [Google Finance](https://blog.google/products/search/new-google-finance-ai-deep-search/).当您使用深度研究代理进行构建时，您将利用与 Google 一些最受欢迎的产品（例如 Google Play 和 Google Search Console）中研究功能相同的自主研究基础设施。 [双子座应用程序](https://gemini.google/overview/deep-research/) ， [NotebookLM](https://blog.google/technology/google-labs/notebooklm-deep-research-file-types/) ， [谷歌搜索](https://blog.google/products/search/google-search-ai-mode-update/#deep-search)和[谷歌财经](https://blog.google/products/search/new-google-finance-ai-deep-search/) 。

## Get started with Deep Research in the Interactions API开始使用交互 API 中的深度研究功能

Deep Research and Deep Research Max are available starting today in public preview via paid tiers in the Gemini API. Head over to our [developer documentation](https://ai.google.dev/gemini-api/docs/deep-research) to start building with Deep Research using the [Interactions API](https://blog.google/technology/developers/interactions-api). Deep Research and Deep Research Max will also soon be available to startups and enterprises in Google Cloud.从今天起，Deep Research 和 Deep Research Max 将在 Gemini API 中以付费层级的形式公开预览。请前往我们的[开发者文档](https://ai.google.dev/gemini-api/docs/deep-research)开始使用 Deep Research 构建[交互 API](https://blog.google/technology/developers/interactions-api) Deep Research 和 Deep Research Max 也将很快在 Google Cloud 上向初创公司和企业开放。