'use client';

import { personalProjects } from '@/features/portfolio/contents';
import SectionHeader from '@/features/portfolio/ui/common/SectionHeader';
import Reveal from '@/features/portfolio/ui/common/Reveal';
import ProjectCard from '@/features/portfolio/ui/Projects/ProjectCard';
import styles from './SideProjects.module.scss';

/**
 * 회사 밖에서 혼자 진행한 프로젝트. 업무 프로젝트 목록과 **섞지 않고** 별도 섹션으로 둔다.
 *
 * 업무는 팀 안의 역할과 비즈니스 성과로 읽히고, 개인 프로젝트는 0→1 전 과정의 소유와 기술적
 * 선택으로 읽힌다. 같은 격자·같은 회사 필터에 넣으면 그 축이 흐려진다.
 */
export default function SideProjects() {
	if (personalProjects.length === 0) return null;

	return (
		<section className={styles.section} id="side-projects">
			<div className={styles.inner}>
				<Reveal>
					<SectionHeader
						label="Side Project"
						title="개인 프로젝트"
						desc={'회사 밖에서 혼자 기획·설계·개발하고 있는 프로젝트입니다.\nAI 코딩 에이전트를 개발 파트너로 쓰되, 규칙과 테스트로 결과를 검증합니다.'}
					/>
				</Reveal>

				<div className={styles.list}>
					{personalProjects.map((project, idx) => (
						<Reveal key={project.slug} delay={idx * 60}>
							<ProjectCard project={project} layout="wide" />
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}
SideProjects.displayName = 'SideProjects';
