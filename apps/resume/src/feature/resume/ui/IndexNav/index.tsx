'use client';

import { useEffect, useRef, useState } from 'react';
import { indexHint, indexNav } from '../Hero/hero.data';
import styles from '../ResumePage/ResumePage.module.scss';

/** 공통 헤더의 id — `@jeehoon/ui`의 Header가 이 값으로 렌더한다 */
const HEADER_ID = 'header-wrapper';

export default function IndexNav() {
	const barRef = useRef<HTMLDivElement>(null);
	const [current, setCurrent] = useState<string>(indexNav[0].id);

	// 공통 헤더 높이는 화면 폭에 따라 64px·72px로 달라진다. 값을 추측해 박아 두면
	// 바로가기 바가 헤더 밑으로 몇 px 파고든다 — 실제 높이를 재서 CSS 변수로 넘긴다
	useEffect(() => {
		const header = document.getElementById(HEADER_ID);
		const page = barRef.current?.closest('main');
		if (!header || !page) return;

		const sync = () => {
			page.style.setProperty(
				'--rs-header-h',
				`${header.getBoundingClientRect().height}px`
			);
		};

		sync();
		const observer = new ResizeObserver(sync);
		observer.observe(header);
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		let frame = 0;

		const read = () => {
			frame = 0;
			const bar = barRef.current?.getBoundingClientRect();
			// 바로가기 바 아래 선을 넘어선 섹션 중 마지막 것을 «읽는 중»으로 본다
			const threshold = (bar?.bottom ?? 0) + 1;
			let active: string = indexNav[0].id;
			for (const { id } of indexNav) {
				const section = document.getElementById(id);
				if (section && section.getBoundingClientRect().top <= threshold) {
					active = id;
				}
			}
			setCurrent(previous => (previous === active ? previous : active));
		};

		const schedule = () => {
			if (frame) return;
			frame = window.requestAnimationFrame(read);
		};

		schedule();
		window.addEventListener('scroll', schedule, { passive: true });
		window.addEventListener('resize', schedule, { passive: true });

		return () => {
			if (frame) window.cancelAnimationFrame(frame);
			window.removeEventListener('scroll', schedule);
			window.removeEventListener('resize', schedule);
		};
	}, []);

	return (
		<div className={styles.indexBar} ref={barRef}>
			{/* 앵커 링크 그대로 둔다 — 스크롤 가로채기 없이 브라우저가 옮기고,
			    섹션의 scroll-margin-top이 고정 헤더를 비켜 준다 */}
			<nav aria-label="내용 바로가기">
				{indexNav.map(item => (
					<a
						key={item.id}
						href={`#${item.id}`}
						className={current === item.id ? styles.indexActive : undefined}
						aria-current={current === item.id ? 'location' : undefined}
					>
						{item.label}
					</a>
				))}
			</nav>
			<span className={styles.indexHint} aria-hidden="true">
				{indexHint}
			</span>
		</div>
	);
}
IndexNav.displayName = 'IndexNav';
