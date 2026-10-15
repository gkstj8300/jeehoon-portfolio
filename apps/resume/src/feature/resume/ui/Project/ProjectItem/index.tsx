import type { ProjectEntry } from '../project.data';
import styles from '../../ResumePage/ResumePage.module.scss';

interface ProjectItemProps {
	project: ProjectEntry;
}

/** `**…**` 구간을 <strong>으로 바꾼다. 짝이 맞지 않으면 그대로 둔다 */
function withEmphasis(text: string) {
	const parts = text.split('**');
	if (parts.length % 2 === 0) return text;
	return parts.map((part, index) =>
		index % 2 === 1 ? <strong key={index}>{part}</strong> : part
	);
}

/**
 * `<details>`를 그대로 쓴다 — 펼침·접힘과 키보드 조작을 브라우저가 맡으므로
 * 상태를 따로 들고 있을 이유가 없고, JS가 없어도 열린다.
 */
export default function ProjectItem({ project }: ProjectItemProps) {
	const { featured } = project;

	return (
		<details
			className={`${styles.project} ${featured ? styles.featured : ''}`.trim()}
			open={project.defaultOpen}
		>
			<summary>
				<span className={styles.ordinal}>{project.ordinal}</span>

				<span>
					{featured ? (
						<span className={styles.caseTag}>{featured.tag}</span>
					) : null}
					<strong className={styles.projectName}>{project.title}</strong>
					<small className={styles.projectMeta}>{project.meta}</small>

					{featured ? (
						<span className={styles.caseContext}>
							<span>
								<b>문제</b>
								{featured.problem}
							</span>
							<span>
								<b>해결</b>
								{featured.solution}
							</span>
						</span>
					) : null}
				</span>

				{featured ? (
					<span className={styles.caseOutcome}>
						<span className={styles.outcomeLabel}>{featured.outcomeLabel}</span>
						<strong>{featured.outcome}</strong>
						<small>{featured.outcomeNote}</small>
					</span>
				) : null}

				<span className={styles.plus} aria-hidden="true">
					+
				</span>
			</summary>

			<div className={styles.detail}>
				{project.stack ? <p className={styles.stack}>{project.stack}</p> : null}

				{project.blocks.map((block, index) => (
					<div key={block.heading ?? `block-${index}`}>
						{block.heading ? <h3>{block.heading}</h3> : null}
						<ul>
							{block.items.map(item => (
								<li key={item}>{withEmphasis(item)}</li>
							))}
						</ul>
					</div>
				))}

				{featured ? (
					<a
						className={styles.caseLink}
						href={featured.href}
						target="_blank"
						rel="noopener noreferrer"
					>
						프로젝트 상세 ↗
					</a>
				) : null}
			</div>
		</details>
	);
}
ProjectItem.displayName = 'ProjectItem';
