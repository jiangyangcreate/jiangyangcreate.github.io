.PHONY: build summary hash serve

build:            ## 构建静态站点（生成 build/blog/rss.xml）
	npm run build

serve:            ## 本地预览构建产物
	npm run serve

summary: build    ## 为新/变更博文生成 AI 摘要 + 播客（输出到 static/blog/summary/）
	uv run --directory scripts/summary python cli.py

hash: build       ## 仅刷新 content_hash，不调用模型（替代旧的 skip 提交约定）
	uv run --directory scripts/summary python cli.py --hash-only
