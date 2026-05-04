'use client';

import { Icons } from '@jeehoon/ui';
import Link from 'next/link';
import { site } from '@/features/home/contents';
import { ga } from '@/shared/lib/logs/analytics';
import Reveal from '@/features/home/ui/common/Reveal';
import SectionHeader from '@/features/home/ui/common/SectionHeader';
import styles from './TheSite.module.scss';

export default function TheSite() {
	return (
		<section className={styles.section} id="the-site">
			<div className={styles.inner}>
				<Reveal>
					<SectionHeader
						label={site.sectionLabel}
						title={site.title}
						desc={site.lead}
					/>
				</Reveal>

				<Reveal>
					<div className={styles.flowBox}>
						<div className={styles.column}>
							<span className={styles.columnTitle}>apps</span>
							<ul className={styles.list}>
								{site.apps.map(app => (
									<li key={app.id} className={styles.item}>
										<span className={styles.itemTitle}>{app.title}</span>
										<span className={styles.itemDesc}>{app.desc}</span>
									</li>
								))}
							</ul>
						</div>

						<div className={styles.connector} aria-hidden="true">
							<Icons.FaCodeBranch className={styles.branchIcon} />
						</div>

						<div className={styles.column}>
							<span className={styles.columnTitle}>packages</span>
							<ul className={styles.list}>
								{site.packages.map(pkg => (
									<li key={pkg.id} className={styles.item}>
										<span className={styles.itemTitle}>{pkg.title}</span>
										<span className={styles.itemDesc}>{pkg.desc}</span>
									</li>
								))}
							</ul>
						</div>
					</div>
				</Reveal>

				<Reveal>
					<div className={styles.footer}>
						<ul className={styles.chips}>
							{site.chips.map(chip => (
								<li key={chip} className={styles.chip}>
									{chip}
								</li>
							))}
						</ul>
						<Link
							href={site.cta.href}
							target="_blank"
							rel="noopener noreferrer"
							className={styles.cta}
							onClick={() => ga.events.githubView()}
						>
							<Icons.FaGithub />
							{site.cta.label}
						</Link>
					</div>
				</Reveal>
			</div>
		</section>
	);
}
