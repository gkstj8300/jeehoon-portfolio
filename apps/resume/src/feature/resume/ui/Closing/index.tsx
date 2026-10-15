import { closing } from './closing.data';
import styles from '../ResumePage/ResumePage.module.scss';

export default function Closing() {
	const [firstLine, secondLine] = closing.titleLines;
	const [before, after] = secondLine.split(closing.accentWord);

	return (
		<section className={styles.closing} aria-labelledby="resume-closing-title">
			<span className={styles.eyebrow}>{closing.eyebrow}</span>
			<h2 className={styles.closingTitle} id="resume-closing-title">
				{firstLine}
				<br />
				{before}
				<em className={styles.closingAccent}>{closing.accentWord}</em>
				{after}
			</h2>
			<a className={styles.email} href={`mailto:${closing.email}`}>
				{closing.email} ↗
			</a>
			<p className={styles.asOf}>{closing.asOf}</p>
		</section>
	);
}
Closing.displayName = 'Closing';
