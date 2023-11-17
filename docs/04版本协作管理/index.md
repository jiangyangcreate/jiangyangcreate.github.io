---
sidebar_position: 1
title: 版本协作管理概述
---


# 版本协作管理

Git是一个版本控制工具，既可以通过图形化的方式操作，也可以通过命令行来完成。

Git版本管理分为四个板块
*Workspace*Index*Repository*Remote
文件在这四个区域之间的转换关系如下：
![GitImage](/2023/GitImage.png)

## How to Learn Git

Git的教程非常多，现在也出现了非常多图形化的Git插件。但是几乎都缺少最重要的要素：团队。因此，选择Git教程要点：

- 体验团队使用的 Git 工作流  
[git](https://git-scm.com/docs)官方文档

[Interactive Git Courses](https://ooloo.io/project/github-flow/mindset)了解如何在GitHub团队中使用 Git

## Github Action

Github Action是一种工作流，是CI/CD最常用的工具

- CI/CD（持续集成/持续部署）是自动化构建、测试和部署应用程序的实践，其主要目标是及早发现问题，并更快地发布到生产环境。

工作流是一个可配置的自动化过程，它将运行一个或多个作业。工作流由签入您的存储库的 YAML 文件定义，并在由存储库中的事件触发时运行，或者它们可以手动触发或按定义的时间表触发。

工作流在存储库的目录中定义.github/workflows，存储库可以有多个工作流，每个工作流可以执行一组不同的任务。例如，您可以有一个工作流来构建和测试拉取请求，另一个工作流在每次创建发布时部署您的应用程序，还有另一个工作流在每次有人打开新问题时添加标签。

[GitHub Actions documentation](https://docs.github.com/en/actions)