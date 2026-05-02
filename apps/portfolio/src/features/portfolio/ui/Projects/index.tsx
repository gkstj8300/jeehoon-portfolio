'use client';

import { useState, useMemo } from 'react';
import { categoryFilters, projects, type Project } from '@/features/portfolio/contents';
import SectionHeader from '@/features/portfolio/ui/common/SectionHeader';
import Reveal from '@/features/portfolio/ui/common/Reveal';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import styles from './Projects.module.scss';

type FilterId = (typeof categoryFilters)[number]['id'];

export default function Projects() {
	const [filter, setFilter] = useState<FilterId>('all');
	const [activeProject, setActiveProject] = useState<Project | null>(null);

	const filtered = useMemo(() => {
		if (filter === 'all') return projects;
		return projects.filter(p => p.category === filter);
	}, [filter]);

	return (
		<section className={styles.projects} id="projects">
			<div className={styles.inner}>
				<Reveal>
					<SectionHeader
						label="Projects"
						title="프로젝트"
						desc={'기획·구조 설계부터 구현·운영까지 직접 수행한 프로젝트들입니다.\n회사별로 필터링해 살펴볼 수 있습니다.'}
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
							<ProjectCard
								project={project}
								onClick={() => setActiveProject(project)}
							/>
						</Reveal>
					))}
					{filtered.length === 0 ? (
						<p className={styles.empty}>해당 카테고리의 프로젝트가 없습니다.</p>
					) : null}
				</div>
			</div>

			<ProjectModal
				project={activeProject}
				onClose={() => setActiveProject(null)}
			/>
		</section>
	);
}
