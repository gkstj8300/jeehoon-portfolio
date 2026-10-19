import getMarkdownAllPosts, { toPostSummary } from '@/entities/post/api/getMarkdownAllPosts';
import PostContent from '@/entities/post/ui/PostContent';
import { createExcerpt } from '@/entities/post/utils/excerpt';
import PostListPage from '@/features/postList/ui/PostListPage';

export default async function PostList() {
	const { postList } = await getMarkdownAllPosts();
	const previews = postList.map(post => ({
		post: toPostSummary(post),
		// 목록의 글 상자는 위쪽 900px만 보이므로, 그 높이를 넘치게 채우는 앞부분만 서버에서 그려 보낸다
		preview: <PostContent content={createExcerpt(post.content)} />,
	}));

	return <PostListPage previews={previews} />;
}
