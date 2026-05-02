'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './ProjectBar.module.scss';

interface ProjectBarProps {
	title: string;
	tags: readonly string[];
}

export default function ProjectBar({ title, tags }: ProjectBarProps) {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const onScroll = () => {
			const doc = document.documentElement;
			const scrollTop = doc.scrollTop || document.body.scrollTop;
			const max = doc.scrollHeight - doc.clientHeight;
			setProgress(max > 0 ? (scrollTop / max) * 100 : 0);
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return (
		<div className={styles.bar}>
			<div className={styles.inner}>
				<div className={styles.left}>
					<Link href="/#projects" className={styles.back} aria-label="프로젝트 목록으로 돌아가기">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
							<path d="M19 12H5M5 12l7 7M5 12l7-7" />
						</svg>
						Back
					</Link>
					<span className={styles.divider} />
					<span className={styles.title}>{title}</span>
				</div>
				<div className={styles.right}>
					<span className={styles.tags}>{tags.slice(0, 4).join(' / ')}</span>
				</div>
			</div>
			<div className={styles.progress} style={{ width: `${progress}%` }} aria-hidden="true" />
		</div>
	);
}
