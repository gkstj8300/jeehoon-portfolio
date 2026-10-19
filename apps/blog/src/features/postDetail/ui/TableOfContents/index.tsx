'use client';

import { Icons } from '@jeehoon/ui';
import { getHeight } from '@jeehoon/utils';
import classNames from 'classnames';
import { useState, useEffect } from 'react';
import styles from './TableOfContents.module.scss';
import { Heading } from '@/features/postDetail/types/PostDetail.types';

const HEADER_WRAPPER_ID = 'header-wrapper';
/** 모바일에서 목차 버튼을 헤더 아래 이만큼 띄운다 */
const ASIDE_TOP_GAP_PX = 4;
/** 목차로 이동할 때 제목 위에 남기는 여백(고정 헤더 높이 포함) */
const HEADING_SCROLL_MARGIN_PX = 82;
/** 제목이 이 비율 이상 보이면 «지금 읽는 위치»로 표시한다 */
const ACTIVE_HEADING_VISIBLE_RATIO = 0.85;
/** 목차에서 제목 수준 한 단계마다 들이는 왼쪽 여백 */
const INDENT_PER_LEVEL_PX = 5;
/** 이 수준보다 깊은 제목(###)은 하위 항목 모양으로 그린다 */
const TOP_HEADING_MAX_LEVEL = 2;

interface TableOfContentsProps {
	headings: Heading[];
}

/**
 * 고정 헤더 높이. DOM에서만 잴 수 있어 마운트 후(그리고 목차를 여닫을 때) 다시 잰다.
 * 재기 전에는 null — 모바일 목차 버튼이 헤더 뒤 엉뚱한 위치에 비치지 않도록 숨기는 데 쓴다.
 */
function useHeaderHeight(isAside: boolean) {
	const [headerHeight, setHeaderHeight] = useState<number | null>(null);

	useEffect(() => {
		setHeaderHeight(getHeight(`#${HEADER_WRAPPER_ID}`) ?? 0);
	}, [isAside]);

	return headerHeight;
}

/** 화면에 충분히 드러난 제목을 «지금 읽는 위치»로 추적한다 */
function useActiveHeadingId(headings: Heading[], isAside: boolean) {
	const [activeId, setActiveId] = useState<string>(headings[0]?.id || '');

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id);
					}
				});
			},
			{
				rootMargin: '0px',
				threshold: ACTIVE_HEADING_VISIBLE_RATIO,
			}
		);

		headings.forEach(({ id }) => {
			const element = document.getElementById(id);
			if (element) {
				observer.observe(element);
			}
		});

		return () => observer.disconnect();
	}, [headings, isAside]);

	return activeId;
}

function scrollToHeading(id: string) {
	const headingElement = document.getElementById(id);

	if (headingElement) {
		window.scrollTo({
			top: headingElement.offsetTop - HEADING_SCROLL_MARGIN_PX,
			behavior: 'smooth',
		});
	}
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
	const [isAside, setIsAside] = useState<boolean>(false);
	const headerHeight = useHeaderHeight(isAside);
	const activeId = useActiveHeadingId(headings, isAside);

	return (
		<div
			className={styles.sideWrap}
			style={headerHeight === null ? undefined : { top: headerHeight + ASIDE_TOP_GAP_PX }}
			data-measured={headerHeight !== null}
		>
			<div className={styles.asideButton} onClick={() => setIsAside(prev => !prev)}>
				<Icons.RiMenu4Fill className={styles.sideMenuIcon} />
			</div>
			<div className={styles.tableOfContents} data-aside={isAside}>
				<h3 className={styles.heading}>목차</h3>
				<ul className={styles.list}>
					{headings.map(({ level, text, id }, index) => {
						const isChildHeading = TOP_HEADING_MAX_LEVEL < level;
						return (
							<li
								className={classNames(styles.item, isChildHeading && styles.childItem)}
								key={index}
								style={{
									paddingLeft: `${(level - 1) * INDENT_PER_LEVEL_PX}px`,
								}}
								onClick={() => scrollToHeading(id)}
								data-active={activeId === id}
							>
								<span className={classNames(isChildHeading && styles.text)}>{text}</span>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}
TableOfContents.displayName = 'TableOfContents';
