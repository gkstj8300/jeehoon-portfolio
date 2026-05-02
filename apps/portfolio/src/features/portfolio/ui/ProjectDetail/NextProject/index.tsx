import Link from 'next/link';
import type { Project } from '@/features/portfolio/contents';
import styles from './NextProject.module.scss';

interface NextProjectProps {
	project: Project;
}

export default function NextProject({ project }: NextProjectProps) {
	return (
		<section className={styles.section}>
			<div className={styles.inner}>
				<span className={styles.label}>Next Project</span>
				<Link href={`/projects/${project.slug}/`} className={styles.card}>
					<div className={styles.text}>
						<div className={styles.pretitle}>{project.tags.slice(0, 3).join(' · ')}</div>
						<div className={styles.title}>{project.title}</div>
						<div className={styles.meta}>{project.summary}</div>
					</div>
					<div className={styles.arrow}>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
							<path d="M5 12h14M12 5l7 7-7 7" />
						</svg>
					</div>
				</Link>
			</div>
		</section>
	);
}
