---
sidebar_position: 5
title: Git备忘录
---
## 分支
``` bash
git tag -l | xargs git tag -d #删除所有本地分支

git fetch origin --prune #从远程拉取所有信息

git branch -a # 查看远程分支

git branch # 查看本地分支

git branch newBranch # 创建本地分支

git checkout newBranch # 切换到本地分支

git checkout -b newBranch  # 创建并切换到分支
```
## 版本
``` bash
git log # 查看你要回到的那个版本

git reset --hard HEAD^ # 回退到上个版本

git reset --hard commit_id # 退到/进到 指定commit_id

git push origin HEAD --force #将本地的修改提交到远程
```
## Tag
``` bash
git ls-remote --tags origin #查询远程tags

git tag #列出所有tag

git tag -l v1.* #列出符合条件的tag（筛选作用）

git tag [tag名] #创建轻量tag（无-m标注信息）

git tag -a [tag名] #创建含注解的tag

git push origin --tags #推送所有本地tag到远程
git push origin [本地tag名] #推送指定本地tag到远程

git tag -d [本地tag名] #删除本地指定tag
git push origin :refs/tags/[远程tag名] #删除远程指定tag

git fetch origin [远程tag名] #拉取远程指定tag
git show [tag名] #显示指定tag详细信息

git branch -a --contains Tag_V1.0.0 # 看看哪个分支包含这个tag/commit
```
