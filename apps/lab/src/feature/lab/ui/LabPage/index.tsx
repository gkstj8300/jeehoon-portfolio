"use client";

import { useOnMounted } from '@jeehoon/hooks';
import { Ui } from '@jeehoon/ui';
import { ga } from '@/shared/lib/logs/analytics';
import { craftItems } from '../../data/craftItems.data';
import CraftCard from '../CraftCard';
import styles from './LabPage.module.scss';

export default function LabPage() {
	useOnMounted(ga.pageView.lab);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<Ui.Title title="실험실" />
				<p className={styles.description}>
					프론트엔드 개발에서 시도해본 다양한 실험들을 모아둔 공간이에요.
				</p>
			</div>
			<div className={styles.grid}>
				{craftItems.map((item) => (
					<Ui.Reveal key={item.slug}>
						<CraftCard item={item} />
					</Ui.Reveal>
				))}
			</div>
		</div>
	);
}

LabPage.displayName = 'LabPage';
