import { THEME_INIT_SCRIPT } from '@jeehoon/utils';

/**
 * 레이아웃 <head>에 넣는 테마 초기화 스크립트.
 * 첫 화면을 그리기 전에 저장된 테마(없으면 OS 설정)를 <html data-theme>에 적용해 깜빡임을 막는다.
 */
export default function ThemeScript() {
	return <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />;
}
