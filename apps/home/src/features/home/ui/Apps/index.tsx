'use client';

import Link from 'next/link';
import { apps, appsSection } from '@/features/home/contents';
import { ga } from '@/shared/lib/logs/analytics';
import Reveal from '@/features/home/ui/common/Reveal';
import SectionHeader from '@/features/home/ui/common/SectionHeader';
import styles from './Apps.module.scss';

export default function Apps() {
	return (
		<section className={styles.section} id="apps">
			<div className={styles.inner}>
				<Reveal>
					<SectionHeader
						label={appsSection.sectionLabel}
						title={appsSection.title}
						desc={appsSection.lead}
					/>
				</Reveal>

				<div className={styles.grid}>
					{apps.map(app => (
						<Reveal key={app.id}>
							<Link
								href={app.href}
								className={styles.card}
								aria-label={`${app.title} 앱 열기`}
								onClick={() => ga.events.appClick(app.id)}
							>
								<span className={styles.cardLabel}>{app.title}</span>
								<p className={styles.cardDesc}>{app.description}</p>
								<span className={styles.cardHost}>{new URL(app.href).hostname}</span>
								<span className={styles.cardArrow} aria-hidden="true">
									<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
										<path d="M7 17L17 7M17 7H7M17 7v10" />
									</svg>
								</span>
							</Link>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}
