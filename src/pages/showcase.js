import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import React, { Fragment, useEffect, useState } from 'react';
import { ShowcaseCard, CtaImageButton } from '@infinum/docusaurus-theme';
import { IconLinkCards, osProjectIcons } from '@infinum/docusaurus-theme';

const shuffleArray = (array) => array.map(value => ({ value, sort: Math.random() }))
	.sort((a, b) => a.sort - b.sort)
	.map(({ value }) => value);

function ShowcaseGrid(props) {
	const {
		privateType,
	} = props;

	const headingTitle = privateType ? 'jiangyang showcase' : 'Showcase';
	const headingSubtitle = privateType ? "See all the awesome websites built by Infinum's WordPress team." : 'See the awesome websites people are building';
	const ctaTitle = privateType ? "Let's get in touch" : (<span>你好 <br /> 遇到问题了吗?</span>);
	const ctaSubtitle = privateType ? 'Contact us' : 'Open an issue on GitHub';
	const ctaUrl = privateType ? 'https://github.com/jiangyangcreate/' : 'https://github.com/jiangyangcreate/jiangyangcreate.github.io/issues';

	const privateData = [

	];

	const publicData = [
		{
			image: useBaseUrl('img/showcase/jiangmiemie.png'),
			label: 'jiangmiemie',
			desc: '这是一个基于 Docusaurus 3.0 最新版本的自定义站点。设计理念：美丽胜过丑陋，清晰胜过模糊。简洁胜过复杂，复杂胜过繁琐。希望你喜欢这个小巧而吸引人的个人博客站点。',
			link: 'https://jiangmiemie.com/',
		},
		{
			image: useBaseUrl('img/showcase/infinum.webp'),
			label: '填充站',
			desc: 'An independent design and development agency with offices in the US and Europe. We create beautiful apps people love to use.',
			link: 'https://infinum.com/',
		},
		{
			image: useBaseUrl('img/showcase/solplanet.webp'),
			label: '填充站',
			desc: 'The power of the sun is the future of our planet. Solplanet makes solar for everybody. Easy-to-install, reliable and user-friendly inverters.',
			link: 'https://solplanet.net/',
		},
		{
			image: useBaseUrl('img/showcase/academy.webp'),
			label: '填充站',
			desc: 'Learn how to build apps. For free. No practical experience? No problem. People who build apps every day are teaching how to create software from scratch. By the end of the course, you will have built your very own app.',
			link: 'https://academy.infinum.com/',
		},
		{
			image: useBaseUrl('img/showcase/raise-the-bar.webp'),
			label: '填充站',
			desc: 'Coca-Cola HBC is helps to align the skills and knowledge in tourism and hospitality through Raise the Bar education program.',
			link: 'https://raisethebar.hr/',
		},
		{
			image: useBaseUrl('img/showcase/a1-jobs.webp'),
			label: '填充站',
			desc: 'At A1 Group we are driving digitalization in order to make life easier, more enjoyable and more productive. Are you in? Come and join us!',
			link: 'https://jobs.a1.com/',
		},
	];

	const itemsData = privateType ? [...publicData, ...privateData] : publicData;

	// https://reactjs.org/docs/react-dom.html#hydrate
	const [isClient, setIsClient] = useState(false);
	useEffect(() => {
		setIsClient(true)
	}, []);

	const items = shuffleArray(itemsData).map((item, index) => {
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
