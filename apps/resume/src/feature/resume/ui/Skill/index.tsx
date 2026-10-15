import { Fragment } from 'react';
import { skillGroups, skillSection } from './skill.data';
import styles from '../ResumePage/ResumePage.module.scss';

export default function Skill() {
	return (
		<div>
			<span className={styles.eyebrow}>{skillSection.eyebrow}</span>
			<h2 className={styles.sectionTitle} id="resume-skill-title">
				{skillSection.title}
			</h2>
			<dl className={styles.skills}>
				{skillGroups.map(group => (
					<Fragment key={group.title}>
						<dt>{group.title}</dt>
						<dd>{group.items}</dd>
					</Fragment>
				))}
			</dl>
		</div>
	);
}
Skill.displayName = 'Skill';
