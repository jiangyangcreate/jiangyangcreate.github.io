import React from 'react'
import Layout from '@theme/Layout'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { useThemeConfig, useColorMode } from '@docusaurus/theme-common';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Giscus from '@giscus/react';
import styles from './index.module.css'

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




export default function Home() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout
      description="Concise, consistent, and legible badges"
      title={siteConfig.title}>
      <main className={styles.centeredContainer}>
        <h1>留言板</h1>
        <Comment />
      </main>
    </Layout>
  )
}
