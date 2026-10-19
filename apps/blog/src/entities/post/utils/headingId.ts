/** 본문 제목의 id와 목차 링크가 같은 규칙을 써야 목차를 눌렀을 때 해당 제목으로 이동한다 */
export function toHeadingId(text: string) {
	return text.replace(/\s+/g, '-').toLowerCase();
}
