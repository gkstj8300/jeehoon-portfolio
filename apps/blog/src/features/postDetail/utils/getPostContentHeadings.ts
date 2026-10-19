import { toHeadingId } from '@/entities/post/utils/headingId';
import { Heading } from '@/features/postDetail/types';

/** 본문 마크다운의 `#`~`###` 줄로 목차를 만든다 */
export function getPostContentHeadings(content: string): Heading[] {
	const headingMatches = content.match(/^#{1,3} .+/gm) || [];

	return headingMatches.map(heading => {
		const level = heading.match(/^#{1,3}/)?.[0].length || 0;
		const text = heading.replace(/^#{1,3} /, '');
		const id = toHeadingId(text);

		return { level, text, id };
	});
}
