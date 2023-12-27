import React from 'react'
import Layout from '@theme/Layout'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import styles from './index.module.css'
import Translate from '@docusaurus/Translate';

function MyHero() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <div className={styles.myHeroContainer}>
      <div className={styles.leftContainer}>
        <h1 className={styles.leftContainer_h1}>
          import this
        </h1>
        <p className={styles.leftContainer_p}>
        <Translate id="homepage.philosophy.one">优美优于丑陋，明了优于隐晦</Translate><br />
        <Translate id="homepage.philosophy.two">简单优于复杂，复杂优于繁杂</Translate><br />
        <Translate id="homepage.philosophy.three">扁平优于嵌套，稀疏优于稠密</Translate><br />
        <Translate id="homepage.philosophy.four">可读性很重要！</Translate><br />
        <Translate id="homepage.philosophy.five">特例亦不可违背原则，即使实用比纯粹更优。</Translate><br />
        <Translate id="homepage.philosophy.six">错误绝不能悄悄忽略，除非它明确需要如此。</Translate><br />
        <Translate id="homepage.philosophy.seven">面对不确定性，拒绝妄加猜测。</Translate><br />
        <Translate id="homepage.philosophy.eight">任何问题应有一种，且最好只有一种，显而易见的解决方法。</Translate><br />
        <Translate id="homepage.philosophy.nine">做优于不做，然而不假思索还不如不做。</Translate><br />
        <Translate id="homepage.philosophy.ten">很难解释的，必然是坏方法。</Translate><br />
        <Translate id="homepage.philosophy.eleven">很好解释的，可能是好方法。</Translate><br />
        </p>
        <div className={styles.buttonContainer}>
        </div>
      </div>
      <div className={styles.rightContainer}>
      </div>
    </div>
  )
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout
      description="Concise, consistent, and legible badges"
      title={siteConfig.title}
    >
      <MyHero />
    </Layout>
  )
}
