import React from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { useThemeConfig, useColorMode } from '@docusaurus/theme-common';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Giscus from '@giscus/react';
import clsx from 'clsx';
import {
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import {
  BlogPostProvider,
  useBlogPost,
} from '@docusaurus/theme-common/internal';
import BlogLayout from '@theme/BlogLayout';
import BlogPostItem from '@theme/BlogPostItem';
import BlogPostPaginator from '@theme/BlogPostPaginator';
import BlogPostPageMetadata from '@theme/BlogPostPage/Metadata';
import BackToTopButton from '@theme/BackToTopButton';
import TOC from '@theme/TOC';

const defaultConfig = {
  id: 'comments',
  mapping: 'title',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'top',
  lang: 'zh-CN',
  theme: 'light',
  darkTheme: 'dark',
};
function Comment() {
  const themeConfig = useThemeConfig();
  const { i18n } = useDocusaurusContext();
  const { siteConfig } = useDocusaurusContext()
  // merge default config
  const giscus = { ...defaultConfig, ...themeConfig.giscus };

  if (!giscus.repo || !giscus.repoId || !giscus.categoryId) {
    throw new Error(
      'You must provide `repo`, `repoId`, and `categoryId` to `themeConfig.giscus`.',
    );
  }

  giscus.theme =
    useColorMode().colorMode === 'dark' ? giscus.darkTheme : giscus.theme;
  giscus.lang = i18n.currentLocale;

  return (
    <BrowserOnly fallback={<div>Loading Comments...</div>}>
      {() => <Giscus {...giscus} />}
    </BrowserOnly>
  );
}


function BlogPostPageContent({
  sidebar,
  children
}) {
  const { metadata, toc } = useBlogPost();
  const { nextItem, prevItem, frontMatter } = metadata;
  const {
    hide_table_of_contents: hideTableOfContents,
    toc_min_heading_level: tocMinHeadingLevel,
    toc_max_heading_level: tocMaxHeadingLevel,
    hide_comment: hideComment,
  } = frontMatter;

  return (
    React.createElement(BlogLayout, {
      sidebar: sidebar,
      toc: !hideTableOfContents && toc.length > 0 ? (
        React.createElement(TOC, {
          toc: toc,
          minHeadingLevel: tocMinHeadingLevel,
          maxHeadingLevel: tocMaxHeadingLevel
        })
      ) : undefined
    },
      React.createElement(BlogPostItem, null, children),

      (nextItem || prevItem) && (
        React.createElement('div', { className: "margin-bottom--md" },
          React.createElement(BlogPostPaginator, { nextItem: nextItem, prevItem: prevItem })
        )
      ),
      !hideComment && React.createElement(Comment, null),
      React.createElement(BackToTopButton, null)
    )
  );
}



export default function BlogPostPage(props) {
  const BlogPostContent = props.content;
  return (
    React.createElement(BlogPostProvider, { content: props.content, isBlogPostPage: true },
      React.createElement(HtmlClassNameProvider, 
        {
        className: clsx(
          ThemeClassNames.wrapper.blogPages,
          ThemeClassNames.page.blogPostPage,
        ),
      },
        React.createElement(BlogPostPageMetadata, null),
        React.createElement(BlogPostPageContent, { sidebar: props.sidebar },
        React.createElement(BlogPostContent, null)
        )
      )
    )
  );
}