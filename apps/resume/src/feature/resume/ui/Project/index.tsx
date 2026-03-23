import { Ui } from '@jeehoon/ui';
import styles from './Project.module.scss';
import ProjectItem from './ProjectItem';
import hanwhaLogo from './assets/hanwhaLogo.png';
import jhLogo from '@/feature/resume/ui/Experience/assets/jhsolution_logo.svg';
import misumiLogo from './assets/misumiLogo.svg';
import naedamLogo from './assets/naedamLogo.jpg';
import samsungLogo from '@/feature/resume/ui/Experience/assets/samsungC&T_logo.svg';
import { project } from './project.data';

interface ProjectItemType {
	name: string;
	projectName: string;
	logoImg: string;
	durationStart: string;
	durationEnd: string;
	skillKeywords: string;
	development: string;
}

type ProjectKey = Exclude<keyof typeof project, 'title'>;


const logoByKey: Record<ProjectKey, string> = {
	sems: samsungLogo.src,
	jhHomepage: jhLogo.src,
	misumiRenewal: misumiLogo.src,
	misumiMaintenance: misumiLogo.src,
	naedam: naedamLogo.src,
	hanwha: hanwhaLogo.src,
};

export default function Project() {
	const projects: ProjectItemType[] = Object.keys(project)
		.filter((k): k is ProjectKey => k !== 'title')
		.map((key) => {
			const p = project[key];
			return {
				name: p.name,
				projectName: p.projectName,
				logoImg: logoByKey[key],
				durationStart: p.durationStart,
				durationEnd: p.durationEnd,
				skillKeywords: p.skillKeywords,
				development: p.development,
			};
		})
;

	return (
		<section>
			<Ui.Title title={project.title} />
			<div className={styles.projects}>
				{projects.map((item, index) => (
					<ProjectItem key={index} idx={index} {...item} />
				))}
			</div>
		</section>
	);
}
