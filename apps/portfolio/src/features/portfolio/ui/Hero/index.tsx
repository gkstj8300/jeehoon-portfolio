'use client';

import { useEffect, useRef } from 'react';
import { profile } from '@/features/portfolio/contents';
import { calcTotalExperience } from '@/features/portfolio/lib/calcExperience';
import styles from './Hero.module.scss';

export default function Hero() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const prefersReducedMotion = window.matchMedia(
			'(prefers-reduced-motion: reduce)'
		).matches;
		if (prefersReducedMotion) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let width = (canvas.width = canvas.offsetWidth);
		let height = (canvas.height = canvas.offsetHeight);

		const dotCount = Math.floor((width * height) / 14000);
		const dots = Array.from({ length: dotCount }, () => ({
			x: Math.random() * width,
			y: Math.random() * height,
			vx: (Math.random() - 0.5) * 0.25,
			vy: (Math.random() - 0.5) * 0.25,
			r: Math.random() * 1.4 + 0.6,
		}));

		let rafId = 0;
		const draw = () => {
			ctx.clearRect(0, 0, width, height);

			for (const d of dots) {
				d.x += d.vx;
				d.y += d.vy;
				if (d.x < 0 || d.x > width) d.vx *= -1;
				if (d.y < 0 || d.y > height) d.vy *= -1;
				ctx.beginPath();
				ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
				ctx.fillStyle = 'rgba(250, 36, 84, 0.55)';
				ctx.fill();
			}

			for (let i = 0; i < dots.length; i++) {
				for (let j = i + 1; j < dots.length; j++) {
					const a = dots[i];
					const b = dots[j];
					if (!a || !b) continue;
					const dx = a.x - b.x;
					const dy = a.y - b.y;
					const dist = Math.hypot(dx, dy);
					if (dist < 120) {
						ctx.beginPath();
						ctx.moveTo(a.x, a.y);
						ctx.lineTo(b.x, b.y);
						ctx.strokeStyle = `rgba(250, 36, 84, ${0.18 - dist / 800})`;
						ctx.lineWidth = 0.6;
						ctx.stroke();
					}
				}
			}

			rafId = requestAnimationFrame(draw);
		};
		rafId = requestAnimationFrame(draw);

		const onResize = () => {
			width = canvas.width = canvas.offsetWidth;
			height = canvas.height = canvas.offsetHeight;
		};
		window.addEventListener('resize', onResize);

		return () => {
			cancelAnimationFrame(rafId);
			window.removeEventListener('resize', onResize);
		};
	}, []);

	const stats = profile.stats.map(stat =>
		stat.key === 'experience'
			? { ...stat, num: calcTotalExperience(profile.careerHistory) }
			: stat
	);

	return (
		<section className={styles.hero} id="hero">
			<canvas className={styles.dots} ref={canvasRef} aria-hidden="true" />
			<div className={styles.inner}>
				<span className={styles.badge}>{profile.badge}</span>
				<h1 className={styles.headline}>
					{profile.headline}
					<br />
					<span className={styles.headlineAccent}>{profile.headlineAccent}</span>
				</h1>
				<p className={styles.sub}>{profile.subline}</p>
				<div className={styles.actions}>
					<a href="#projects" className={`${styles.btn} ${styles.btnPrimary}`}>
						프로젝트 보기
					</a>
					<a href="#contact" className={`${styles.btn} ${styles.btnGhost}`}>
						연락하기
					</a>
				</div>

				<div className={styles.stats}>
					{stats.map((stat, idx) => (
						<div key={stat.key} className={styles.statRow}>
							{idx > 0 ? <div className={styles.statDivider} /> : null}
							<div className={styles.stat}>
								<span className={styles.statNum}>{stat.num}</span>
								<span className={styles.statLabel}>{stat.label}</span>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className={styles.scroll} aria-hidden="true">
				<div className={styles.scrollMouse}>
					<div className={styles.scrollWheel} />
				</div>
				<span>SCROLL</span>
			</div>
		</section>
	);
}
