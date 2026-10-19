import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import convertToSlug from '../utils/convertToSlug';
import { PostSummary, PostType } from '@/shared/types/slug';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

/**
 * 게시글은 배포 시점에 고정되는 파일이라 운영에서는 한 번 읽고 파싱한 결과를 요청 간에 재사용한다.
 * 개발 중에는 글을 고치면 바로 반영되도록 매번 다시 읽는다.
 */
const shouldReuseAcrossRequests = process.env.NODE_ENV === 'production';
let cachedPostsInFolderOrder: PostType[] | null = null;
let cachedPostList: PostType[] | null = null;

function readPost(fileName: string): PostType {
	const contents = fs.readFileSync(path.join(postsDirectory, fileName), 'utf8');
	const { data, content } = matter(contents);

	return {
		slug: convertToSlug(data.title),
		title: data.title,
		description: data.description,
		thumbnailImage: data.thumbnailImage,
		mainTag: data.mainTag,
		regDate: data.regDate,
		tags: data.tags,
		content,
	};
}

/** 폴더에 들어 있는 순서 그대로의 전체 게시글. 슬러그로 한 편을 찾을 때 쓴다 */
export function getPostsInFolderOrder(): PostType[] {
	if (cachedPostsInFolderOrder) {
		return cachedPostsInFolderOrder;
	}

	const posts = fs.readdirSync(postsDirectory).map(readPost);

	if (shouldReuseAcrossRequests) {
		cachedPostsInFolderOrder = posts;
	}
	return posts;
}

/** 최신 글 순으로 정렬된 전체 게시글 */
export function getPostsByLatest(): PostType[] {
	if (cachedPostList) {
		return cachedPostList;
	}

	const postList = [...getPostsInFolderOrder()].sort(
		(a, b) => new Date(b.regDate).getTime() - new Date(a.regDate).getTime()
	);

	if (shouldReuseAcrossRequests) {
		cachedPostList = postList;
	}
	return postList;
}

/** 본문을 뺀 게시글 정보. 목록·카드 화면에 넘겨 페이지 데이터 크기를 줄인다 */
export function toPostSummary(post: PostType): PostSummary {
	const { slug, title, description, thumbnailImage, mainTag, regDate, tags } = post;
	return { slug, title, description, thumbnailImage, mainTag, regDate, tags };
}

const getMarkdownAllPosts = async () => {
	return {
		postList: getPostsByLatest(),
	};
};

export default getMarkdownAllPosts;
