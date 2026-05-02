import { contact } from '@/features/portfolio/contents';
import Reveal from '@/features/portfolio/ui/common/Reveal';
import styles from './Contact.module.scss';

const icons: Record<string, React.ReactNode> = {
	tel: (
		<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
		</svg>
	),
	email: (
		<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<rect x="2" y="4" width="20" height="16" rx="2" />
			<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
		</svg>
	),
	github: (
		<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
		</svg>
	),
	blog: (
		<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<circle cx="12" cy="12" r="10" />
			<path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
		</svg>
	),
};

export default function Contact() {
	return (
		<section className={styles.contact} id="contact">
			<div className={styles.inner}>
				<Reveal className={styles.grid}>
					<div className={styles.main}>
						<span className={styles.label}>{contact.sectionLabel}</span>
						<h2 className={styles.title}>{contact.title}</h2>
						<p className={styles.desc}>{contact.desc}</p>

						<div className={styles.links}>
							{contact.links.map(link => (
								<a
									key={link.id}
									href={link.href}
									className={styles.linkCard}
									target={link.id === 'github' || link.id === 'blog' ? '_blank' : undefined}
									rel={link.id === 'github' || link.id === 'blog' ? 'noopener noreferrer' : undefined}
								>
									<div className={styles.linkIcon}>{icons[link.id]}</div>
									<div className={styles.linkText}>
										<span className={styles.linkLabel}>{link.label}</span>
										<span className={styles.linkVal}>{link.value}</span>
									</div>
									<svg className={styles.linkArrow} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
										<path d="M7 17L17 7M17 7H7M17 7v10" />
									</svg>
								</a>
							))}
						</div>
					</div>
				</Reveal>
			</div>
		</section>
	);
}
