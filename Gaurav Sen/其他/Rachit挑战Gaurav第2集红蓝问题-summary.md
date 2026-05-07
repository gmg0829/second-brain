# Rachit Challenges Gaurav - Episode 2 | Red and Blue

**视频ID**: TANimxJJ4JE
**频道**: Gaurav Sen
**原始URL**: https://www.youtube.com/watch?v=TANimxJJ4JE

## 内容概要

这道概率谜题出自"Rachit Challenges Gaurav"系列第二期，最初是一道JP Morgan面试题。游戏规则很简单：有两个罐子和100张纸条——50张红色、50张蓝色。Gaurav可以随意将这些纸条分配到两个罐子中（每罐纸条数量不限，只要总数为100即可）。分配完成后，Rachit随机选择一个罐子并从中抽取一张纸条——如果抽到蓝色则Rachit获胜，抽到红色则Gaurav获胜。问题是：Gaurav如何分配纸条能让自己获胜的概率超过50%？

直觉上，如果简单地将纸条均分——每个罐子放25张红色和25张蓝色——那么获胜概率正好是50%。因为无论选哪个罐子，抽到蓝色的概率都是1/2。

但通过仔细分析可以发现关键洞察：如果把某个罐子只放1张红色纸条（不放蓝色），而另一个罐子放剩下的49张红色和全部50张蓝色，那么当Rachit恰好选择了那个"只有1张红色"的罐子时，Gaurav必胜（因为不可能抽到蓝色）；而当Rachit选择了另一个罐子时，由于该罐子有99张纸条（49红+50蓝），抽到蓝色的概率约为50/99，接近但略高于50%。综合计算：选择第一个罐子的概率是1/2（此时Gaurav必胜），选择第二个罐子的概率也是1/2（此时Rachit获胜概率为50/99）。因此Gaurav的获胜概率为：1/2 + (1/2) × (49/99) ≈ 75%。

## 核心观点/知识点

- **随机分配的局限**：均分策略只能带来50%的胜率，无法优化
- **极端分配策略**：将一个罐子"极端化"（只放1张红色），另一个罐子放剩余所有纸条
- **概率计算分解**：将问题分解为两个罐子的独立概率计算再加权求和
- **直觉陷阱**：人们往往认为50/50应该均分，但极端分配反而能获得优势
- **面试题价值**：这道题考察的是概率分析和优化思维，而非复杂算法

## 关键语录

> "So I can get more than 50%? Let's try the different combinations."

> "I'm wasting a lot of chips here, job this extra chips. Anytime a person puts their hand into this jar I just need one chip... for it to be 100%."

> "I'm getting half over here and I'm getting a half into 49 by 99 which is around half so this will be about 1 by 4 which is 75% chance of winning."
