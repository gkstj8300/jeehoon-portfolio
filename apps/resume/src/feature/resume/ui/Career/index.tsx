import { careerSection, careers } from './career.data';
import styles from '../ResumePage/ResumePage.module.scss';

export default function Career() {
	return (
		<section
			className={`${styles.chapter} ${styles.career}`}
			id="career"
			aria-labelledby="resume-career-title"
		>
			<div className={styles.chapterIntro}>
				<span className={styles.eyebrow}>{careerSection.eyebrow}</span>
				<h2 className={styles.sectionTitle} id="resume-career-title">
					{careerSection.title}
				</h2>
				<p>{careerSection.description}</p>
			</div>

			<div>
				{careers.map(entry => (
					<article className={styles.company} key={entry.company}>
						<div className={styles.companyHead}>
							<h3>{entry.company}</h3>
							<small className={styles.companyMeta}>{entry.period}</small>
						</div>
						<small className={styles.companyMeta}>{entry.role}</small>
						<p>{entry.summary}</p>
						<div className={styles.chips}>
							{entry.chips.map(chip => (
								<span key={chip}>{chip}</span>
							))}
						</div>
					</article>
				))}
			</div>
		</section>
	);
}
Career.displayName = 'Career';
