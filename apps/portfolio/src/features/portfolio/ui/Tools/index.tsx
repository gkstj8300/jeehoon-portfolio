import { tools, toolsHeader } from '@/features/portfolio/contents';
import Reveal from '@/features/portfolio/ui/common/Reveal';
import styles from './Tools.module.scss';

const groupIcon: Record<string, React.ReactNode> = {
	frontend: (
		<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<polyline points="16 18 22 12 16 6" />
			<polyline points="8 6 2 12 8 18" />
		</svg>
	),
	'state-style': (
		<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
		</svg>
	),
	workflow: (
		<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
		</svg>
	),
	'ai-workflow': (
		<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z" />
		</svg>
	),
};

export default function Tools() {
	return (
		<section className={styles.tools} id="tools">
			<div className={styles.inner}>
				<Reveal className={styles.header}>
					<h3 className={styles.headerTitle}>{toolsHeader.title}</h3>
					<p className={styles.headerDesc}>{toolsHeader.desc}</p>
				</Reveal>

				<div className={styles.grid}>
					{tools.map((group, idx) => (
						<Reveal key={group.id} delay={idx * 80} className={styles.group}>
							<div className={styles.groupHeader}>
								<span className={styles.groupIcon}>{groupIcon[group.id]}</span>
								<div className={styles.groupTitleWrap}>
									<h4 className={styles.groupTitle}>{group.title}</h4>
									<p className={styles.groupSubtitle}>{group.subtitle}</p>
								</div>
							</div>
							<ul className={styles.list}>
								{group.items.map(item => (
									<li key={item.name} className={styles.item}>
										<span className={styles.itemName}>{item.name}</span>
										<span className={styles.itemDesc}>{item.desc}</span>
									</li>
								))}
							</ul>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}
