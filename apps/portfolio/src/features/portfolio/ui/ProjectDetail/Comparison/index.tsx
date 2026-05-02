import Image from 'next/image';
import type { ComparisonBlock } from '@/features/portfolio/contents';
import Reveal from '@/features/portfolio/ui/common/Reveal';
import styles from './Comparison.module.scss';

interface ComparisonProps {
	data: ComparisonBlock;
}

export default function Comparison({ data }: ComparisonProps) {
	return (
		<section className={styles.section}>
			<div className={styles.inner}>
				<Reveal className={styles.header}>
					<span className={styles.label}>{data.label}</span>
					<h2 className={styles.title}>{data.title}</h2>
				</Reveal>

				<div className={styles.groups}>
					{data.groups.map((group, idx) => (
						<Reveal
							key={`${group.tag}-${idx}`}
							delay={idx * 80}
							className={`${styles.group} ${styles[`variant-${group.variant}`]}`}
						>
							<div className={styles.imageWrap}>
								<span className={styles.tag}>{group.tag}</span>
								<div className={styles.image}>
									<Image
										src={group.image.src}
										alt={group.image.alt}
										fill
										sizes="(max-width: 900px) 100vw, 50vw"
									/>
								</div>
							</div>
							<div className={styles.meta}>
								<h3 className={styles.metaTitle}>{group.title}</h3>
								<p className={styles.metaDesc}>{group.desc}</p>
							</div>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}
