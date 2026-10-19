import { getPostsInFolderOrder } from './getMarkdownAllPosts';
import { PostType } from '@/shared/types/slug';

/**
 * 파일을 하나씩 다시 읽지 않고, 파싱해 둔 목록에서 슬러그로 찾는다.
 * 같은 슬러그가 여럿이면 지금까지처럼 폴더 순서에서 먼저 나오는 글을 고른다.
 */
const getMarkdownPost = async (slug: string): Promise<PostType> => {
	const decodingSlug = decodeURIComponent(slug);
	const post = getPostsInFolderOrder().find(({ slug: postSlug }) => postSlug === decodingSlug);

	if (!post) {
		throw new Error('게시글을 찾지 못했습니다.');
	}
	return post;
};

export default getMarkdownPost;
