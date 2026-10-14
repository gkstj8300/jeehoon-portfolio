'use client';

import { forwardRef } from 'react';
import { hero, heroTiles } from '@/features/home/contents/kinetic';
import { useMotion } from '@/features/home/lib/motionContext';
import { useTiltHandlers } from '@/features/home/lib/usePointerEffects';
import { ga } from '@/shared/lib/logs/analytics';
import styles from './KineticHome.module.scss';

interface HeroProps {
	introRef: React.RefObject<HTMLDivElement>;
	stageRef: React.RefObject<HTMLDivElement>;
}

const Hero = forwardRef<HTMLElement, HeroProps>(function Hero(
	{ introRef, stageRef },
	ref
) {
	const { moving, finePointer } = useMotion();
	const tilt = useTiltHandlers(moving && finePointer);

	return (
		<section className={styles.hero} ref={ref} aria-labelledby="home-title">
			<p className={styles.overline}>
				<span className={styles.dot} aria-hidden="true" />
				{hero.overline}
			</p>

			<div className={styles.heroGrid}>
				<div className={styles.intro} ref={introRef}>
					<p className={styles.hello}>{hero.hello}</p>
					<h2 className={styles.title} id="home-title">
						{hero.titleLines.map((line, index) => (
							<span key={line}>
								{index === hero.accentLineIndex ? (
									<em className={styles.titleAccent}>{line}</em>
								) : (
									line
								)}
								{index < hero.titleLines.length - 1 ? <br /> : null}
							</span>
						))}
					</h2>
					<p className={styles.summary}>
						{hero.summaryLines.map((line, index) => (
							<span key={line}>
								{line}
								{index < hero.summaryLines.length - 1 ? <br /> : null}
							</span>
						))}
					</p>
				</div>

				{/* 기울기는 --mx/--my 변수만 쓰고, 스크롤 시차는 transform을 쓴다.
				    서로 다른 채널이라 같은 요소에 얹어도 덮어쓰지 않는다 */}
				<div
					className={styles.stage}
					ref={stageRef}
					aria-label="글과 실험 바로가기"
					{...tilt}
				>
					<div className={styles.orbit} aria-hidden="true" />
					{heroTiles.map(tile => (
						<a
							key={tile.id}
							className={styles.tile}
							href={tile.href}
							target="_blank"
							rel="noopener noreferrer"
							onClick={() => ga.events.appClick(tile.id)}
						>
							<small>
								{tile.eyebrow} <span aria-hidden="true">↗</span>
							</small>
							<strong
								className={tile.emphasized ? styles.tileEmphasized : undefined}
							>
								{tile.headline.map((line, index) => (
									<span key={line}>
										{line}
										{index < tile.headline.length - 1 ? <br /> : null}
									</span>
								))}
							</strong>
							<p>{tile.caption}</p>
						</a>
					))}
				</div>
			</div>

			<p className={styles.bottomline}>{hero.motto}</p>
		</section>
	);
});

export default Hero;
