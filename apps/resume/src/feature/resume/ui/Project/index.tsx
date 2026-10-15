import ProjectItem from './ProjectItem';
import { featuredProjects, otherProjects, projectSection } from './project.data';
import styles from '../ResumePage/ResumePage.module.scss';

export default function Project() {
	return (
		<section
			className={styles.chapter}
			id="work"
			aria-labelledby="resume-work-title"
		>
			<div className={styles.sectionHead}>
				<div>
					<span className={styles.eyebrow}>{projectSection.eyebrow}</span>
					<h2 className={styles.sectionTitle} id="resume-work-title">
						{projectSection.title}
					</h2>
				</div>
				<p>{projectSection.aside}</p>
			</div>

			{featuredProjects.map(project => (
				<ProjectItem key={project.ordinal} project={project} />
			))}

			<h3 className={styles.groupLabel}>{projectSection.groupLabel}</h3>

			{otherProjects.map(project => (
				<ProjectItem key={project.ordinal} project={project} />
			))}
		</section>
	);
}
Project.displayName = 'Project';
