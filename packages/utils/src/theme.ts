/** 브라우저 쿠키 1년 */
const MAX_AGE = 60 * 60 * 24 * 365;
/** home·portfolio·resume·blog·lab 서브도메인이 함께 읽는 상위 도메인 */
const SHARED_COOKIE_DOMAIN = 'baakhan.com';
const DARK_SCHEME_QUERY = '(prefers-color-scheme: dark)';

export type Theme = 'light' | 'dark';

export const THEME_COOKIE_NAME = 'theme';
/** 예전 localStorage 저장 키(getLayoutTheme 전용) */
const LEGACY_STORAGE_KEY = 'theme';
const THEME_COOKIE_PREFIX = `${THEME_COOKIE_NAME}=`;

/**
 * 저장된 테마가 없을 때 서버가 먼저 그리는 테마.
 * 브라우저에서는 그리기 전에 OS 설정으로 바로잡는다(THEME_INIT_SCRIPT).
 */
export const FALLBACK_THEME: Theme = 'light';

export function parseTheme(value: string | null | undefined): Theme | null {
	return value === 'light' || value === 'dark' ? value : null;
}

function isSharedDomain(hostname: string) {
	return hostname === SHARED_COOKIE_DOMAIN || hostname.endsWith(`.${SHARED_COOKIE_DOMAIN}`);
}

/**
 * 사용자가 고른 테마를 쿠키로 남긴다.
 * 운영 도메인에서는 상위 도메인에 저장해 모든 서브도메인이 함께 읽고,
 * localhost 같은 개발 환경에서는 현재 호스트에 저장한다(포트가 달라도 같은 쿠키를 읽는다).
 */
export function setThemeCookie(theme: Theme) {
	const { hostname, protocol } = window.location;
	const isHttps = protocol === 'https:';
	const isOnSharedDomain = isSharedDomain(hostname);

	if (isOnSharedDomain) {
		// 같은 이름의 호스트 전용 쿠키가 남아 있으면 상위 도메인 쿠키와 겹쳐 어느 쪽을 읽을지 모호해진다
		document.cookie = `${THEME_COOKIE_PREFIX}; Path=/; Max-Age=0`;
	}

	document.cookie = [
		`${THEME_COOKIE_PREFIX}${theme}`,
		isOnSharedDomain ? `Domain=.${SHARED_COOKIE_DOMAIN}` : null,
		'Path=/',
		`Max-Age=${MAX_AGE}`,
		isHttps ? 'Secure' : null,
		'SameSite=Lax',
	]
		.filter(Boolean)
		.join('; ');
}

/**
 * 사용자가 고른(쿠키에 저장된) 테마. 고른 적이 없으면 null.
 * 같은 이름의 쿠키가 여럿이면 서버(Next cookies())와 같이 마지막 값을 쓴다.
 */
export function readSavedTheme(): Theme | null {
	const savedValues = document.cookie
		.split('; ')
		.filter(entry => entry.startsWith(THEME_COOKIE_PREFIX))
		.map(entry => entry.slice(THEME_COOKIE_PREFIX.length));
	return parseTheme(savedValues[savedValues.length - 1]);
}

export function getSystemTheme(): Theme {
	return window.matchMedia?.(DARK_SCHEME_QUERY).matches ? 'dark' : 'light';
}

/** 지금 보여야 하는 테마: 사용자가 고른 테마가 있으면 그것, 없으면 OS 설정 */
export function resolveTheme(): Theme {
	return readSavedTheme() ?? getSystemTheme();
}

/** 화면에 적용된 테마(<html data-theme>) */
export function getAppliedTheme(): Theme | null {
	return parseTheme(document.documentElement.getAttribute('data-theme'));
}

/** 화면에만 적용한다(저장하지 않음) */
export function applyTheme(theme: Theme) {
	document.documentElement.setAttribute('data-theme', theme);
}

/** 화면에 적용하고, 다른 앱도 같은 테마를 쓰도록 저장한다 */
export function updateLayoutTheme(theme: Theme) {
	applyTheme(theme);
	setThemeCookie(theme);
}

/**
 * OS 라이트·다크 설정이 바뀔 때 알린다. 해제 함수를 돌려준다.
 * Safari 14 미만은 MediaQueryList.addEventListener가 없어 예전 addListener로 대신한다.
 */
export function subscribeSystemTheme(onChange: () => void): () => void {
	const query = window.matchMedia?.(DARK_SCHEME_QUERY);
	if (!query) {
		return () => undefined;
	}

	if (typeof query.addEventListener === 'function') {
		query.addEventListener('change', onChange);
		return () => query.removeEventListener('change', onChange);
	}

	query.addListener(onChange);
	return () => query.removeListener(onChange);
}

/**
 * 첫 화면을 그리기 전에 실행하는 스크립트(레이아웃 <head>에 인라인으로 넣는다).
 * 서버는 저장된 테마가 없으면 FALLBACK_THEME으로 그리므로, 여기서 OS 설정으로 바로잡아 깜빡임을 막는다.
 * 쿠키를 읽는 규칙은 readSavedTheme과 같다(같은 이름이 여럿이면 마지막 값).
 */
export const THEME_INIT_SCRIPT = [
	'(function(){try{',
	`var prefix=${JSON.stringify(THEME_COOKIE_PREFIX)};`,
	'var saved=null;',
	"document.cookie.split('; ').forEach(function(entry){if(entry.indexOf(prefix)===0){saved=entry.slice(prefix.length);}});",
	"var theme=saved==='light'||saved==='dark'?saved:null;",
	`if(!theme){var prefersDark=!!(window.matchMedia&&window.matchMedia(${JSON.stringify(DARK_SCHEME_QUERY)}).matches);theme=prefersDark?'dark':'light';}`,
	"document.documentElement.setAttribute('data-theme',theme);",
	'}catch(e){}})();',
].join('');

/**
 * @deprecated 예전 localStorage 저장 방식. 테마는 쿠키(THEME_COOKIE_NAME)로 공유한다.
 * main 브랜치의 blog Redux 코드가 아직 import하고 있어, 그 코드를 걷어 낸 뒤 지운다.
 */
export const getLayoutTheme = () => {
	const theme = localStorage.getItem(LEGACY_STORAGE_KEY);
	if (theme) {
		return JSON.parse(theme);
	}
};
