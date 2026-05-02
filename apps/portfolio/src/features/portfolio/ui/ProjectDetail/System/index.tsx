import Image from 'next/image';
import type { SystemBlock } from '@/features/portfolio/contents';
import Reveal from '@/features/portfolio/ui/common/Reveal';
import { StrategyIconSvg } from '../icons';
import styles from './System.module.scss';

interface SystemProps {
	data: SystemBlock;
}

export default function System({ data }: SystemProps) {
	return (
		<section className={styles.section}>
			<div className={styles.inner}>
				<Reveal className={styles.header}>
					<span className={styles.label}>{data.label}</span>
					<h2 className={styles.title}>{data.title}</h2>
					<p className={styles.lead}>{data.lead}</p>
				</Reveal>

				<div className={styles.grid}>
					<Reveal className={styles.cards}>
						{data.cards.map(card => (
							<article key={card.title} className={styles.card}>
								<span className={styles.cardIcon}>
									<StrategyIconSvg name={card.icon} size={18} />
								</span>
								<div className={styles.cardBody}>
									<h3 className={styles.cardTitle}>{card.title}</h3>
									<p className={styles.cardText}>{card.text}</p>
								</div>
							</article>
						))}
					</Reveal>
					<Reveal delay={120} className={styles.visual}>
						<div className={styles.visualWrap}>
							<Image
								src={data.rightImage.src}
								alt={data.rightImage.alt}
								fill
								sizes="(max-width: 900px) 100vw, 50vw"
							/>
						</div>
					</Reveal>
				</div>
			</div>
		</section>
	);
}
