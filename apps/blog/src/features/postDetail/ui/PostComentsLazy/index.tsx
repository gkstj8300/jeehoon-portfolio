'use client';

import dynamic from 'next/dynamic';

/** 댓글 스크립트를 받는 동안 자리를 잡아 두는 높이 */
const COMMENTS_PLACEHOLDER_MIN_HEIGHT = '200px';

/** 댓글(utterances)은 본문 뒤에 불러온다. 서버 컴포넌트에서 쓸 수 있도록 지연 로딩을 이 파일에 둔다 */
const PostComentsLazy = dynamic(() => import('@/features/postDetail/ui/PostComents'), {
	ssr: false,
	loading: () => <div style={{ minHeight: COMMENTS_PLACEHOLDER_MIN_HEIGHT }} />,
});

export default PostComentsLazy;
