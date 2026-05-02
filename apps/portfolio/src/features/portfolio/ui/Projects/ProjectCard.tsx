import type { Project } from '@/features/portfolio/contents';
import styles from './ProjectCard.module.scss';

interface ProjectCardProps {
	project: Project;
	onClick: () => void;
}

function formatDuration(start: string, end: string) {
	const fmt = (s: string) => {
		if (s === '진행중') return s;
		const [y, m] = s.split('-');
		return `${y}.${m}`;
	};
	return `${fmt(start)} ~ ${fmt(end)}`;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
	return (
		<button
			type="button"
			className={styles.card}
			onClick={onClick}
			aria-label={`${project.title} 자세히 보기`}
			data-category={project.category}
		>
			<div className={styles.thumb}>
				<div className={styles.thumbInner} aria-hidden="true">
					<span className={styles.thumbCompany}>{project.categoryLabel}</span>
				</div>
				<div className={styles.overlay}>
					<span className={styles.viewBtn}>자세히 보기 →</span>
				</div>
			</div>
			<div className={styles.body}>
				<div className={styles.tags}>
					{project.tags.slice(0, 5).map(tag => (
						<span key={tag} className={styles.tag}>
							{tag}
						</span>
					))}
				</div>
				<h3 className={styles.title}>{project.title}</h3>
				<p className={styles.summary}>{project.summary}</p>
				<div className={styles.meta}>
					<span className={styles.metaCompany}>{project.company}</span>
					<span className={styles.metaDot}>·</span>
					<span className={styles.metaDuration}>
						{formatDuration(project.durationStart, project.durationEnd)}
					</span>
				</div>
			</div>
		</button>
	);
}
