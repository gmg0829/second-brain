#!/usr/bin/env node
/**
 * second-brain → 知识库静态站点生成器（零依赖，按 product-spec-v1 实现）
 *
 * 产物：
 *   public/data/index.json    文档元数据 + 分类/分组/标签统计
 *   public/data/docs/<id>.html 每篇渲染后的正文（含 TOC 锚点）
 *   public/data/search.json   懒加载全文搜索索引
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = __dirname;
// NOTES_DIR=. 表示「笔记仓库就是本仓库」（GitHub Actions 里用）
const REPO = process.env.NOTES_DIR
  ? path.resolve(ROOT, process.env.NOTES_DIR)
  : path.resolve(ROOT, "..", "second-brain");
const CATS_FILE = [path.resolve(ROOT, "categories.json"), path.resolve(ROOT, "..", "categories.json")]
  .find((p) => fs.existsSync(p));
if (!CATS_FILE) { console.error("找不到 categories.json"); process.exit(1); }
const CATS = JSON.parse(fs.readFileSync(CATS_FILE, "utf8"));
const OUT = path.resolve(ROOT, "public");
const DATA = path.join(OUT, "data");
const DOCS = path.join(DATA, "docs");

const CAT_BY_DIR = new Map(CATS.categories.map((c) => [c.dir, c]));
const GROUP_BY_ID = new Map(CATS.groups.map((g) => [g.id, g]));
const TYPE_BY_ID = new Map(CATS.documentTypes.map((t) => [t.id, t]));

let GEN_AT = "1970-01-01T00:00:00Z";
try { GEN_AT = execSync(`git -C ${JSON.stringify(REPO)} log -1 --format=%cI`, { encoding: "utf8", stdio: ["ignore","pipe","ignore"] }).trim() || GEN_AT; } catch (e) {}
const GEN_YEAR = parseInt((GEN_AT.match(/^(\d{4})/) || [])[1] || "", 10) || 0;
const MAX_YEAR = Math.max(GEN_YEAR, new Date().getFullYear());
const MIN_YEAR = 2015;
const inYearRange = (y) => { const n = parseInt(y, 10); return n >= MIN_YEAR && n <= MAX_YEAR; };
const pad2 = (n) => String(n).padStart(2, "0");
const validYMD = (y, m, d) => {
  const Y = +y, M = m === undefined ? null : +m, D = d === undefined ? null : +d;
  if (!inYearRange(Y)) return false;
  if (M !== null && (M < 1 || M > 12)) return false;
  if (D !== null && (D < 1 || D > 31)) return false;
  return true;
};

function extractDate(meta, bodyText) {
  const fm = String(meta.published || meta.date || meta.created || "").trim();
  if (fm) {
    let m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(fm);
    if (m && validYMD(m[1], m[2], m[3])) return { date: `${m[1]}-${pad2(m[2])}-${pad2(m[3])}`, source: "frontmatter", confidence: "high" };
    m = /^(\d{4})-(\d{1,2})$/.exec(fm);
    if (m && validYMD(m[1], m[2])) return { date: `${m[1]}-${pad2(m[2])}`, source: "frontmatter", confidence: "high" };
    m = /^(\d{4})$/.exec(fm);
    if (m && inYearRange(m[1])) return { date: m[1], source: "frontmatter", confidence: "medium" };
    // non-date value (e.g. "AI Ascent 2026")：只取合理年份，标为低置信
    m = /(20\d{2})/.exec(fm);
    if (m && inYearRange(m[1])) return { date: m[1], source: "frontmatter-label", confidence: "low" };
  }
  // 正文兜底只看向开头 3000 字（避免把正文里的历史年份当成发布日期）
  const head = bodyText.slice(0, 3000);
  let m = /(\d{4})-(\d{2})-(\d{2})(?!\d)/.exec(head);
  if (m && validYMD(m[1], m[2], m[3])) return { date: `${m[1]}-${m[2]}-${m[3]}`, source: "body", confidence: "medium" };
  m = /(\d{4})年(\d{1,2})月(\d{1,2})日/.exec(head);
  if (m && validYMD(m[1], m[2], m[3])) return { date: `${m[1]}-${pad2(m[2])}-${pad2(m[3])}`, source: "body", confidence: "medium" };
  m = /(\d{4})年(\d{1,2})月/.exec(head);
  if (m && validYMD(m[1], m[2])) return { date: `${m[1]}-${pad2(m[2])}`, source: "body", confidence: "medium" };
  m = /(\d{4})-(\d{1,2})(?![\d-])/.exec(head);
  if (m && validYMD(m[1], m[2])) return { date: `${m[1]}-${pad2(m[2])}`, source: "body", confidence: "medium" };
  const yrs = [...bodyText.matchAll(/(20\d{2})/g)].map((x) => x[1]).filter(inYearRange);
  if (yrs.length) return { date: yrs[0], source: "body-year", confidence: "low" };
  return { date: "", source: "none", confidence: "none" };
}

// ---------- utils ----------
const escapeHtml = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
  .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const escapeAttr = (s) => escapeHtml(s).replace(/'/g, "&#39;");
const stripMd = (s) => String(s)
  .replace(/```[\s\S]*?```/g, " ")
  .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
  .replace(/[*_`#>|]/g, "")
  .replace(/\s+/g, " ").trim();

function walk(dir) {
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    if ([".git", "node_modules", "public", "dist", "web", ".github"].includes(name)) continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) out.push(...walk(p));
    else if (name.toLowerCase().endsWith(".md")) out.push(p);
  }
  return out;
}

// ---------- frontmatter ----------
function parseFrontmatter(raw) {
  if (!raw.startsWith("---")) return { meta: {}, body: raw };
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return { meta: {}, body: raw };
  const block = raw.slice(3, end).replace(/^\r?\n/, "");
  const body = raw.slice(end + 4).replace(/^\r?\n/, "");
  const meta = {};
  const lines = block.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const m = /^([A-Za-z_][\w-]*)\s*:\s*(.*)$/.exec(lines[i]);
    if (!m) continue;
    const key = m[1];
    let val = m[2].trim();
    if (val === "") {
      // maybe a list
      const list = [];
      let j = i + 1;
      while (j < lines.length && /^\s*-\s+/.test(lines[j])) {
        list.push(lines[j].replace(/^\s*-\s+/, "").replace(/^["']|["']$/g, "").trim());
        j++;
      }
      if (list.length) { meta[key] = list; i = j - 1; continue; }
      meta[key] = "";
      continue;
    }
    meta[key] = val.replace(/^["']|["']$/g, "").trim();
  }
  return { meta, body };
}

// ---------- inline markdown ----------
function inline(text) {
  const codes = [];
  text = text.replace(/`([^`]+)`/g, (_, c) => { codes.push(c); return `\u0000${codes.length - 1}\u0000`; });
  text = escapeHtml(text);
  text = text.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g, (_, alt, url) => {
    if (/youtube\.com|youtu\.be/.test(url)) {
      return `<a class="video-ref" href="${escapeAttr(url)}" target="_blank" rel="noopener">▶ 视频</a>`;
    }
    return `<img src="${escapeAttr(url)}" alt="${escapeAttr(alt)}" loading="lazy">`;
  });
  text = text.replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g,
    (_, t, url) => `<a href="${escapeAttr(url)}" target="_blank" rel="noopener">${t}</a>`);
  text = text.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  text = text.replace(/__([^_]+)__/g, "<strong>$1</strong>");
  text = text.replace(/(^|[\s(\[{（【，。、；：！？,;:])\*([^\s*][^*\n]*?)\*(?=[\s)\]}.。，、；：！？,;:]|$)/g, "$1<em>$2</em>");
  text = text.replace(/(^|[^_\w])_([^_\n]+)_(?=[\s.,;:!?。，；：！？)]|$)/g, "$1<em>$2</em>");
  text = text.replace(/~~([^~]+)~~/g, "<del>$1</del>");
  text = text.replace(/\u0000(\d+)\u0000/g, (_, n) => `<code>${escapeHtml(codes[+n])}</code>`);
  return text;
}

// ---------- block markdown ----------
function slugifyHeading(text) {
  return stripMd(text).toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "sec";
}

function isTableSep(line) {
  return /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)+\|?\s*$/.test(line);
}
function splitRow(line) {
  let s = line.trim();
  if (s.startsWith("|")) s = s.slice(1);
  if (s.endsWith("|")) s = s.slice(0, -1);
  return s.split("|").map((c) => c.trim());
}

function renderBlocks(lines, toc) {
  const out = [];
  let i = 0;
  let guard = 0;
  const GUARD_MAX = lines.length * 50 + 1000;
  while (i < lines.length) {
    if (++guard > GUARD_MAX) throw new Error("renderBlocks guard at " + JSON.stringify(lines[i]));
    const line = lines[i];

    if (/^\s*$/.test(line)) { i++; continue; }

    if (/^\s*```/.test(line)) {
      const lang = line.replace(/^\s*```/, "").trim();
      const buf = [];
      i++;
      while (i < lines.length && !/^\s*```/.test(lines[i])) buf.push(lines[i++]);
      i++;
      out.push(`<pre><code${lang ? ` class="language-${escapeAttr(lang)}"` : ""}>${escapeHtml(buf.join("\n"))}</code></pre>`);
      continue;
    }

    const hm = /^\s*(#{1,6})\s+(.*?)\s*#*\s*$/.exec(line);
    if (hm) {
      const lvl = hm[1].length;
      if (lvl > 1) {
        const text = hm[2];
        const id = slugifyHeading(text);
        if (lvl <= 3 && toc) toc.push({ level: lvl, text: stripMd(text), id });
        out.push(`<h${lvl} id="${id}">${inline(text)}</h${lvl}>`);
      } else {
        out.push(`<h1>${inline(hm[2])}</h1>`);
      }
      i++;
      continue;
    }

    if (/^\s*(-{3,}|\*{3,}|_{3,})\s*$/.test(line)) { out.push("<hr>"); i++; continue; }

    if (line.includes("|") && i + 1 < lines.length && isTableSep(lines[i + 1])) {
      const head = splitRow(line);
      i += 2;
      const rows = [];
      while (i < lines.length && lines[i].includes("|") && !/^\s*$/.test(lines[i])) { rows.push(splitRow(lines[i])); i++; }
      out.push("<table><thead><tr>" + head.map((c) => `<th>${inline(c)}</th>`).join("") +
        "</tr></thead><tbody>" +
        rows.map((r) => "<tr>" + r.map((c) => `<td>${inline(c)}</td>`).join("") + "</tr>").join("") +
        "</tbody></table>");
      continue;
    }

    if (/^\s*>/.test(line)) {
      const buf = [];
      while (i < lines.length && /^\s*>/.test(lines[i])) { buf.push(lines[i].replace(/^\s*>\s?/, "")); i++; }
      out.push(`<blockquote>${renderBlocks(buf, null).join("")}</blockquote>`);
      continue;
    }

    if (/^\s*([-*+]|\d+\.)\s+/.test(line)) {
      const res = renderList(lines, i, toc);
      out.push(res.html);
      i = res.next;
      continue;
    }

    const buf = [];
    while (i < lines.length && !/^\s*$/.test(lines[i]) &&
           !/^\s*(#{1,6}\s|```|>|([-*+]|\d+\.)\s)/.test(lines[i]) &&
           !(lines[i].includes("|") && i + 1 < lines.length && isTableSep(lines[i + 1]))) {
      buf.push(lines[i]); i++;
    }
    if (!buf.length) { out.push(`<p>${inline(line)}</p>`); i++; continue; }
    out.push(`<p>${inline(buf.join("\n"))}</p>`);
  }
  return out;
}

function renderList(lines, start, toc) {
  const first = /^(\s*)([-*+]|\d+\.)\s+/.exec(lines[start]);
  const baseIndent = first[1].length;
  const ordered = /\d+\./.test(first[2]);
  const items = [];
  let i = start;
  let inFence = false;

  while (i < lines.length) {
    const line = lines[i];
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      if (items.length) items[items.length - 1].push(line.slice(baseIndent + 2));
      i++; continue;
    }
    if (inFence) {
      if (items.length) items[items.length - 1].push(line.slice(baseIndent + 2));
      i++; continue;
    }
    const m = /^(\s*)([-*+]|\d+\.)\s+(.*)$/.exec(line);
    if (m && m[1].length === baseIndent) { items.push([m[3]]); i++; continue; }
    if (m && m[1].length > baseIndent && items.length) {
      items[items.length - 1].push(line.slice(baseIndent + 2)); i++; continue;
    }
    if (/^\s*$/.test(line)) {
      let k = i + 1;
      while (k < lines.length && /^\s*$/.test(lines[k])) k++;
      const nm = /^(\s*)([-*+]|\d+\.)\s+/.exec(lines[k] || "");
      if (nm && nm[1].length >= baseIndent) { i = k; continue; }
      break;
    }
    if (items.length && /^\s{2,}/.test(line)) {
      items[items.length - 1].push(line.slice(baseIndent + 2)); i++; continue;
    }
    break;
  }

  const tag = ordered ? "ol" : "ul";
  const html = `<${tag}>` + items.map((itemLines) => {
    const inner = renderBlocks(itemLines, toc).join("");
    return `<li>${inner}</li>`;
  }).join("") + `</${tag}>`;
  return { html, next: i };
}

// ---------- doc parsing ----------
function normalizeDate(v) {
  if (!v) return "";
  const s = String(v).trim();
  let m = /^(\d{4})-(\d{1,2})-(\d{1,2})/.exec(s);
  if (m) return `${m[1]}-${String(m[2]).padStart(2,"0")}-${String(m[3]).padStart(2,"0")}`;
  m = /^(\d{4})-(\d{1,2})$/.exec(s);
  if (m) return `${m[1]}-${String(m[2]).padStart(2,"0")}`;
  m = /^(\d{4})/.exec(s);
  if (m) return m[1];
  return s;
}
function parseDoc(file) {
  const raw = fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n");
  const rel = path.relative(REPO, file).replace(/\\/g, "/");
  const parts = rel.split("/");
  const topDir = parts.length > 1 ? parts[0] : "__meta__";
  const cat = CAT_BY_DIR.get(topDir) || CAT_BY_DIR.get("__meta__");
  const subDir = parts.length > 2 ? parts[1] : "";
  const sub = (cat.subcategories || []).find((s) => s.dir === subDir);

  const { meta, body } = parseFrontmatter(raw);
  const lines = body.split("\n");

  // all H1s
  const h1s = [];
  for (const l of lines) {
    const m = /^#\s+(.*?)\s*$/.exec(l);
    if (m) h1s.push(m[1].replace(/\s*#+$/, "").trim());
  }
  const fileBase = path.basename(file, ".md").replace(/-summary$/i, "");
  let title = meta.title || h1s[0] || fileBase;
  let subtitle = "";
  let hasPair = false;
  if (h1s.length >= 2) {
    const [a, b] = h1s;
    const aIsCjk = /[\u4e00-\u9fa5]/.test(a);
    const bIsCjk = /[\u4e00-\u9fa5]/.test(b);
    if (aIsCjk && !bIsCjk) { title = a; subtitle = b; hasPair = true; }
    else if (!aIsCjk && bIsCjk) { title = b; subtitle = a; hasPair = true; }
    else if (meta.subtitle) { subtitle = meta.subtitle; }
  }
  const bilingual = /双语/.test(path.basename(file)) || hasPair;

  // metadata
  const bodyText = body;
  const firstUrl = (/https?:\/\/[^\s)）>\]]+/.exec(bodyText) || [""])[0];
  const source = meta.source || meta.channel || meta.url || meta.link || "";
  const url = (/^https?:/.test(meta.url || "") ? meta.url : (/^https?:/.test(meta.source || "") ? meta.source : "")) || firstUrl;
  const subAsAuthor = ["podcast", "interview"].includes(cat.type);
  let author = meta.author || (sub && subAsAuthor ? sub.name : "");
  const dt = extractDate(meta, bodyText);
  const date = dt.date;
  const dateSource = dt.source;
  const dateConfidence = dt.confidence;

  let tags = Array.isArray(meta.tags) ? meta.tags : (meta.tags ? [meta.tags] : []);
  tags = tags.flatMap((t) => String(t).replace(/^\[|\]$/g, "").split(","))
    .map((t) => t.trim().replace(/^["']|["']$/g, "")).filter(Boolean);

  // body start: skip title/subtitle H1s + metadata blockquote block
  let bodyStart = 0;
  const skipBlank = () => { while (bodyStart < lines.length && /^\s*$/.test(lines[bodyStart])) bodyStart++; };
  skipBlank();
  for (;;) {
    const hm2 = /^#\s+(.*?)\s*$/.exec(lines[bodyStart] || "");
    if (!hm2) break;
    const t = hm2[1].replace(/\s*#+$/, "").trim();
    if (h1s.includes(t)) { bodyStart++; skipBlank(); continue; }
    break;
  }
  while (bodyStart < lines.length && /^\s*>/.test(lines[bodyStart])) { bodyStart++; skipBlank(); }

  // description
  const META = /^(频道|日期|活动|原标题|视频标题|视频链接|视频来源|原始URL|视频URL|原文链接|来源|URL|链接|作者|讲师|主讲|Speaker|Source|Date|Published|时长|语言|分类|标签)[:：]/;
  const deLead = (t) => t.replace(/[*_]/g, "").trim();
  let desc = meta.description || "";
  if (!desc) {
    const bl = lines.slice(bodyStart);
    for (const l0 of bl) {
      const l = l0.trim();
      if (!l) continue;
      if (/^(#{1,6}\s|>|\||([-*+]|\d+\.)\s)/.test(l)) continue;
      if (META.test(deLead(l))) continue;
      if (/^[^\s:：]{1,12}[:：]\s*https?:\/\//.test(l)) continue;
      if (/^https?:\/\//.test(l)) continue;
      if (/\[[0-9]{1,2}:[0-9]{2}/.test(l)) continue;
      if (l.length >= 30) { desc = l; break; }
    }
    if (!desc) {
      for (const l0 of bl) {
        const m = /^([-*+]|\d+\.)\s+(.*)$/.exec(l0.trim());
        if (!m) continue;
        if (META.test(deLead(m[2]))) continue;
        if (/^https?:\/\//.test(m[2])) continue;
        const t = m[2].replace(/^\*\*[^*]+\*\*[:：]?\s*/, "");
        if (t.length >= 25) { desc = t; break; }
      }
    }
  }
  desc = stripMd(desc).slice(0, 140);

  // render
  const toc = [];
  const html = renderBlocks(lines.slice(bodyStart), toc).join("");

  // counts
  const plain = stripMd(body);
  const cjk = (plain.match(/[\u4e00-\u9fa5]/g) || []).length;
  const enWords = (plain.replace(/[\u4e00-\u9fa5]/g, " ").match(/[A-Za-z][A-Za-z'-]*/g) || []).length;
  const wordCount = cjk + enWords;
  const readingTime = Math.max(1, Math.ceil(cjk / 400 + enWords / 220));

  const group = GROUP_BY_ID.get(cat.group) || { id: cat.group, name: cat.group };

  return {
    rel, path: rel, title, subtitle, description: desc || "暂无摘要",
    category: cat.slug, categoryName: cat.name, categoryDir: cat.dir,
    group: cat.group, groupName: group.name,
    subcategory: sub ? sub.dir : "", subcategoryName: sub ? sub.name : "",
    tags: tags.filter(Boolean).map(String),
    source, url, author, date, dateSource, dateConfidence,
    type: cat.type, typeName: (TYPE_BY_ID.get(cat.type) || {}).name || cat.type,
    bilingual, readingTime, wordCount,
    html, toc,
    sortKey: date || rel,
  };
}

// ---------- main ----------
function main() {
  fs.rmSync(DATA, { recursive: true, force: true });
  fs.mkdirSync(DOCS, { recursive: true });

  const files = walk(REPO).sort();
  const docs = [];
  const search = {};
  let id = 0;

  for (const file of files) {
    const d = parseDoc(file);
    id++;
    d.id = id;
    fs.writeFileSync(path.join(DOCS, `${id}.html`), d.html);
    search[id] = stripMd(d.html.replace(/<[^>]+>/g, " ")).slice(0, 20000);
    delete d.html;
    docs.push(d);
  }

  // category counts
  const catCount = {}, groupCount = {}, subCount = {}, tagCount = {};
  for (const d of docs) {
    catCount[d.category] = (catCount[d.category] || 0) + 1;
    groupCount[d.group] = (groupCount[d.group] || 0) + 1;
    if (d.subcategory) {
      const k = d.category + "::" + d.subcategory;
      subCount[k] = (subCount[k] || 0) + 1;
    }
    for (const t of d.tags) tagCount[t] = (tagCount[t] || 0) + 1;
  }

  const categories = CATS.categories.map((c) => ({
    slug: c.slug, dir: c.dir, name: c.name, group: c.group,
    icon: c.icon, color: c.color, order: c.order, type: c.type,
    description: c.description,
    count: catCount[c.slug] || 0,
    subcategories: (c.subcategories || []).map((s) => ({
      dir: s.dir, name: s.name, icon: s.icon, count: subCount[c.slug + "::" + s.dir] || 0,
    })),
  }));

  const groups = CATS.groups.map((g) => ({
    id: g.id, name: g.name, nameEn: g.nameEn, count: groupCount[g.id] || 0,
  }));

  const tags = Object.entries(tagCount).sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));

  fs.writeFileSync(path.join(DATA, "index.json"), JSON.stringify({
    generatedAt: GEN_AT,
    total: docs.length,
    groups, categories, tags,
    docs,
  }));

  fs.writeFileSync(path.join(DATA, "search.json"), JSON.stringify(search));
  fs.copyFileSync(path.resolve(ROOT, "web", "index.html"), path.join(OUT, "index.html"));

  console.log(`✓ ${docs.length} docs, ${categories.filter(c=>c.count).length} categories, ${tags.length} tags → ${OUT}`);
}

main();
