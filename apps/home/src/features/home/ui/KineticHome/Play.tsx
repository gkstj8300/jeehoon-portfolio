'use client';

import { play } from '@/features/home/contents/kinetic';
import { useMotion } from '@/features/home/lib/motionContext';
import { useWaveHandlers } from '@/features/home/lib/usePointerEffects';
import styles from './KineticHome.module.scss';

export default function Play() {
	const { moving } = useMotion();
	// 웨이브는 터치에서도 뜻이 통하므로 finePointer를 따지지 않는다
	const wave = useWaveHandlers(moving);

	return (
		<section className={styles.play} aria-labelledby="home-play-title">
			<div>
				<p className={styles.label}>{play.label}</p>
				<h2 id="home-play-title">
					{play.titleLines.map((line, index) => (
						<span key={line}>
							{line}
							{index < play.titleLines.length - 1 ? <br /> : null}
						</span>
					))}
				</h2>
				<p>
					{play.descriptionLines.map((line, index) => (
						<span key={line}>
							{line}
							{index < play.descriptionLines.length - 1 ? <br /> : null}
						</span>
					))}
				</p>
				<a
					className={styles.playLink}
					href={play.href}
					target="_blank"
					rel="noopener noreferrer"
				>
					{play.linkLabel} ↗
				</a>
			</div>

			<div className={styles.wave} aria-label={play.waveLabel} {...wave}>
				{play.waveLetters.map((letter, index) => (
					<span key={`${letter}-${index}`} data-letter aria-hidden="true">
						{letter}
					</span>
				))}
			</div>
		</section>
	);
}
