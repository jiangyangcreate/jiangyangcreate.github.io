import React from 'react';
import Link from '@docusaurus/Link';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import CopyMarkdownButton from '@site/src/components/CopyMarkdownButton';

export default function BlogPostItemHeaderTitle({className}) {
  const {metadata, isBlogPostPage} = useBlogPost();
  const {permalink, title} = metadata;
  const TitleHeading = isBlogPostPage ? 'h1' : 'h2';
  return (
    <div>
      <TitleHeading className={className}>
        {isBlogPostPage ? title : <Link to={permalink}>{title}</Link>}
      </TitleHeading>
      {isBlogPostPage && (
        <div className="markdown-actions-container">
          <CopyMarkdownButton />
        </div>
      )}
    </div>
  );
}
