'use client';

import {
	Theme,
	applyTheme,
	getAppliedTheme,
	resolveTheme,
	subscribeSystemTheme,
	updateLayoutTheme,
} from '@jeehoon/utils';
import { useCallback, useEffect, useState } from 'react';

/**
 * home·portfolio·resume·blog·lab이 함께 쓰는 테마 상태(헤더의 토글이 쓴다).
 * 보이는 테마(<html data-theme>)를 저장된 테마와 계속 맞추는 것까지가 이 훅의 일이다.
 * - 처음에는 그리기 전 스크립트가 정한 값(쿠키, 없으면 OS 설정)을 따른다.
 * - 다른 탭이나 다른 앱에서 바꾼 테마는 이 탭으로 돌아올 때 쿠키를 다시 읽어 맞춘다.
 * - 사용자가 고른 적이 없으면 OS 설정이 바뀔 때 함께 바뀐다.
 * 마운트 전(서버 렌더링)에는 theme이 null이다.
 */
export function useSharedTheme() {
	const [theme, setTheme] = useState<Theme | null>(null);

	useEffect(() => {
		const syncTheme = () => {
			const nextTheme = resolveTheme();
			applyTheme(nextTheme);
			setTheme(nextTheme);
		};
		const syncWhenVisible = () => {
			if (document.visibilityState === 'visible') {
				syncTheme();
			}
		};

		syncTheme();
		document.addEventListener('visibilitychange', syncWhenVisible);
		window.addEventListener('pageshow', syncTheme);
		const unsubscribeSystemTheme = subscribeSystemTheme(syncTheme);

		return () => {
			document.removeEventListener('visibilitychange', syncWhenVisible);
			window.removeEventListener('pageshow', syncTheme);
			unsubscribeSystemTheme();
		};
	}, []);

	/** 지금 «보이는» 테마를 뒤집는다(쿠키 저장이 막힌 브라우저에서도 매번 전환되도록 쿠키가 아니라 화면 기준) */
	const toggleTheme = useCallback(() => {
		const currentTheme = getAppliedTheme() ?? resolveTheme();
		const nextTheme: Theme = currentTheme === 'dark' ? 'light' : 'dark';
		updateLayoutTheme(nextTheme);
		setTheme(nextTheme);
	}, []);

	return { theme, toggleTheme };
}
