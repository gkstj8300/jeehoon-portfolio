'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import type { ShowcaseBlock } from '@/features/portfolio/contents';
import Reveal from '@/features/portfolio/ui/common/Reveal';
import styles from './Showcase.module.scss';

interface ShowcaseProps {
	data: ShowcaseBlock;
}

export default function Showcase({ data }: ShowcaseProps) {
	const [activeId, setActiveId] = useState(data.items[0]?.id ?? '');
	const [lightboxOpen, setLightboxOpen] = useState(false);
	const active = data.items.find(item => item.id === activeId) ?? data.items[0];

	const openLightbox = useCallback((id?: string) => {
		if (id) setActiveId(id);
		setLightboxOpen(true);
	}, []);
	const closeLightbox = useCallback(() => setLightboxOpen(false), []);

	useEffect(() => {
		if (!lightboxOpen) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') closeLightbox();
		};
		document.addEventListener('keydown', onKey);
		const prevOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			document.removeEventListener('keydown', onKey);
			document.body.style.overflow = prevOverflow;
		};
	}, [lightboxOpen, closeLightbox]);

	return (
		<section className={`${styles.section} ${styles.alt}`}>
			<div className={styles.inner}>
				<Reveal className={styles.header}>
					<span className={styles.label}>{data.label}</span>
					<h2 className={styles.title}>{data.title}</h2>
					<p className={styles.lead}>{data.lead}</p>
				</Reveal>

				{data.layout === 'tabs' ? (
					<Reveal>
						<div className={styles.tabsWrap}>
							<div className={styles.tabs} role="tablist">
								{data.items.map(item => (
									<button
										key={item.id}
										type="button"
										role="tab"
										aria-selected={item.id === activeId}
										className={`${styles.tabBtn} ${item.id === activeId ? styles.tabActive : ''}`}
										onClick={() => setActiveId(item.id)}
									>
										{item.label}
									</button>
								))}
							</div>
							<p className={styles.tabsHint}>탭을 눌러 화면을 전환해보세요</p>
						</div>

						{active ? (
							<div className={styles.imageWrap}>
								<Image
									key={active.id}
									src={active.image.src}
									alt={active.image.alt}
									fill
									sizes="(max-width: 1100px) 100vw, 1100px"
									className={styles.image}
								/>
								<button
									type="button"
									className={styles.expandBtn}
									onClick={() => openLightbox()}
									aria-label="이미지 전체보기"
								>
									<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
										<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
									</svg>
								</button>
							</div>
						) : null}
					</Reveal>
				) : (
					<div className={styles.grid}>
						{data.items.map((item, idx) => (
							<Reveal key={item.id} delay={idx * 60} className={styles.gridCell}>
								<button
									type="button"
									className={styles.gridImageWrap}
									onClick={() => openLightbox(item.id)}
									aria-label={`${item.label} 전체보기`}
								>
									<Image
										src={item.image.src}
										alt={item.image.alt}
										fill
										sizes="(max-width: 768px) 100vw, 50vw"
										className={styles.image}
									/>
									<span className={styles.gridExpandHint}>
										<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
											<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
										</svg>
										전체보기
									</span>
								</button>
								<span className={styles.gridLabel}>{item.label}</span>
							</Reveal>
						))}
					</div>
				)}
			</div>

			{lightboxOpen && active ? (
				<div
					className={styles.lightbox}
					role="dialog"
					aria-modal="true"
					aria-label="이미지 전체보기"
					data-lenis-prevent
				>
					<button
						type="button"
						className={styles.lightboxBackdrop}
						onClick={closeLightbox}
						aria-label="닫기"
					/>
					<div className={styles.lightboxContent}>
						<div className={styles.lightboxImageWrap}>
							<Image
								key={active.id}
								src={active.image.src}
								alt={active.image.alt}
								fill
								sizes="100vw"
								className={styles.lightboxImage}
								priority
							/>
						</div>
						<div className={styles.lightboxTabs} role="tablist">
							{data.items.map(item => (
								<button
									key={item.id}
									type="button"
									role="tab"
									aria-selected={item.id === activeId}
									className={`${styles.lightboxTabBtn} ${item.id === activeId ? styles.lightboxTabActive : ''}`}
									onClick={() => setActiveId(item.id)}
								>
									{item.label}
								</button>
							))}
						</div>
					</div>
					<button
						type="button"
						className={styles.lightboxClose}
						onClick={closeLightbox}
						aria-label="닫기"
					>
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
							<path d="M6 6l12 12M18 6L6 18" />
						</svg>
					</button>
				</div>
			) : null}
		</section>
	);
}
