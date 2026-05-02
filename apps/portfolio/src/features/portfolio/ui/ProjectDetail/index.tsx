import type { Project, ProjectDetail as ProjectDetailData } from '@/features/portfolio/contents';
import ProjectBar from './ProjectBar';
import DetailHero from './DetailHero';
import Strategy from './Strategy';
import Showcase from './Showcase';
import System from './System';
import Comparison from './Comparison';
import NextProject from './NextProject';
import styles from './ProjectDetail.module.scss';

interface ProjectDetailProps {
	card: Project;
	detail: ProjectDetailData;
	nextCard: Project;
}

export default function ProjectDetail({ card, detail, nextCard }: ProjectDetailProps) {
	return (
		<main className={styles.main}>
			<ProjectBar title={card.title} tags={card.tags} />

			<DetailHero hero={detail.hero} />

			{detail.strategy ? (
				<Strategy
					label={detail.strategy.label}
					title={detail.strategy.title}
					lead={detail.strategy.lead}
					cards={detail.strategy.cards}
				/>
			) : null}

			{detail.showcase ? <Showcase data={detail.showcase} /> : null}

			{detail.comparison ? <Comparison data={detail.comparison} /> : null}

			{detail.system ? <System data={detail.system} /> : null}

			<NextProject project={nextCard} />
		</main>
	);
}
