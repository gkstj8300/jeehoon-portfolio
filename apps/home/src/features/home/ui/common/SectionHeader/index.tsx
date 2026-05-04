import styles from './SectionHeader.module.scss';

interface SectionHeaderProps {
	label: string;
	title: string;
	desc?: string;
	align?: 'left' | 'center';
}

export default function SectionHeader({ label, title, desc, align = 'left' }: SectionHeaderProps) {
	return (
		<div className={`${styles.header} ${align === 'center' ? styles.center : ''}`}>
			<span className={styles.label}>{label}</span>
			<h2 className={styles.title}>{title}</h2>
			{desc ? <p className={styles.desc}>{desc}</p> : null}
		</div>
	);
}
