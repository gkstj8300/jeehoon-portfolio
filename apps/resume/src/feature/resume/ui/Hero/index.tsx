'use client';

import { contactLinks, hero } from './hero.data';
import styles from '../ResumePage/ResumePage.module.scss';
import { ga } from '@/shared/lib/logs/analytics';

export default function Hero() {
	return (
		<section className={styles.hero} aria-labelledby="resume-name">
			<div className={styles.heroTop}>
				<span className={styles.eyebrow}>{hero.eyebrow}</span>
				<span className={styles.status}>
					<i className={styles.dot} aria-hidden="true" />
					{hero.status}
				</span>
			</div>

			<h1 className={styles.name} id="resume-name">
				{hero.name}{' '}
				<span className={styles.nameEn}>{hero.nameEn}</span>
			</h1>

			<p className={styles.positioning}>
				{hero.positioningLines.map((line, index) => (
					<span key={line}>
						{index === hero.accentLineIndex ? (
							<em className={styles.positioningAccent}>{line}</em>
						) : (
							line
						)}
						{index < hero.positioningLines.length - 1 ? <br /> : null}
					</span>
				))}
			</p>

			<p className={styles.summary}>{hero.summary}</p>

			<div className={styles.contactLinks}>
				{contactLinks.map(link => (
					<a
						key={link.href}
						href={link.href}
						{...(link.external
							? { target: '_blank', rel: 'noopener noreferrer' }
							: {})}
						{...(link.trackPdf ? { onClick: () => ga.events.pdfView() } : {})}
					>
						{link.label}
					</a>
				))}
			</div>
		</section>
	);
}
Hero.displayName = 'Hero';
