export interface CareerPeriod {
	company: string;
	start: string;        // 'YYYY-MM' or 'YYYY-MM-DD'
	end: string;          // 'YYYY-MM' or 'YYYY-MM-DD' or 'present'
}

function parseDate(value: string, fallbackDay = 1): Date {
	const [y, m, d] = value.split('-').map(Number);
	return new Date(y ?? 1970, (m ?? 1) - 1, d ?? fallbackDay);
}

/** 시작일·종료일 사이의 개월 수 (종료일 포함, 시작일이 더 늦은 day-of-month면 -1) */
function diffMonths(start: string, end: string, now: Date = new Date()): number {
	const startDate = parseDate(start, 1);
	const endDate = end === 'present' ? now : parseDate(end, 1);

	let months =
		(endDate.getFullYear() - startDate.getFullYear()) * 12 +
		(endDate.getMonth() - startDate.getMonth());

	if (endDate.getDate() < startDate.getDate()) {
		months -= 1;
	}

	return Math.max(0, months);
}

/** 회사별 근무 기간을 합산해 "N년 M개월" 표기로 변환 */
export function calcTotalExperience(
	history: readonly CareerPeriod[],
	now: Date = new Date()
): string {
	const totalMonths = history.reduce(
		(sum, period) => sum + diffMonths(period.start, period.end, now),
		0
	);

	const years = Math.floor(totalMonths / 12);
	const months = totalMonths % 12;

	if (years === 0) return `${months}개월`;
	if (months === 0) return `${years}년`;
	return `${years}년 ${months}개월`;
}
