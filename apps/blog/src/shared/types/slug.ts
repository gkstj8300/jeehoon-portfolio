export interface PostType {
	slug: string;
	title: string;
	description: string;
	thumbnailImage: string;
	mainTag: string;
	regDate: string;
	tags: string[];
	content: string;
}

/** 목록·카드처럼 본문이 필요 없는 화면에 넘기는 게시글 정보. 본문을 빼서 페이지 데이터 크기를 줄인다 */
export type PostSummary = Omit<PostType, 'content'>;

export interface SkillType {
	slug: string;
	title: string;
	description: string;
	thumbnailImage: string;
	mainTag: string;
	regDate: string;
	tags: string[];
	content: string;
}
