"use client";

import { useOnMounted } from '@jeehoon/hooks';
import Apps from '../Apps';
import FeaturedProjects from '../FeaturedProjects';
import FirstSection from '../FirstSection';
import SecondSection from '../SecondSection';
import TheSite from '../TheSite';
import { ga } from '@/shared/lib/logs/analytics';
import styles from './HomePage.module.scss';

export default function HomePage() {
	useOnMounted(ga.pageView.main);

	return (
		<main className={styles.container}>
			<FirstSection />
			<SecondSection />
			<FeaturedProjects />
			<Apps />
			<TheSite />
		</main>
	);
}
HomePage.displayName = 'HomePage';
