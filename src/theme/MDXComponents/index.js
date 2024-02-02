import MDXComponents from '@theme-original/MDXComponents';
import MarkmapHooks from '@site/src/components/MarkmapHooks';
import { PhotoAlbums } from '@site/src/components/PhotoAlbums';
import { CustomTitle,Center,Text } from '@site/src/components/Style';
import DocCardList from '@theme/DocCardList';

export default {
  // 复用默认的映射
  ...MDXComponents,
  CustomTitle,
  Center,
  Text,
  PhotoAlbums,
  MarkmapHooks,
  DocCardList
};