'use client';

import { useOnMounted } from '@jeehoon/hooks';
import Career from '../Career';
import Closing from '../Closing';
import Foundation from '../Foundation';
import Hero from '../Hero';
import IndexNav from '../IndexNav';
import Project from '../Project';
import styles from './ResumePage.module.scss';
import { ga } from '@/shared/lib/logs/analytics';

export default function ResumePage() {
	useOnMounted(ga.pageView.resume);

	return (
		<main className={styles.page}>
			<Hero />
			<IndexNav />
			<Career />
			<Project />
			<Foundation />
			<Closing />
		</main>
	);
}
ResumePage.displayName = 'ResumePage';
