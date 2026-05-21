     浏览器自动化：从GUI到OpenCLI
===================

原创 明径 阿里云开发者 2026-04-14 08:30 浙江

> 原文地址: [https://mp.weixin.qq.com/s/-ARMTu\_h7KbFMvVMnMJghA](https://mp.weixin.qq.com/s/-ARMTu_h7KbFMvVMnMJghA)

![](https://mmbiz.qpic.cn/mmbiz_jpg/Z6bicxIx5naLeUdT72icEw9Aa7Y4ezXShVUddbJnCBdxMIiaP9M60YxJyIw6G9dibPYiaAI4q4bibFy0FHUNUicMPuDNg/640?wx_fmt=jpeg&from=appmsg)

阿里妹导读

  

文章讲述放弃不稳定的前端UI自动化操作，采用解析并复现底层API请求的方式，来解决浏览器自动化的效率与稳定性难题。（文章内容基于作者个人技术实践与独立思考，旨在分享经验，仅代表个人观点。）

为什么我们需要浏览器自动化

如今大量业务系统都跑在浏览器里——运营配置后台、工单处理系统、发布运维平台。如果能让这些系统自动运转，对提效和智能化运营的价值不言而喻。

但现实是，Agent 想操控浏览器，路并不好走。

现有方案的困境

![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/j7RlD5l5q1xM6iaYwTHfsc3XCdsKG4tyjwweL2p8sfxicAcfaicibOE5vWIpHpjQLJYQKjVu9dQoNRdtTSU4nn5avwFxuOWQujG8WI3TibjELibBA/640?wx_fmt=jpeg)

OpenCLI 的思路

核心想法很简单：不跟网页界面较劲，直接抓它背后的 API。

浏览器里看到的数据，本质上都是前端从某个接口拿回来的。把这个接口找出来、把请求复现出来，比点按钮靠谱得多。

**快速上手**

    npm install -g @jackwener/opencli

直接使用：

    opencli list                              

**原理分析**

### AI Agent 探索工作流

步骤

工具

做什么

0\. 打开浏览器

`browser_navigate`

导航到目标页面

1\. 观察页面

`browser_snapshot`

观察可交互元素（按钮/标签/链接）

2\. 首次抓包

`browser_network_requests`

筛选 JSON API 端点，记录 URL pattern

3\. 模拟交互

`browser_click` + `browser_wait_for`

点击"字幕""评论""关注"等按钮

4\. 二次抓包

`browser_network_requests`

对比步骤 2，找出新触发的 API

5\. 验证 API

`browser_evaluate`

`fetch(url, {credentials:'include'})` 测试返回结构

6\. 写代码

—

基于确认的 API 写适配器

### 懒加载机制

    > [!CAUTION]

### 五级认证策略

OpenCLI 提供 5 级认证策略。使用 `cascade` 命令自动探测：

    opencli cascade https://api.example.com/hot

策略决策树：

    直接 fetch(url) 能拿到数据？

### 适配器

    你的 pipeline 里有 evaluate 步骤（内嵌 JS 代码）？

![](https://mmbiz.qpic.cn/sz_mmbiz_png/j7RlD5l5q1ypXTOXfK87ArFYuDaPNT9e2MicRG7kOLpx0jibKgTHlGw0ScTQu0c6AYic1YuRNMjicxsgFNOAdYZdAk1ENxxhee9iahAF196aYWPs/640?wx_fmt=png&from=appmsg)

### 外部CLI集成

也支持现有CLI直接集成到OpenCLI

![](https://mmbiz.qpic.cn/sz_mmbiz_png/j7RlD5l5q1xm9DIibPpgGSKg7gdibpyATAWgP6XEA9O6lUSfFH0K2fP8iayDGhFQL8SRtElyrGvXpSsEyZBWkhjlCLVLLliciczc3gBmcU6V8c1U/640?wx_fmt=png&from=appmsg)

### CLI执行流程

下图展示从启动到执行的关键路径：入口加载命令清单，构建注册表；执行阶段根据策略与浏览器需求选择适配器或管道步骤，完成数据采集与输出。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/j7RlD5l5q1xnT7adcur8b3Np5kj5sL5h6ztuyoicNCpiah8DVwD2FClwJ0vH5sLziapLGlpdGcsgemAcardFP8ee4JGicercnuIpwmyiaHqH0Wqc/640?wx_fmt=png&from=appmsg)

**自动生成CLI**

### AI 原生生成CLI流程

1.探索与分析：explore 深度抓取页面、自动滚动、拦截网络请求、识别框架与状态管理、推断能力与推荐参数。

2.策略选择：根据鉴权头/签名等特征自动选择策略（public/cookie/header/intercept/store-action）。

3.适配器合成：synthesize 基于探索产物生成候选 YAML，自动模板化 URL、字段映射与参数默认值。

4.测试与验证：generate 串联探索→合成→注册→验证，支持目标化选择与回退策略。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/j7RlD5l5q1wtsFFAV08sdQOyX5R8nV8ehlFd1JE9gwXg1xRmAwJgNic8PRmQukWVaqNzee8p0RfXQNVy6fKytskbbjjeQupVupB8hyd9Qzjk/640?wx_fmt=png&from=appmsg)

Record操作录制

opencli record 采用“浏览器录制 - 智能回放”模式：启动浏览器后，捕获用户在目标 URL 上的交互行为及产生的网络请求。系统通过对请求序列进行评分排序与语义分析，自动生成可复用的 CLI 命令。

执行流程如下图所示：

![](https://mmbiz.qpic.cn/sz_mmbiz_png/j7RlD5l5q1zCBAepHIq1QoFtzO7fn40Bib9DxwBed00fRyJMZcvKdcu6hlFXdsYLZOvTfrHice0lYGfWRPicxRbB8xqvXnxz8GLTP13EsiaRbc4/640?wx_fmt=png&from=appmsg)

当前局限性：

*   请求体（Payload）缺失：目前的录制引擎仅捕获请求元数据（url, method, body: responseBody），未能完整提取 POST/PUT 等写操作中的 Request Body。
    
*   生成能力受限：由于缺乏关键参数载荷，自动化脚本生成逻辑目前仅能覆盖只读类接口（如列表查询、详情获取并输出 YAML），无法有效支撑写操作类接口（如创建、更新、删除）的命令生成，导致自动化闭环在“写入场景”中断。
    

### QoderWork自动生成CLI

为了方便自动生成CLI命令，我整理了如下的Skill，其中CLI-ONESHOT.md和CLI-EXPLORER.md可在开源项目中自行下载。

SKILL.md

    ---

![](https://mmbiz.qpic.cn/sz_mmbiz_png/j7RlD5l5q1yY2X1gqkyLHZzAZzicaIBk9fLLiboyVkfohZEAro55iaWA7lU921x8e2iaTzsxjYmoO9SPsWYqaSvRwYWsplQEnJeOEfDiaWp4N0zU/640?wx_fmt=png&from=appmsg)

**使用case：**

### 内部会画平台CLI化

![](https://mmbiz.qpic.cn/mmbiz_png/j7RlD5l5q1yKRfiaBLnj6ZvK8AGJcbxWucMJovSaSQLGq7AGhnIaOwF6MxvXNAtOrLFv9bUInxFI2XrvqxrZumBp7jzjVQHpNibD4rXpraC20/640?wx_fmt=png&from=appmsg)

![](https://mmbiz.qpic.cn/sz_mmbiz_png/j7RlD5l5q1wmPBQdPXBeWiaibWs3JoEmuia3MeQIUicKROEf8OVCgx79Zicn3DmW8BzRrvPycic3Vfa46DrV9rNs10A04FAiaricy5y9nw5xmsKibqWU/640?wx_fmt=png&from=appmsg)

### BOSS招聘自动化案例展示

1.帮我和候选人沟通

![](https://mmbiz.qpic.cn/sz_mmbiz_png/j7RlD5l5q1znmpYyfWOnRW4zia2XKc9xFuOHqss2yTtUy73g3RfWuppeTMibcW8FWZUZic7ztricVZK7FnxCm5pibyqPp9Bw8McG4FRBjK7ibLBQA/640?wx_fmt=png&from=appmsg)

2.统计招聘数据

![](https://mmbiz.qpic.cn/mmbiz_png/j7RlD5l5q1ySmIrGFPbcFNooD3v3LoP6UEJmjMXMicmpTzYwOoNqXYJXqhFM8v0up4VHIjFxO7jYU6PKRPS9bC5TZCW1uI6tuHtQZoibQ9jZY/640?wx_fmt=png&from=appmsg)

未来软件竞争维度：从界面到可调用性

未来的软件，不会只服务人，也会服务 Agent。

以前我们评价一个 SaaS，看的是界面顺不顺、按钮好不好点。但 Agent 不会欣赏你的按钮做得多圆。它只在乎一件事：能不能稳定调用你。

GUI 是给人用的。API 是能力底座。而 Agent 最喜欢的，其实是更清晰的执行面：命令、参数、返回值、失败原因。

未来软件可能会多一个新竞争维度：不是谁页面更好看。而是谁更容易被 Agent 理解、调用、验证，再接进工作流。唯有如此，才更有机会成为下一代工作流里的基础节点。

过去的软件竞争界面，未来的软件竞争可调用性。

![](http://mmbiz.qpic.cn/mmbiz_png/j7RlD5l5q1zsMO0HEywEjicRXGH5MTLyLhxbAz1qQ3U4jPFnrdGQbFPOXKYT6A4D6R48bZNzIAHDcCNyLTRBO4bnd0UrLrEtD2lWB6gKr6EE/0?wx_fmt=png) 阿里云开发者

 ![](data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3C!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE --%3E%3Cg fill='none' stroke='%23888888' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'%3E%3Cpath d='M2.062 12.348a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 19.876 0a1 1 0 0 1 0 .696a10.75 10.75 0 0 1-19.876 0'/%3E%3Ccircle cx='12' cy='12' r='3'/%3E%3C/g%3E%3C/svg%3E) 阅读![](data:image/svg+xml,%3Csvg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M16.154 6.797l-.177 2.758h4.009c1.346 0 2.359 1.385 2.155 2.763l-.026.148-1.429 6.743c-.212.993-1.02 1.713-1.977 1.783l-.152.006-13.707-.006c-.553 0-1-.448-1-1v-8.58a1 1 0 0 1 1-1h2.44l1.263-.03.417-.018.168-.015.028-.005c1.355-.315 2.39-2.406 2.58-4.276l.01-.16.022-.572.022-.276c.074-.707.3-1.54 1.08-1.883 2.054-.9 3.387 1.835 3.274 3.62zm-2.791-2.52c-.16.07-.282.294-.345.713l-.022.167-.019.224-.023.604-.014.204c-.253 2.486-1.615 4.885-3.502 5.324l-.097.018-.204.023-.181.012-.256.01v8.218l9.813.004.11-.003c.381-.028.72-.304.855-.709l.034-.125 1.422-6.708.02-.11c.099-.668-.354-1.308-.87-1.381l-.098-.007h-5.289l.26-4.033c.09-1.449-.864-2.766-1.594-2.446zM7.5 11.606l-.21.005-2.241-.001v8.181l2.45.001v-8.186z' fill='%23000'/%3E%3C/svg%3E) 赞 ![](data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E  %3Cg fill='none' fill-rule='evenodd'%3E    %3Cpath d='M0 0h24v24H0z'/%3E    %3Cpath fill='%23576B95' d='M13.707 3.288l7.171 7.103a1 1 0 0 1 .09 1.32l-.09.1-7.17 7.104a1 1 0 0 1-1.705-.71v-3.283c-2.338.188-5.752 1.57-7.527 5.9-.295.72-1.02.713-1.177-.22-1.246-7.38 2.952-12.387 8.704-13.294v-3.31a1 1 0 0 1 1.704-.71zm-.504 5.046l-1.013.16c-4.825.76-7.976 4.52-7.907 9.759l.007.287c1.594-2.613 4.268-4.45 7.332-4.787l1.581-.132v4.103l6.688-6.623-6.688-6.623v3.856z'/%3E  %3C/g%3E%3C/svg%3E) 分享 ![](data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='24' height='24' viewBox='0 0 24 24'%3E  %3Cdefs%3E    %3Cpath id='a62bde5b-af55-42c8-87f2-e10e8a48baa0-a' d='M0 0h24v24H0z'/%3E  %3C/defs%3E  %3Cg fill='none' fill-rule='evenodd'%3E    %3Cmask id='a62bde5b-af55-42c8-87f2-e10e8a48baa0-b' fill='%23fff'%3E      %3Cuse xlink:href='%23a62bde5b-af55-42c8-87f2-e10e8a48baa0-a'/%3E    %3C/mask%3E    %3Cg mask='url(%23a62bde5b-af55-42c8-87f2-e10e8a48baa0-b)'%3E      %3Cg transform='translate(0 -2.349)'%3E        %3Cpath d='M0 2.349h24v24H0z'/%3E        %3Cpath fill='%23576B95' d='M16.45 7.68c-.954 0-1.94.362-2.77 1.113l-1.676 1.676-1.853-1.838a3.787 3.787 0 0 0-2.63-.971 3.785 3.785 0 0 0-2.596 1.112 3.786 3.786 0 0 0-1.113 2.687c0 .97.368 1.938 1.105 2.679l7.082 6.527 7.226-6.678a3.787 3.787 0 0 0 .962-2.618 3.785 3.785 0 0 0-1.112-2.597A3.687 3.687 0 0 0 16.45 7.68zm3.473.243a4.985 4.985 0 0 1 1.464 3.418 4.98 4.98 0 0 1-1.29 3.47l-.017.02-7.47 6.903a.9.9 0 0 1-1.22 0l-7.305-6.73-.008-.01a4.986 4.986 0 0 1-1.465-3.535c0-1.279.488-2.56 1.465-3.536A4.985 4.985 0 0 1 7.494 6.46c1.24-.029 2.49.4 3.472 1.29l.01.01L12 8.774l.851-.85.01-.01c1.046-.951 2.322-1.434 3.59-1.434 1.273 0 2.52.49 3.472 1.442z'/%3E      %3C/g%3E    %3C/g%3E  %3C/g%3E%3C/svg%3E) 推荐 ![](data:image/svg+xml,%3Csvg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M22.242 7a2.5 2.5 0 0 0-2.5-2.5h-14a2.5 2.5 0 0 0-2.5 2.5v8.5a2.5 2.5 0 0 0 2.5 2.5h2.5v1.59a1 1 0 0 0 1.707.7l1-1a.569.569 0 0 0 .034-.03l1.273-1.273a.6.6 0 0 0-.8-.892v-.006L9.441 19.1l.001-2.3h-3.7l-.133-.007A1.3 1.3 0 0 1 4.442 15.5V7l.007-.133A1.3 1.3 0 0 1 5.742 5.7h14l.133.007A1.3 1.3 0 0 1 21.042 7v4.887a.6.6 0 1 0 1.2 0V7z' fill='%23000' fill-opacity='.9'/%3E%3Crect x='14.625' y='16.686' width='7' height='1.2' rx='.6' fill='%23000' fill-opacity='.9'/%3E%3Crect x='18.725' y='13.786' width='7' height='1.2' rx='.6' transform='rotate(90 18.725 13.786)' fill='%23000' fill-opacity='.9'/%3E%3C/svg%3E) 留言