'use client';

import { useCallback, useRef, useState } from 'react';
import { railWords } from '@/features/home/contents/kinetic';
import { useMotion } from '@/features/home/lib/motionContext';
import { useKineticScroll } from '@/features/home/lib/useKineticScroll';
import styles from './KineticHome.module.scss';
import Finale from './Finale';
import Hero from './Hero';
import Hub from './Hub';
import Play from './Play';

/**
 * 레일은 같은 묶음을 두 벌 그려 이어 붙인다 — 한 벌 너비로 나머지 연산해 끊김을 없앤다.
 * 낱말 사이의 화살표가 짝수 번째가 되어 브랜드 색을 받는다.
 */
const railSequence = [...railWords, ...railWords].flatMap(word => [word, '↗']);

export default function KineticHome() {
	const { moving } = useMotion();

	const progressRef = useRef<HTMLDivElement>(null);
	const introRef = useRef<HTMLDivElement>(null);
	const stageRef = useRef<HTMLDivElement>(null);
	const railRef = useRef<HTMLDivElement>(null);
	const signatureRef = useRef<HTMLParagraphElement>(null);
	const heroRef = useRef<HTMLElement>(null);
	const hubRef = useRef<HTMLElement>(null);
	const doorsRef = useRef<(HTMLAnchorElement | null)[]>([]);

	const [activeChapter, setActiveChapter] = useState(0);

	const handleChapterChange = useCallback((index: number) => {
		setActiveChapter(previous => (previous === index ? previous : index));
	}, []);

	useKineticScroll(
		{
			progress: progressRef,
			heroIntro: introRef,
			heroStage: stageRef,
			rail: railRef,
			signature: signatureRef,
			doors: doorsRef,
			onChapterChange: handleChapterChange,
		},
		moving
	);

	return (
		<div className={styles.root} data-still={String(!moving)}>
			<div className={styles.progressTrack} aria-hidden="true">
				<div className={styles.progressBar} ref={progressRef} />
			</div>

			<Hero ref={heroRef} introRef={introRef} stageRef={stageRef} />

			<div className={styles.rail} aria-hidden="true">
				<div className={styles.railInner} ref={railRef}>
					{railSequence.map((word, index) => (
						<span key={`${word}-${index}`}>{word}</span>
					))}
				</div>
			</div>

			<Hub
				ref={hubRef}
				doorsRef={doorsRef}
				activeChapter={activeChapter}
				onChapterFocus={handleChapterChange}
			/>

			<Play />

			<Finale signatureRef={signatureRef} />
		</div>
	);
}
KineticHome.displayName = 'KineticHome';
