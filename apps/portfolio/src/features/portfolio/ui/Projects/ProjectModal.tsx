'use client';

import { useEffect } from 'react';
import type { Project } from '@/features/portfolio/contents';
import styles from './ProjectModal.module.scss';

interface ProjectModalProps {
	project: Project | null;
	onClose: () => void;
}

function formatDuration(start: string, end: string) {
	const fmt = (s: string) => {
		if (s === '진행중') return s;
		const [y, m] = s.split('-');
		return `${y}.${m}`;
	};
	return `${fmt(start)} ~ ${fmt(end)}`;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
	useEffect(() => {
		if (!project) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};
		document.addEventListener('keydown', onKey);
		document.body.style.overflow = 'hidden';
		return () => {
			document.removeEventListener('keydown', onKey);
			document.body.style.overflow = '';
		};
	}, [project, onClose]);

	if (!project) return null;

	return (
		<div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true">
			<div className={styles.modal} onClick={e => e.stopPropagation()}>
				<button
					type="button"
					className={styles.closeBtn}
					onClick={onClose}
					aria-label="닫기"
				>
					<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<path d="M18 6 6 18M6 6l12 12" />
					</svg>
				</button>

				<div className={styles.header}>
					<span className={styles.category}>{project.categoryLabel}</span>
					<h3 className={styles.title}>{project.title}</h3>
					<p className={styles.summary}>{project.summary}</p>
					<div className={styles.meta}>
						<span>{formatDuration(project.durationStart, project.durationEnd)}</span>
					</div>
					<div className={styles.tags}>
						{project.tags.map(tag => (
							<span key={tag} className={styles.tag}>
								{tag}
							</span>
						))}
					</div>
				</div>

				<div className={styles.body}>
					<h4 className={styles.bodyTitle}>주요 작업</h4>
					<ul className={styles.highlights}>
						{project.highlights.map((h, i) => (
							<li key={i}>{h}</li>
						))}
					</ul>

					{project.links && project.links.length > 0 ? (
						<div className={styles.linksWrap}>
							<h4 className={styles.bodyTitle}>관련 링크</h4>
							<div className={styles.links}>
								{project.links.map(link => (
									<a
										key={link.href}
										href={link.href}
										target="_blank"
										rel="noopener noreferrer"
										className={styles.link}
									>
										<span>{link.label}</span>
										<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
											<path d="M7 17L17 7M17 7H7M17 7v10" />
										</svg>
									</a>
								))}
							</div>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}
