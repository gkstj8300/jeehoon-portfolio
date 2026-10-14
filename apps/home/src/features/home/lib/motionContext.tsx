'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const REDUCED_QUERY = '(prefers-reduced-motion: reduce)';
const FINE_POINTER_QUERY = '(pointer: fine)';

interface MotionValue {
	/** 움직여도 되는가 — 운영체제의 «동작 줄이기» 설정만이 이를 끈다 */
	moving: boolean;
	/** 포인터가 정밀(마우스)한가. 터치에서는 호버성 효과를 걸지 않는다 */
	finePointer: boolean;
}

const MotionContext = createContext<MotionValue | null>(null);

/**
 * 미디어쿼리 구독을 한곳에 모은다 — 네 컴포넌트가 각자 `matchMedia`를 달면
 * 같은 질의에 리스너가 네 개 붙는다.
 *
 * 서버 렌더와 첫 페인트는 항상 `moving: false`로 시작한다. 미디어쿼리는 클라이언트에서만
 * 알 수 있어, 초기값을 추측하면 하이드레이션이 깨진다.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
	const [prefersReduced, setPrefersReduced] = useState(true);
	const [finePointer, setFinePointer] = useState(false);

	useEffect(() => {
		const reducedQuery = window.matchMedia(REDUCED_QUERY);
		const pointerQuery = window.matchMedia(FINE_POINTER_QUERY);

		const syncReduced = () => setPrefersReduced(reducedQuery.matches);
		const syncPointer = () => setFinePointer(pointerQuery.matches);

		syncReduced();
		syncPointer();

		reducedQuery.addEventListener('change', syncReduced);
		pointerQuery.addEventListener('change', syncPointer);

		return () => {
			reducedQuery.removeEventListener('change', syncReduced);
			pointerQuery.removeEventListener('change', syncPointer);
		};
	}, []);

	const value = useMemo<MotionValue>(
		() => ({ moving: !prefersReduced, finePointer }),
		[prefersReduced, finePointer]
	);

	return (
		<MotionContext.Provider value={value}>{children}</MotionContext.Provider>
	);
}

export function useMotion(): MotionValue {
	const value = useContext(MotionContext);
	if (!value) {
		throw new Error('useMotion은 MotionProvider 안에서만 쓸 수 있습니다.');
	}
	return value;
}
