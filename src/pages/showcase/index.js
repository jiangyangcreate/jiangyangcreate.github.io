import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';


const Users = [
{
  title: "jiangmiemie's website",
  description: 'Build by Docusaurus 3',
  preview: '/showcase/jiangmiemie.png',
  website: 'https://jiangmiemie.com/',
  source: 'https://github.com/jiangyangcreate/jiangyangcreate.github.io',
},
{
  title: 'mini-leetcode',
  description: 'It is mini-leetcode',
  preview: '/showcase/mini-leetcode.png',
  website: 'https://jiangmiemie.com/minileetcode/',
  source: 'https://github.com/jiangyangcreate/minileetcode',
},
];

function ShowcaseCard({ user }) {
  return (
    React.createElement('li', { key: user.title, className: 'card shadow--md' },
      React.createElement('div', { className: clsx('card__image', styles.showcaseCardImage) , style: { height: '50%' } },
        React.createElement('img', { src: user.preview, alt: user.title })
      ),
      React.createElement('div', { className: 'card__body', style: { backgroundColor: 'white' } },
        React.createElement('div', { className: clsx(styles.showcaseCardHeader) },
          React.createElement(Heading, { as: 'h4', className: styles.showcaseCardTitle },
            React.createElement(Link, { href: user.website, className: styles.showcaseCardLink },
              user.title
            )
          ),
          React.createElement(Link, {
            href: user.source,
            className: clsx('button button--secondary', styles.showcaseCardSrcBtn)
          },'source' ),
          React.createElement('p', { className: styles.showcaseCardBody }, user.description )
        ),
      ),
    )
  );
}


function ShowcaseCards() {
  return (
    React.createElement('section', { className: 'margin-top--lg margin-bottom--xl' , style: { padding: '0 10px' } },
            React.createElement('ul', { className: clsx('container', 'clean-list', styles.showcaseList) },
            Users.map((user) =>
                React.createElement(ShowcaseCard, { key: user.title, user: user })
              )
            )
          )
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout
      description="Concise, consistent, and legible badges"
      title={siteConfig.title}>
        <ShowcaseCards />
    </Layout>
  )
}
