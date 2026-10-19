'use client';

import classNames from 'classnames';
import styles from './ThemeToggle.module.scss';
import { useSharedTheme } from './useSharedTheme';

const ICON_SIZE = 18;

/**
 * 라이트·다크 토글. 손잡이 위치와 아이콘은 React 상태가 아니라 <html data-theme>를 따르는 CSS로 그린다.
 * 서버 렌더링 직후(하이드레이션 전)에도 실제 테마와 같은 모양으로 보이고, 로딩 중 손잡이가 미끄러지지 않는다.
 */
export default function ThemeToggle() {
	const { theme, toggleTheme } = useSharedTheme();

	return (
		<button
			type="button"
			className={styles.toggle}
			onClick={toggleTheme}
			aria-pressed={theme === 'dark'}
			aria-label="Toggle color theme"
			title="Toggle theme"
		>
			<span className={styles.track} aria-hidden="true" />
			<span className={styles.handle} aria-hidden="true">
				{/* moon */}
				<svg
					className={classNames(styles.icon, styles.moonIcon)}
					viewBox="0 0 24 24"
					width={ICON_SIZE}
					height={ICON_SIZE}
					aria-hidden="true"
					focusable="false"
				>
					<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor" />
				</svg>
				{/* sun */}
				<svg
					className={classNames(styles.icon, styles.sunIcon)}
					viewBox="0 0 24 24"
					width={ICON_SIZE}
					height={ICON_SIZE}
					aria-hidden="true"
					focusable="false"
				>
					<path
						d="M12 4a1 1 0 011 1v1a1 1 0 11-2 0V5a1 1 0 011-1zm0 14a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM4 11a1 1 0 011-1H6a1 1 0 110 2H5a1 1 0 01-1-1zm14 0a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM6.3 6.3a1 1 0 011.4 0l.7.7a1 1 0 11-1.4 1.4l-.7-.7a1 1 0 010-1.4zm10.6 10.6a1 1 0 011.4 0l.7.7a1 1 0 11-1.4 1.4l-.7-.7a1 1 0 010-1.4zM6.3 17.7a1 1 0 000-1.4l.7-.7a1 1 0 011.4 1.4l-.7.7a1 1 0 01-1.4 0zm10.6-10.6a1 1 0 000-1.4l.7-.7a1 1 0 011.4 1.4l-.7.7a1 1 0 01-1.4 0zM12 8a4 4 0 100 8 4 4 0 000-8z"
						fill="currentColor"
					/>
				</svg>
			</span>
		</button>
	);
}
