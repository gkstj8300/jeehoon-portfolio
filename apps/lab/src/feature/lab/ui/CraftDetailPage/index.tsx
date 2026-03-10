'use client';

import { type ComponentType } from 'react';
import Link from 'next/link';
import { useOnMounted } from '@jeehoon/hooks';
import { ga } from '@/shared/lib/logs/analytics';
import type { CraftItem } from '../../types/craftItem';
import WavyText from '../demos/WavyText';
import DebounceThrottle from '../demos/DebounceThrottle';
import InteractiveParticles from '../demos/InteractiveParticles';
import styles from './CraftDetailPage.module.scss';

const demoComponents: Record<string, ComponentType> = {
	'wavy-text': WavyText,
	'debounce-throttle': DebounceThrottle,
	'interactive-particles': InteractiveParticles,
};

interface CraftDetailPageProps {
	item: CraftItem;
}

export default function CraftDetailPage({ item }: CraftDetailPageProps) {
	const { slug, title, description, tags, createdAt } = item;
	const DemoComponent = demoComponents[slug];

	useOnMounted(() => {
		ga.pageView.craftDetail({ title, createdAt });
	});

	return (
		<div className={styles.container}>
			<Link className={styles.backLink} href="/">
				← 실험실로 돌아가기
			</Link>
			<header className={styles.header}>
				<h1 className={styles.title}>{title}</h1>
				<p className={styles.description}>{description}</p>
				<div className={styles.meta}>
					<time className={styles.date}>{createdAt}</time>
					<div className={styles.tags}>
						{tags.map((tag) => (
							<span key={tag} className={styles.tag}>
								{tag}
							</span>
						))}
					</div>
				</div>
			</header>
			<div className={styles.demo}>
				{DemoComponent ? <DemoComponent /> : null}
			</div>
		</div>
	);
}

CraftDetailPage.displayName = 'CraftDetailPage';
