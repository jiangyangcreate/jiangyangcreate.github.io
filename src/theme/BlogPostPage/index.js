import React from 'react';
import clsx from 'clsx';
import {HtmlClassNameProvider, ThemeClassNames} from '@docusaurus/theme-common';
import {BlogPostProvider, useBlogPost} from '@docusaurus/theme-common/internal';
import BlogLayout from '@theme/BlogLayout';
import BlogPostItem from '@theme/BlogPostItem';
import BlogPostPaginator from '@theme/BlogPostPaginator';
import BlogPostPageMetadata from '@theme/BlogPostPage/Metadata';
import TOC from '@theme/TOC';
import Unlisted from '@theme/Unlisted';

// 修改：追加评论模块
import Giscus from '@giscus/react';
import {useColorMode } from '@docusaurus/theme-common';
function Comment() {
  // merge default config
  const giscus = useColorMode().colorMode === 'dark' ? 'dark' :'light';
  return ( <Giscus
    id="comments"
    repo="jiangyangcreate/jiangyangcreate.github.io"
    repoId="R_kgDOKVhfrw"
    category="Announcements"
    categoryId="DIC_kwDOKVhfr84CbuxD"
    mapping="title"
    reactionsEnabled="1"
    emitMetadata="0"
    inputPosition="top"
    theme={giscus}
    lang="en"
    loading="lazy"
  />
  );
}

function BlogPostPageContent({sidebar, children}) {
  const {metadata, toc} = useBlogPost();
  const {nextItem, prevItem, frontMatter, unlisted} = metadata;
  const {
    hide_table_of_contents: hideTableOfContents,
    toc_min_heading_level: tocMinHeadingLevel,
    toc_max_heading_level: tocMaxHeadingLevel,
  } = frontMatter;
  
  return (
    <BlogLayout
      sidebar={sidebar}
      toc={
        !hideTableOfContents && toc.length > 0 ? (
          <TOC
            toc={toc}
            minHeadingLevel={tocMinHeadingLevel}
            maxHeadingLevel={tocMaxHeadingLevel}
          />
        ) : undefined
      }>
      {unlisted && <Unlisted />}
      <BlogPostItem>{children}</BlogPostItem>
      {/* // 修改：追加评论模块 */}
      <Comment/>
      {(nextItem || prevItem) && (
        <BlogPostPaginator nextItem={nextItem} prevItem={prevItem} />
      )}
    </BlogLayout>
  );
}
export default function BlogPostPage(props) {
  const BlogPostContent = props.content;
  return (
    <BlogPostProvider content={props.content} isBlogPostPage>
      <HtmlClassNameProvider
        className={clsx(
          ThemeClassNames.wrapper.blogPages,
          ThemeClassNames.page.blogPostPage,
        )}>
        <BlogPostPageMetadata />
        <BlogPostPageContent sidebar={props.sidebar}>
          <BlogPostContent />
        </BlogPostPageContent>
      </HtmlClassNameProvider>
    </BlogPostProvider>
  );
}
