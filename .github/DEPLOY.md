# 部署到 GitHub Pages（大约 2 分钟，全是点鼠标）

目标：让这个仓库每次更新后，自动生成并发布知识库网站到
**https://gmg0829.github.io/second-brain/**

---

## 需要上传的 5 个文件

本文件夹里的：

```
.github/workflows/pages.yml     ← 自动构建+发布的配置
build.js                        ← 生成网站的脚本
categories.json                 ← 分类配置
package.json
web/index.html                  ← 网站界面
```

> `.github` 是隐藏文件夹，浏览器里可能看不到。如果你用「拖拽上传」把 `.github` 拖不进去，
> 就用下面第 3 步的「手动新建文件」方式创建它。

---

## 步骤

### 1. 打开你的仓库
浏览器打开 <https://github.com/gmg0829/second-brain>

### 2. 上传文件
点右上角 **Add file → Upload files**，
把上面 5 个文件（连同 `web/`、`.github/` 的目录结构）拖进网页，然后点绿色 **Commit changes**。

- 如果 `.github` 拖不进去 → 见第 3 步。
- 如果提示 `build.js` 已存在 → 直接覆盖（它就是新版本）。

### 3.（仅当 `.github` 没上传成功时）手动建 workflow 文件
在仓库页点 **Add file → Create new file**，文件名输入框里粘贴这一整串（斜杠会自动建目录）：

```
.github/workflows/pages.yml
```

然后把本文件夹里 `.github/workflows/pages.yml` 的内容整个复制进去，**Commit changes**。

### 4. 打开 Pages
仓库页 → **Settings**（顶部）→ 左侧 **Pages**

- **Source** 选 **GitHub Actions**（不要选 "Deploy from a branch"）

### 5. 等 1～2 分钟
点顶部 **Actions** 标签，会看到一个叫 **Deploy knowledge base** 的任务在跑。
变绿之后，访问：

**https://gmg0829.github.io/second-brain/**

---

## 之后怎么更新

你往这个仓库里加/改任何 Markdown 笔记，推上去后**会自动重新构建发布**，不用再管。
也可以在 Actions 页面点 **Run workflow** 手动触发一次。

---

## 常见问题

**Q：Actions 报错 "Get Pages site failed" / "Not Found"**
A：说明第 4 步的 Source 还没切成 **GitHub Actions**，切完重新跑一次。

**Q：仓库是私有的能用吗？**
A：私有仓库的 Pages 需要 GitHub Pro；这个仓库是公开的，免费可用。

**Q：网站打开是 404？**
A：等 Actions 跑完（1～2 分钟）再看；确认访问的是 `/second-brain/` 结尾带斜杠。

**Q：不想用 Actions，只想放现成的网页**
A：把 `second-brain-site.zip` 解压后的内容传到任意静态托管（Cloudflare Pages / Vercel / 自己的服务器）也行，不需要仓库和构建。
