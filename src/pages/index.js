import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import React, { Fragment, useEffect, useState } from 'react';
import { ShowcaseCard, CtaImageButton } from '@infinum/docusaurus-theme';

const shuffleArray = (array) => array.map(value => ({ value, sort: Math.random() }))
	.sort((a, b) => a.sort - b.sort)
	.map(({ value }) => value);

function ShowcaseGrid() {

	const headingTitle =  'Welcome'
	const headingSubtitle =  '有朋自远方来，不亦乐乎。这些优秀的案例是给你的礼物！';
	const ctaTitle = <span>你好 <br /> 遇到问题了吗?</span>;
	const ctaSubtitle = 'Open an issue on GitHub';
	const ctaUrl =  'https://github.com/jiangyangcreate/jiangyangcreate.github.io/issues';

	const publicData = [
		{
			image: useBaseUrl('img/showcase/jiangmiemie.png'),
			label: 'jiangmiemie',
			desc: '这是一个基于 Docusaurus 3.0 最新版本的自定义站点。设计理念：美丽胜过丑陋，清晰胜过模糊。简洁胜过复杂，复杂胜过繁琐。希望你喜欢这个小巧而吸引人的个人博客站点。',
			link: 'https://jiangmiemie.com/',
		},
		{
			image: useBaseUrl('img/showcase/academy.webp'),
			label: 'academy',
			desc: 'Learn how to build apps. For free. No practical experience? No problem. People who build apps every day are teaching how to create software from scratch. By the end of the course, you will have built your very own app.',
			link: 'https://academy.infinum.com/',
		},
	];

	// https://reactjs.org/docs/react-dom.html#hydrate
	const [isClient, setIsClient] = useState(false);
	useEffect(() => {
		setIsClient(true)
	}, []);

	const items = shuffleArray(publicData).map((item, index) => {
		const {
			image,
			label,
			link,
			desc,
		} = item;

		return (
			<ShowcaseCard
				key={index}
				url={link}
				imageUrl={image}
				imageAlt={label}
				title={label}
				description={desc}
			/>
		)
	});

	return (
		// key={isClient ? 1 : 2} will trigger a rerender of the whole subtree and the images will be aligned with text
		<Fragment key={isClient ? 1 : 2}>
			<h1 className='es-big-title es-h-center'>{headingTitle}</h1>
			<p className='es-big-subtitle es-text-center es-h-center'>{headingSubtitle}</p>

			<div className='es-showcase-grid'>
				{items}
			</div>

			<CtaImageButton
				title={ctaTitle}
				buttonLabel={ctaSubtitle}
				buttonUrl={ctaUrl}
				imageUrl='/img/showcase/cta.svg'
			/>
		</Fragment>
	);
}




export default function Showcase() {
	const context = useDocusaurusContext();
	const { siteConfig = {} } = context;

	return (
		<Layout
			title='Showcase'
			description={siteConfig.tagline}
			keywords={siteConfig.customFields.keywords}
			metaImage={useBaseUrl(`img/${siteConfig.customFields.image}`)}
			wrapperClassName='es-navbar-white'
		>
			<ShowcaseGrid />
		</Layout>
	);
};
