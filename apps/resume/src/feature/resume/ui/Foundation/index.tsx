import Education from '../Education';
import Skill from '../Skill';
import styles from '../ResumePage/ResumePage.module.scss';

/** 기술과 교육은 한 장(chapter) 안에서 두 단으로 선다 — 시안의 구성이다 */
export default function Foundation() {
	return (
		<section
			className={`${styles.chapter} ${styles.foundation}`}
			id="foundation"
			aria-labelledby="resume-skill-title resume-education-title"
		>
			<Skill />
			<Education />
		</section>
	);
}
Foundation.displayName = 'Foundation';
