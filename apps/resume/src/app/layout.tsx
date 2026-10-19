import "@jeehoon/theme";
import { Infra, pretendard } from '@jeehoon/ui';
import { FALLBACK_THEME, THEME_COOKIE_NAME, parseTheme } from '@jeehoon/utils';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import StandardLayout from '@/shared/layouts/StandardLayout';
import '@/styles/globals.scss';

export const metadata: Metadata = {
	title: '박지훈 이력서 | FE 박지훈',
	description:
		'프론트엔드 개발자 박지훈 이력서 | 지금까지의 이력을 보려드립니다.',
	openGraph: {
		url: 'https://resume.baakhan.com/',
		siteName: 'baakhan-resume',
		locale: 'ko',
		type: 'website',
	},
	icons: { icon: '/favicon.ico' },
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const gaId = process.env.GTM_ID;
	// 저장된 테마가 없으면 기본값으로 그리고, <head>의 ThemeScript가 그리기 전에 OS 설정으로 바로잡는다
	const theme = parseTheme(cookies().get(THEME_COOKIE_NAME)?.value) ?? FALLBACK_THEME;

	return (
		<html lang="ko" data-theme={theme} suppressHydrationWarning>
			<head>
				<Infra.ThemeScript />
			</head>
			<body className={pretendard.variable}>
        <StandardLayout>{children}</StandardLayout>
				{gaId ? <Infra.GoogleAnalytics gaId={gaId} /> : null}
			</body>
		</html>
	);
}
