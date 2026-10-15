import { educationSection, schools } from './education.data';
import styles from '../ResumePage/ResumePage.module.scss';

export default function Education() {
	return (
		<div>
			<span className={styles.eyebrow}>{educationSection.eyebrow}</span>
			<h2 className={styles.sectionTitle} id="resume-education-title">
				{educationSection.title}
			</h2>
			{schools.map(school => (
				<div className={styles.school} key={school.name}>
					<div className={styles.schoolDates}>{school.period}</div>
					<div>
						<strong>{school.name}</strong>
						<p>{school.major}</p>
					</div>
				</div>
			))}
		</div>
	);
}
Education.displayName = 'Education';
