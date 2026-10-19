import "@jeehoon/theme";
import { Infra, pretendard } from '@jeehoon/ui';
import { FALLBACK_THEME, THEME_COOKIE_NAME, parseTheme } from '@jeehoon/utils';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import StandardLayout from '@/shared/layouts/StandardLayout';
import '@/styles/globals.scss';

export const metadata: Metadata = {
	title: 'FE 개발자 박지훈의 포트폴리오 | FE 박지훈',
	description:
		'프론트엔드 개발과 관련된 최신 기술, 개발 경험, 문제 해결 과정을 공유합니다.',
	openGraph: {
		url: 'https://www.baakhan.com/',
		siteName: 'baakhan',
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
