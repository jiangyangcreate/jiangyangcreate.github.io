import React from 'react';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import {PageMetadata} from '@docusaurus/theme-common';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
function Year({year, posts}) {
  return (
    <>
      <Heading as="h3" id={year}>
        {year}
      </Heading>
      <ul>
        {posts.map((post) => (
          <li key={post.metadata.date}>
            <Link to={post.metadata.permalink}>
              {post.metadata.formattedDate} - {post.metadata.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
function YearsSection({years}) {
  return (
    <section className="margin-vert--lg">
      <div className="container">
        <div className="row">
          {years.map((_props, idx) => (
            <div key={idx} className="col col--4 margin-vert--lg">
              <Year {..._props} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function listPostsByYears(blogPosts) {
  const postsByYear = blogPosts.reduce((posts, post) => {
    const year = post.metadata.date.split('-')[0];
    const yearPosts = posts.get(year) ?? [];
    return posts.set(year, [post, ...yearPosts]);
  }, new Map());
  return Array.from(postsByYear, ([year, posts]) => ({
    year,
    posts,
  }));
}
export default function BlogArchive({archive}) {
	const context = useDocusaurusContext();
	const { siteConfig = {} } = context;
  const title = translate({
    id: 'theme.blog.archive.title',
    message: '我的博客',
    description: 'The page & hero title of the blog archive page',
  });
  const description = translate({
    id: 'theme.blog.archive.description',
    message: siteConfig.tagline,
    description: 'The page & hero description of the blog archive page',
  });
  const years = listPostsByYears(archive.blogPosts);
  return (
    <>
      <PageMetadata title={title} description={description} />
      <Layout>
        <header className="hero hero--primary" style={{color: 'white',
          backgroundImage: 'url("https://jiangmiemie.com/img/protruding-squares.svg")'}}>
          <div className="container">
            <Heading as="h1" className="hero__title">
              {title}
            </Heading>
            <p className="hero__subtitle">{description}</p>
          </div>
        </header>
        <main>{years.length > 0 && <YearsSection years={years} />}</main>
      </Layout>
    </>
  );
}

