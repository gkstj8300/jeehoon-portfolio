import Hero from '@/features/portfolio/ui/Hero';
import About from '@/features/portfolio/ui/About';
import Tools from '@/features/portfolio/ui/Tools';
import Projects from '@/features/portfolio/ui/Projects';
import Contact from '@/features/portfolio/ui/Contact';
import styles from './PortfolioPage.module.scss';

export default function PortfolioPage() {
	return (
		<main className={styles.main}>
			<Hero />
			<About />
			<Tools />
			<Projects />
			<Contact />
		</main>
	);
}
