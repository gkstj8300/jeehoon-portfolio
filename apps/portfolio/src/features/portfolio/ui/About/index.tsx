'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { about, profile } from '@/features/portfolio/contents';
import { calcTotalExperience } from '@/features/portfolio/lib/calcExperience';
import Reveal from '@/features/portfolio/ui/common/Reveal';
import styles from './About.module.scss';

export default function About() {
	const [experience, setExperience] = useState('');

	useEffect(() => {
		setExperience(calcTotalExperience(profile.careerHistory));
	}, []);

	return (
		<section className={styles.about} id="about">
			<div className={styles.inner}>
				<Reveal className={styles.headerRow}>
					<div className={styles.text}>
						<span className={styles.label}>{about.sectionLabel}</span>
						<h2 className={styles.title}>{about.title}</h2>

						<div className={styles.quote}>
							<p>{about.quote}</p>
						</div>

						<details className={styles.accordion}>
							<summary className={styles.summary}>
								<span className={styles.summaryTitle}>{about.accordionTitle}</span>
								<span className={styles.summaryIcon} aria-hidden="true">
									<svg
										width="20"
										height="20"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path d="M12 5v14M5 12h14" />
									</svg>
								</span>
							</summary>
							<div className={styles.accordionContent}>
								{about.blocks.map(block => (
									<div key={block.label} className={styles.contentBlock}>
										<span className={styles.contentLabel}>{block.label}</span>
										{block.paragraphs.map((p, i) => (
											<p key={i}>{p}</p>
										))}
									</div>
								))}
							</div>
						</details>
					</div>

					<div className={styles.visual}>
						<div className={styles.card}>
							<div className={styles.cardTop}>
								<div className={styles.avatar}>
									<Image
										src={profile.profileImage}
										alt={`${profile.name} 프로필`}
										width={84}
										height={84}
									/>
								</div>
								<div className={styles.cardInfo}>
									<p className={styles.cardName}>{profile.name}</p>
									<p className={styles.cardRole}>{profile.role}</p>
								</div>
							</div>

							<div className={styles.cardMeta}>
								<div className={styles.cardItem}>
									<span className={styles.cardItemLabel}>경력</span>
									<span className={styles.cardItemVal}>{experience}</span>
								</div>
								<div className={styles.cardItem}>
									<span className={styles.cardItemLabel}>핵심 영역</span>
									<span className={styles.cardItemVal}>{profile.coreArea}</span>
								</div>
							</div>

							<div className={styles.skills}>
								{profile.skillChips.map(chip => (
									<span key={chip} className={styles.chip}>
										{chip}
									</span>
								))}
							</div>
						</div>
					</div>
				</Reveal>
			</div>
		</section>
	);
}
