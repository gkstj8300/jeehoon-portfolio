import "@jeehoon/theme";
import { Layout, Infra, pretendard } from '@jeehoon/ui';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import StandardLayout from '@/shared/layouts/StandardLayout';
import '@/styles/globals.scss';

export const metadata: Metadata = {
	title: '실험실 | FE 박지훈',
	description:
		'프론트엔드 개발에서 시도해본 다양한 실험들을 모아둔 공간이에요.',
	openGraph: {
		url: 'https://lab.baakhan.com/',
		siteName: 'baakhan-lab',
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
	const themeCookie = cookies().get('theme')?.value;
	const theme = themeCookie === 'dark' || themeCookie === 'light' ? themeCookie : 'light';

	return (
		<html lang="ko" data-theme={theme} suppressHydrationWarning>
			<body className={pretendard.variable}>
				<Layout.Blob />
				<StandardLayout>{children}</StandardLayout>
				{gaId ? <Infra.GoogleAnalytics gaId={gaId} /> : null}
			</body>
		</html>
	);
}
