'use client';

import { useOnMounted } from '@jeehoon/hooks';
import { MotionProvider } from '@/features/home/lib/motionContext';
import KineticHome from '../KineticHome';
import { ga } from '@/shared/lib/logs/analytics';
import styles from './HomePage.module.scss';

export default function HomePage() {
	useOnMounted(ga.pageView.main);

	return (
		<main className={styles.container}>
			<MotionProvider>
				<KineticHome />
			</MotionProvider>
		</main>
	);
}
HomePage.displayName = 'HomePage';
