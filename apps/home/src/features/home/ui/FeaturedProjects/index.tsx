'use client';

import Link from 'next/link';
import { featuredProjects, featuredSection } from '@/features/home/contents';
import { ga } from '@/shared/lib/logs/analytics';
import Reveal from '@/features/home/ui/common/Reveal';
import SectionHeader from '@/features/home/ui/common/SectionHeader';
import styles from './FeaturedProjects.module.scss';

export default function FeaturedProjects() {
	return (
		<section className={styles.section} id="featured">
			<div className={styles.inner}>
				<Reveal>
					<SectionHeader
						label={featuredSection.sectionLabel}
						title={featuredSection.title}
						desc={featuredSection.lead}
					/>
				</Reveal>

				<div className={styles.grid}>
					{featuredProjects.map(project => (
						<Reveal key={project.slug}>
							<Link
								href={project.href}
								className={styles.card}
								aria-label={`${project.title} 자세히 보기`}
								onClick={() => ga.events.featuredProjectClick(project.slug)}
							>
								<div className={styles.cardHead}>
									<span className={styles.company}>{project.company}</span>
									<span className={styles.period}>{project.period}</span>
								</div>
								<h3 className={styles.title}>{project.title}</h3>
								<p className={styles.summary}>{project.summary}</p>
								<ul className={styles.tags}>
									{project.tags.map(tag => (
										<li key={tag} className={styles.tag}>
											{tag}
										</li>
									))}
								</ul>
								<span className={styles.arrow} aria-hidden="true">
									자세히 보기
									<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
										<path d="M5 12h14M13 5l7 7-7 7" />
									</svg>
								</span>
							</Link>
						</Reveal>
					))}
				</div>

				<Reveal>
					<div className={styles.more}>
						<Link href={featuredSection.moreHref} className={styles.moreLink}>
							{featuredSection.moreLabel}
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
								<path d="M5 12h14M13 5l7 7-7 7" />
							</svg>
						</Link>
					</div>
				</Reveal>
			</div>
		</section>
	);
}
