'use client';

import { forwardRef } from 'react';
import { chapters, hub } from '@/features/home/contents/kinetic';
import { useMotion } from '@/features/home/lib/motionContext';
import { useSpotlightHandlers } from '@/features/home/lib/usePointerEffects';
import { ga } from '@/shared/lib/logs/analytics';
import styles from './KineticHome.module.scss';

interface HubProps {
	doorsRef: React.MutableRefObject<(HTMLAnchorElement | null)[]>;
	activeChapter: number;
	onChapterFocus: (index: number) => void;
}

const Hub = forwardRef<HTMLElement, HubProps>(function Hub(
	{ doorsRef, activeChapter, onChapterFocus },
	ref
) {
	const { moving, finePointer } = useMotion();
	const spotlight = useSpotlightHandlers(moving && finePointer);
	// 장 표시는 장식이라, 인덱스가 범위를 벗어나면 그리지 않고 넘어간다
	const current = chapters[activeChapter];

	return (
		<section className={styles.hub} ref={ref} aria-labelledby="home-hub-title">
			<aside className={styles.hubAside}>
				<p className={styles.label}>{hub.label}</p>
				<h2 className={styles.hubTitle} id="home-hub-title">
					{hub.titleLines.map((line, index) => (
						<span key={line}>
							{line}
							{index < hub.titleLines.length - 1 ? <br /> : null}
						</span>
					))}
				</h2>
				<p className={styles.hubText}>
					{hub.descriptionLines.map((line, index) => (
						<span key={line}>
							{line}
							{index < hub.descriptionLines.length - 1 ? <br /> : null}
						</span>
					))}
				</p>

				{/* 지금 보고 있는 구간을 알려 주는 장식. 스크린 리더에는 아래 목록이 이미 있어 감춘다 */}
				<div className={styles.chapterArt} aria-hidden="true">
					{current ? (
						<>
							<span className={styles.chapterIndex}>{current.index}</span>
							<span className={styles.chapterName}>{current.name}</span>
						</>
					) : null}
				</div>
				<div className={styles.chapterDots} aria-hidden="true">
					{chapters.map((chapter, index) => (
						<i
							key={chapter.id}
							className={index === activeChapter ? styles.chapterDotActive : undefined}
						/>
					))}
				</div>
			</aside>

			<div>
				{chapters.map((chapter, index) => (
					<a
						key={chapter.id}
						className={styles.door}
						href={chapter.href}
						target="_blank"
						rel="noopener noreferrer"
						ref={node => {
							doorsRef.current[index] = node;
						}}
						onPointerEnter={() => onChapterFocus(index)}
						onFocus={() => onChapterFocus(index)}
						onClick={() => ga.events.appClick(chapter.id)}
						{...spotlight}
					>
						<span className={styles.doorTop}>
							<span>{chapter.kind}</span>
							<span>{chapter.role}</span>
						</span>
						<span className={styles.doorTitle}>
							<h3 className={styles.doorName}>{chapter.name}</h3>
							<span className={styles.arrow} aria-hidden="true">
								↗
							</span>
						</span>
						<p className={styles.doorQuestion}>{chapter.question}</p>
						<p>{chapter.description}</p>
					</a>
				))}
			</div>
		</section>
	);
});

export default Hub;
