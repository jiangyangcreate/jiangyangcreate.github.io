---
sidebar_position: 1
title: 编程外的基础概述
---

# 编程外的基础

常识涵盖编程学习过程中可能遇到的知识，如Markdown、YAML、Terminal、Git等。即便不学习编程，这部分知识也可以帮助你更好的使用一些程序员创造的工具。

## Markdown

Markdown 是一种轻量级标记语言，可用于将格式元素添加到纯文本文档。 Markdown 由 John Gruber 于 2004 年创建，现在是世界上最流行的标记语言之一。

### How to learn Markdown

Markdown 语法丰富，但大部分不完整，缺乏有效的长期示例。 所以选择教程的关键是开源时间长。

[markdowntutorial](https://www.markdowntutorial.com/)

## YAML

Yet Another Markup Language（仍是一种标记语言）

YAML在github/docker等程序员工具被广泛用于定义配置文件，非常简单也很有必要学习。

YAML 的配置文件后缀为 .yml，如：abc.yml

### How to learn YAML

YAML很简单，还在更新中，查看最新的官方文档即可:[yaml](https://yaml.org/)

测试自己的yaml文件是否正确，可以使用[online-yaml-tools](https://onlineyamltools.com/validate-yaml)

将yaml文件转换为json文件，可以使用[https://nodeca.github.io/js-yaml/](https://nodeca.github.io/js-yaml/)

## Terminal

Terminals, 也称为命令行或控制台，使我们能够在我们的计算机上完成和自动化任务，而无需图形用户界面。 终端起源于 1950 年代到 1960 年代左右，从那时起，它一直是所有操作系统的一个不变特征——从台式机到隐藏在云中的服务器，再到像 Raspberry PI Zero 这样的微型计算机，甚至手机。 在大多数情况下，终端、命令行意味着同一件事。

### How to learn Terminal

现在有很多不同的设备，它们对应的Terminal命令也不同。 而且终端命令往往直接单词缩写是猜不出来的，所以在学习终端命令教程的时候需要注意：

- 足够完整
- 使用示例

[网道bash教程](https://wangdoc.com/bash/intro)是开源的bash文档，教科书式的篇章划分能帮助学习者系统的了解终端命令。

[tldr](https://tldr.inbrowser.app/)是社区维护的命令行工具帮助页面合集，支持在线查询终端命令，有不同平台选择，支持不同语言显示

## Git

Git是一个版本控制工具，既可以通过图形化的方式操作，也可以通过命令行来完成。

Git版本管理分为四个板块
*Workspace*Index*Repository*Remote
文件在这四个区域之间的转换关系如下：
![GitImage](/img/2023/GitImage.png)

### How to Learn Git

Git的教程非常多，现在也出现了非常多图形化的Git插件。但是几乎都缺少最重要的要素：团队。因此，选择Git教程要点：

- 体验团队使用的 Git 工作流  
[git](https://git-scm.com/docs)官方文档

[Interactive Git Courses](https://ooloo.io/project/github-flow/mindset)了解如何在GitHub团队中使用 Git

### Github Action

Github Action是一种工作流，是CI/CD最常用的工具

- CI/CD（持续集成/持续部署）是自动化构建、测试和部署应用程序的实践，其主要目标是及早发现问题，并更快地发布到生产环境。

工作流是一个可配置的自动化过程，它将运行一个或多个作业。工作流由签入您的存储库的 YAML 文件定义，并在由存储库中的事件触发时运行，或者它们可以手动触发或按定义的时间表触发。

工作流在存储库的目录中定义.github/workflows，存储库可以有多个工作流，每个工作流可以执行一组不同的任务。例如，您可以有一个工作流来构建和测试拉取请求，另一个工作流在每次创建发布时部署您的应用程序，还有另一个工作流在每次有人打开新问题时添加标签。

[GitHub Actions documentation](https://docs.github.com/en/actions)
