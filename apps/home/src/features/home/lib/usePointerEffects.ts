'use client';

import type { PointerEvent as ReactPointerEvent } from 'react';
import { useMemo } from 'react';

const MAGNET_DISTANCE = 12;
const LETTER_LIFT = 25;
const LETTER_TURN = 18;

const clamp = (value: number, min: number, max: number) =>
	Math.max(min, Math.min(max, value));

/**
 * 포인터 효과는 전부 **React 이벤트 핸들러**로 붙인다.
 *
 * `addEventListener`로 직접 걸면 요소마다 정리 코드를 들고 다녀야 하고, 모션을 껐다 켤 때마다
 * 붙였다 떼는 과정에서 하나를 흘리기 쉽다. 여기서는 React가 해제를 책임지고, 꺼진 동안에는
 * 핸들러 자체를 `undefined`로 넘겨 아예 달리지 않게 한다.
 *
 * 값은 전부 CSS 커스텀 속성으로만 쓴다 — `transform`을 직접 덮으면
 * 스크롤 시차와 서로를 지운다.
 */

/** 마우스를 부드럽게 따라오는 버튼 */
export function useMagneticHandlers(active: boolean) {
	return useMemo(() => {
		if (!active) return undefined;

		const reset = (event: ReactPointerEvent<HTMLElement>) => {
			event.currentTarget.style.transform = '';
		};

		return {
			onPointerMove: (event: ReactPointerEvent<HTMLElement>) => {
				const node = event.currentTarget;
				const box = node.getBoundingClientRect();
				const x =
					((event.clientX - box.left) / box.width - 0.5) * MAGNET_DISTANCE;
				const y =
					((event.clientY - box.top) / box.height - 0.5) * MAGNET_DISTANCE;
				node.style.transform = `translate(${x}px, ${y}px)`;
			},
			onPointerLeave: reset,
			onPointerCancel: reset,
		};
	}, [active]);
}

/** 카드 묶음이 마우스 쪽으로 살짝 기운다 */
export function useTiltHandlers(active: boolean) {
	return useMemo(() => {
		if (!active) return undefined;

		const reset = (event: ReactPointerEvent<HTMLElement>) => {
			event.currentTarget.style.setProperty('--mx', '0');
			event.currentTarget.style.setProperty('--my', '0');
		};

		return {
			onPointerMove: (event: ReactPointerEvent<HTMLElement>) => {
				const node = event.currentTarget;
				const rect = node.getBoundingClientRect();
				node.style.setProperty(
					'--mx',
					String((event.clientX - rect.left) / rect.width - 0.5)
				);
				node.style.setProperty(
					'--my',
					String((event.clientY - rect.top) / rect.height - 0.5)
				);
			},
			onPointerLeave: reset,
			onPointerCancel: reset,
		};
	}, [active]);
}

/** 문 위를 따라다니는 스포트라이트 */
export function useSpotlightHandlers(active: boolean) {
	return useMemo(() => {
		if (!active) return undefined;

		return {
			onPointerMove: (event: ReactPointerEvent<HTMLElement>) => {
				const node = event.currentTarget;
				const rect = node.getBoundingClientRect();
				node.style.setProperty('--px', `${event.clientX - rect.left}px`);
				node.style.setProperty('--py', `${event.clientY - rect.top}px`);
			},
		};
	}, [active]);
}

/**
 * 글자 웨이브. **터치도 받는다** — 지나간 자리만 들어 올리므로 손가락으로도 뜻이 통한다.
 * 세로 스크롤을 뺏지 않도록 CSS에서 `touch-action: pan-y`를 준다.
 */
export function useWaveHandlers(active: boolean) {
	return useMemo(() => {
		const resetNode = (node: HTMLElement) => {
			node.querySelectorAll<HTMLElement>('[data-letter]').forEach(letter => {
				letter.style.setProperty('--letter-y', '0px');
				letter.style.setProperty('--letter-r', '0deg');
			});
		};

		if (!active) return undefined;

		const reset = (event: ReactPointerEvent<HTMLElement>) =>
			resetNode(event.currentTarget);

		return {
			onPointerMove: (event: ReactPointerEvent<HTMLElement>) => {
				const node = event.currentTarget;
				const letters = Array.from(
					node.querySelectorAll<HTMLElement>('[data-letter]')
				);
				if (letters.length === 0) return;

				const box = node.getBoundingClientRect();
				const pointerX = clamp((event.clientX - box.left) / box.width, 0, 1);

				letters.forEach((letter, index) => {
					const center = (index + 0.5) / letters.length;
					const influence = Math.exp(-Math.pow((pointerX - center) * 4, 2));
					letter.style.setProperty(
						'--letter-y',
						`${-influence * LETTER_LIFT}px`
					);
					letter.style.setProperty(
						'--letter-r',
						`${(pointerX - center) * influence * LETTER_TURN}deg`
					);
				});
			},
			onPointerLeave: reset,
			onPointerUp: reset,
			onPointerCancel: reset,
		};
	}, [active]);
}
