import type { ProjectDetail } from './types';
import { sems } from './sems';
import { jhSolution } from './jh-solution';
import { misumiRenewal } from './misumi-renewal';
import { misumiMaintenance } from './misumi-maintenance';
import { naedamHomepage } from './naedam-homepage';
import { hanwhaCore } from './hanwha-core';

const all: ProjectDetail[] = [
	sems,
	jhSolution,
	misumiRenewal,
	misumiMaintenance,
	naedamHomepage,
	hanwhaCore,
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
