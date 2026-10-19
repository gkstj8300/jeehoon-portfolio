import { useEffect, useRef } from 'react';

/** 블로그 테마 상태가 항상 dark로 고정돼 있어 댓글도 지금까지 github-dark로 그려졌다. 같은 모양을 유지한다 */
const UTTERANCES_THEME = 'github-dark';

export default function PostComents() {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!ref.current) {
			return;
		}

		// 기존에 삽입된 script 제거 (재로드 방지)
		while (ref.current.firstChild) {
			ref.current.removeChild(ref.current.firstChild);
		}

		// 새로운 script 추가
		const scriptElem = document.createElement('script');
		scriptElem.src = 'https://utteranc.es/client.js';
		scriptElem.async = true;
		scriptElem.crossOrigin = 'anonymous';
		scriptElem.setAttribute('repo', 'gkstj8300/blog-comments');
		scriptElem.setAttribute('issue-term', 'pathname');
		scriptElem.setAttribute('label', '댓글');
		scriptElem.setAttribute('theme', UTTERANCES_THEME);

		ref.current.appendChild(scriptElem);
	}, []);

	return <section ref={ref} />;
}
PostComents.displayName = 'PostComents';
