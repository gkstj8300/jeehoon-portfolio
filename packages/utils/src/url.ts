export const url = {
	// Home
	home: 'https://baakhan.com',
	// Portfolio (자체 앱)
	portfolio: 'https://portfolio.baakhan.com',
	// Resume
	resume: 'https://resume.baakhan.com',
	// Blog
	blog: 'https://blog.baakhan.com',
	// Lab
	lab: 'https://lab.baakhan.com',
	// 깃허브 링크
	github: 'https://github.com/gkstj8300/',
	// 깃허브 레파지토리 링크
	githubRepository: 'https://github.com/gkstj8300/jeehoon-blog',
	// 경력기술서 링크
	careerDescription: 'https://parkjeehoon-career-description.vercel.app/',
	// 게시글 상세
	postDetail: (slug: string) => {
		return `/post/detail/${slug}`;
	},
	// 스킬 상세
	skillDetail: (slug: string) => {
		return `/skills/${slug}`;
	},
};
