import type { ProjectDetail } from './types';
import { smbEmission } from './smb-emission';
import { bees } from './bees';
import { sems } from './sems';
import { jhSolution } from './jh-solution';
import { misumiRenewal } from './misumi-renewal';
import { misumiMaintenance } from './misumi-maintenance';
import { naedamHomepage } from './naedam-homepage';
import { hanwhaCore } from './hanwha-core';
import { zipboda } from './zipboda';

const all: ProjectDetail[] = [
	smbEmission,
	bees,
	sems,
	jhSolution,
	misumiRenewal,
	misumiMaintenance,
	naedamHomepage,
	hanwhaCore,
	// 개인 프로젝트는 업무 프로젝트 뒤에 둔다 — «다음 프로젝트» 순환도 업무를 다 본 뒤에 온다
	zipboda,
];

export const projectDetails: Record<string, ProjectDetail> = Object.fromEntries(
	all.map(p => [p.slug, p])
);

export const projectDetailSlugs = all.map(p => p.slug);

export function getProjectDetail(slug: string): ProjectDetail | null {
	return projectDetails[slug] ?? null;
}

export function getNextSlug(slug: string): string | null {
	const idx = projectDetailSlugs.indexOf(slug);
	if (idx === -1) return null;
	return projectDetailSlugs[(idx + 1) % projectDetailSlugs.length] ?? null;
}

export type * from './types';
