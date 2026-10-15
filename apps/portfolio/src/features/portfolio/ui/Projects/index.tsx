'use client';

import { useState, useMemo } from 'react';
import { categoryFilters, workProjects } from '@/features/portfolio/contents';
import SectionHeader from '@/features/portfolio/ui/common/SectionHeader';
import Reveal from '@/features/portfolio/ui/common/Reveal';
import ProjectCard from './ProjectCard';
import styles from './Projects.module.scss';

type FilterId = (typeof categoryFilters)[number]['id'];

export default function Projects() {
	const [filter, setFilter] = useState<FilterId>('all');

	const filtered = useMemo(() => {
		// 회사 필터는 업무 프로젝트에만 건다 — 개인 프로젝트는 SideProjects 섹션이 따로 보여 준다
		if (filter === 'all') return workProjects;
		return workProjects.filter(p => p.category === filter);
	}, [filter]);

	return (
		<section className={styles.projects} id="projects">
			<div className={styles.inner}>
				<Reveal>
					<SectionHeader
						label="Work"
						title="업무 프로젝트"
						desc={'회사와 고객사 업무로 기획·설계부터 구현·운영까지 수행한 프로젝트입니다.\n회사별로 필터링해 살펴볼 수 있습니다.'}
					/>
				</Reveal>

				<Reveal delay={80} className={styles.filters}>
					{categoryFilters.map(f => (
						<button
							key={f.id}
							type="button"
							className={`${styles.filterBtn} ${filter === f.id ? styles.active : ''}`}
							onClick={() => setFilter(f.id as FilterId)}
						>
							{f.label}
						</button>
					))}
				</Reveal>

				<div className={styles.grid}>
					{filtered.map((project, idx) => (
						<Reveal key={project.slug} delay={idx * 60}>
							<ProjectCard project={project} />
						</Reveal>
					))}
					{filtered.length === 0 ? (
						<p className={styles.empty}>해당 카테고리의 프로젝트가 없습니다.</p>
					) : null}
				</div>
			</div>
		</section>
	);
}
