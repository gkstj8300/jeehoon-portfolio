import type { StrategyCard } from '@/features/portfolio/contents';
import Reveal from '@/features/portfolio/ui/common/Reveal';
import { StrategyIconSvg } from '../icons';
import styles from './Strategy.module.scss';

interface StrategyProps {
	label: string;
	title: string;
	lead: string;
	cards: StrategyCard[];
}

export default function Strategy({ label, title, lead, cards }: StrategyProps) {
	return (
		<section className={styles.section}>
			<div className={styles.inner}>
				<Reveal className={styles.header}>
					<span className={styles.label}>{label}</span>
					<h2 className={styles.title}>{title}</h2>
					<p className={styles.lead}>{lead}</p>
				</Reveal>

				<div className={styles.grid}>
					{cards.map((card, idx) => (
						<Reveal key={card.title} delay={idx * 60}>
							<article className={styles.card}>
								<span className={styles.icon}>
									<StrategyIconSvg name={card.icon} />
								</span>
								<h3 className={styles.cardTitle}>{card.title}</h3>
								<p className={styles.cardText}>{card.text}</p>
								{card.why ? (
									<div className={styles.hook}>
										<span className={styles.hookLabel}>Why This Way?</span>
										<p className={styles.hookText}>{card.why}</p>
									</div>
								) : null}
							</article>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}
