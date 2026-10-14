'use client';

import { useEffect } from 'react';

/** 시안이 정한 값. 한곳에 모아 두어 세기를 바꿀 때 한 자리만 고친다 */
const MOTION = {
	heroShift: 40,
	stageShift: 22,
	railSpeed: 0.24,
	signatureShift: 20,
	revealDistance: 30,
	/** 이 거리(px)를 지나는 동안 문이 완전히 드러난다 */
	revealSpan: 180,
	revealOffset: 35,
	/** 화면 높이의 이 지점에 가장 가까운 문이 «현재 장»이 된다 */
	chapterAnchor: 0.42,
} as const;

const clamp = (value: number, min: number, max: number) =>
	Math.max(min, Math.min(max, value));

export interface KineticScrollTargets {
	progress: React.RefObject<HTMLElement>;
	heroIntro: React.RefObject<HTMLElement>;
	heroStage: React.RefObject<HTMLElement>;
	rail: React.RefObject<HTMLElement>;
	signature: React.RefObject<HTMLElement>;
	doors: React.MutableRefObject<(HTMLElement | null)[]>;
	onChapterChange: (index: number) => void;
}

/**
 * 스크롤에 반응하는 값 전부를 **한 번의 rAF**에서 쓴다.
 *
 * 값을 state로 올리지 않고 스타일에 직접 쓰는 이유는, 프레임마다 리렌더가 돌면
 * 문 4개와 레일까지 묶여 다시 그려지기 때문이다. 장(chapter)만 바뀔 때 state를 건드린다.
 */
export function useKineticScroll(
	targets: KineticScrollTargets,
	moving: boolean
) {
	const {
		progress,
		heroIntro,
		heroStage,
		rail,
		signature,
		doors,
		onChapterChange,
	} = targets;

	useEffect(() => {
		let frame = 0;
		let lastChapter = -1;

		const draw = () => {
			frame = 0;

			const viewportHeight = window.innerHeight;
			const scrollTop = window.scrollY;
			const scrollRange =
				document.documentElement.scrollHeight - viewportHeight;
			const fraction = scrollRange > 0 ? clamp(scrollTop / scrollRange, 0, 1) : 0;

			// 진행 표시는 모션을 꺼도 남는다 — 장식이 아니라 «지금 어디쯤인가»라는 정보다
			if (progress.current) {
				progress.current.style.transform = `scaleX(${fraction})`;
			}

			const strength = moving ? 1 : 0;
			const heroProgress = clamp(scrollTop / 500, 0, 1);

			if (heroIntro.current) {
				heroIntro.current.style.transform = `translateY(${
					-heroProgress * MOTION.heroShift * strength
				}px)`;
			}
			if (heroStage.current) {
				heroStage.current.style.transform = `translateY(${
					heroProgress * MOTION.stageShift * strength
				}px)`;
			}
			if (signature.current) {
				signature.current.style.transform = `translateX(${
					(1 - fraction) * MOTION.signatureShift * strength
				}px)`;
			}
			if (rail.current) {
				// 레일은 같은 낱말 묶음을 두 벌 그린다. 한 벌 너비로 나머지 연산해
				// 페이지가 길어져도 글자가 화면 밖으로 사라지지 않게 한다
				const segment = rail.current.scrollWidth / 2;
				const shift = segment
					? -((scrollTop * MOTION.railSpeed * strength) % segment)
					: 0;
				rail.current.style.transform = `translateX(${shift}px)`;
			}

			let closestIndex = 0;
			let closestDistance = Number.POSITIVE_INFINITY;

			doors.current.forEach((door, index) => {
				if (!door) return;
				const rect = door.getBoundingClientRect();
				const visible = clamp(
					(viewportHeight - rect.top - MOTION.revealOffset) / MOTION.revealSpan,
					0,
					1
				);
				door.style.setProperty(
					'--reveal-y',
					moving ? `${(1 - visible) * MOTION.revealDistance}px` : '0px'
				);
				door.style.setProperty(
					'--reveal-opacity',
					moving ? String(0.35 + 0.65 * visible) : '1'
				);

				const distance = Math.abs(
					rect.top - viewportHeight * MOTION.chapterAnchor
				);
				if (distance < closestDistance) {
					closestIndex = index;
					closestDistance = distance;
				}
			});

			if (closestIndex !== lastChapter) {
				lastChapter = closestIndex;
				onChapterChange(closestIndex);
			}
		};

		const schedule = () => {
			if (frame) return;
			frame = window.requestAnimationFrame(draw);
		};

		schedule();
		window.addEventListener('scroll', schedule, { passive: true });
		window.addEventListener('resize', schedule, { passive: true });

		// 폰트가 늦게 오면 문 위치가 밀린다. 로드 뒤 한 번 더 잰다
		document.fonts?.ready.then(schedule).catch(() => {});

		return () => {
			if (frame) window.cancelAnimationFrame(frame);
			window.removeEventListener('scroll', schedule);
			window.removeEventListener('resize', schedule);
		};
	}, [progress, heroIntro, heroStage, rail, signature, doors, onChapterChange, moving]);
}
