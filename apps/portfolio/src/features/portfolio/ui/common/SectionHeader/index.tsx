import styles from './SectionHeader.module.scss';

interface SectionHeaderProps {
	label: string;
	title: React.ReactNode;
	desc?: React.ReactNode;
	align?: 'left' | 'center';
}

export default function SectionHeader({
	label,
	title,
	desc,
	align = 'left',
}: SectionHeaderProps) {
	return (
		<header className={`${styles.header} ${styles[`align-${align}`]}`}>
			<span className={styles.label}>{label}</span>
			<h2 className={styles.title}>{title}</h2>
			{desc ? <p className={styles.desc}>{desc}</p> : null}
		</header>
	);
}
