[English](README.md) | [中文](README_zh.md)

## Design Philosophy

Beautiful is better than ugly.

Explicit is better than implicit.

Simple is better than complex.

Complex is better than complicated.

Flat is better than nested.

Sparse is better than dense.

Readability counts.

Special cases aren't special enough to break the rules.

Although practicality beats purity.

Errors should never pass silently.

Unless explicitly silenced.

In the face of ambiguity, refuse the temptation to guess.

There should be one-- and preferably only one --obvious way to do it.

Now is better than never.

Although never is often better than *right* now.

If the implementation is hard to explain, it's a bad idea.

If the implementation is easy to explain, it may be a good idea.

The above is an excerpt from "The Zen of Python."

Based on such design principles, I created a small and beautiful personal blog site. Click to view the [website analysis](https://pagespeed.web.dev/).

## Framework

Built on the latest [Docusaurus 3.0.1](https://docusaurus.io/), the personal blog site is partially incompatible with Docusaurus 2.0.

Inspired by the [Docusaurus Site Showcase](https://docusaurus.io/showcase), I selected interesting designs, made some modifications, and ultimately completed this site.

To facilitate customization, as much custom content as possible is placed in `docusaurus.config.js`.

- Light and dark mode switchable in the upper right corner of the page.
- Announcement bar on the homepage for announcements.
- KaTeX formula plugin for LaTeX syntax support, making it easier to write mathematical formulas.
- PWA support for offline access, allowing you to browse the site even without an internet connection.
- RSS support for blog subscription. Subscribe to the [RSS feed](https://jiangmiemie.com/blog/rss.xml).
- Algolia global search for quick content retrieval within the site.
- Giscus for comments at the bottom of specified pages, supporting GitHub account login for communication with the author.
- Google Analytics using Google Tag Manager to view website traffic.
- i18n for automatic translation based on the Crowdin plugin.
- "react-photo-album" is a photo album plugin that can display albums at the bottom of a specified page.

<details>

### Google Analytics

Obtain the Google Analytics code and insert it into the `googleAnalytics` field in `docusaurus.config.js`.

### Global Search

Obtain the Algolia `Application ID` and `Search-Only API Key`, and insert them into the `algolia` field in `docusaurus.config.js`.

Add the search box:

```javascript
navbar: {
  title: 'Home',
  hideOnScroll: true,
  items: [
    // Search box
    {
      type: 'search',
      position: 'right',
    },
  ]
},
```

### Giscus

Utilize the Giscus plugin.

Obtain the Giscus `repo` and `repoID`, and insert them into the `giscus` field in `docusaurus.config.js`.

Basic usage, for example: customizing the comment board:

```jsx
import Giscus from '@giscus/react';

function Comment() {
  return (
    <BrowserOnly fallback={<div>Loading Comments...</div>}>
      {() => <Giscus {...giscus} />}
    </BrowserOnly>
  );
}
```

If you want comments on each post, add `<Giscus />` in `src\theme\BlogPostPage`. Simply copy and paste the `src\theme\BlogPostPage` folder.

### Album

Customize the photo album using the react-photo-album plugin.

Supports multiple layouts, tag filtering, individual viewing on click, display of image size and description, preview of next and previous images, zooming in and out of images, and more. The `photos` field in `src\pages\gallery\index.js` contains the album images and can be customized as needed.

### Bilingual (Chinese and English)

Obtain the Crowdin `Project ID` and `API Key`, and insert them into the `crowdin` field in `docusaurus.config.js`.

</details>

## Quick Reproduction

`npm update` to update plugins.

`npm install` to download necessary dependencies.

`npm run start` to launch the site.