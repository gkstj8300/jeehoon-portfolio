'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import styles from './InteractiveParticles.module.scss';

interface Particle {
	x: number;
	y: number;
	vx: number;
	vy: number;
	radius: number;
}

const CONNECT_DISTANCE = 120;
const MOUSE_RADIUS = 150;

function createParticles(width: number, height: number, count: number): Particle[] {
	return Array.from({ length: count }, () => ({
		x: Math.random() * width,
		y: Math.random() * height,
		vx: (Math.random() - 0.5) * 1.5,
		vy: (Math.random() - 0.5) * 1.5,
		radius: Math.random() * 2 + 1,
	}));
}

export default function InteractiveParticles() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const particlesRef = useRef<Particle[]>([]);
	const mouseRef = useRef({ x: -9999, y: -9999 });
	const animationRef = useRef<number>(0);

	const [particleCount, setParticleCount] = useState(80);
	const [mouseMode, setMouseMode] = useState<'attract' | 'repel'>('repel');
	const [showLines, setShowLines] = useState(true);

	const getColors = useCallback(() => {
		const root = document.documentElement;
		const style = getComputedStyle(root);
		const fg = style.getPropertyValue('--foreground').trim() || '#fff';
		const sub = style.getPropertyValue('--sub-font-color').trim() || '#999';
		return { fg, sub };
	}, []);

	const initParticles = useCallback(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		particlesRef.current = createParticles(canvas.width, canvas.height, particleCount);
	}, [particleCount]);

	useEffect(() => {
		const canvas = canvasRef.current;
		const container = containerRef.current;
		if (!canvas || !container) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const resize = () => {
			const rect = container.getBoundingClientRect();
			canvas.width = rect.width;
			canvas.height = rect.height;
			initParticles();
		};

		resize();

		const handleMouseMove = (e: MouseEvent) => {
			const rect = canvas.getBoundingClientRect();
			mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
		};

		const handleMouseLeave = () => {
			mouseRef.current = { x: -9999, y: -9999 };
		};

		const animate = () => {
			const { width, height } = canvas;
			const { fg, sub } = getColors();
			ctx.clearRect(0, 0, width, height);

			const particles = particlesRef.current;
			const mouse = mouseRef.current;

			for (const p of particles) {
				const dx = mouse.x - p.x;
				const dy = mouse.y - p.y;
				const dist = Math.sqrt(dx * dx + dy * dy);

				if (dist < MOUSE_RADIUS && dist > 0) {
					const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
					const angle = Math.atan2(dy, dx);
					const strength = force * 2;

					if (mouseMode === 'repel') {
						p.vx -= Math.cos(angle) * strength;
						p.vy -= Math.sin(angle) * strength;
					} else {
						p.vx += Math.cos(angle) * strength * 0.5;
						p.vy += Math.sin(angle) * strength * 0.5;
					}
				}

				p.vx *= 0.97;
				p.vy *= 0.97;
				p.x += p.vx;
				p.y += p.vy;

				if (p.x < 0) { p.x = 0; p.vx *= -1; }
				if (p.x > width) { p.x = width; p.vx *= -1; }
				if (p.y < 0) { p.y = 0; p.vy *= -1; }
				if (p.y > height) { p.y = height; p.vy *= -1; }

				ctx.beginPath();
				ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
				ctx.fillStyle = fg;
				ctx.fill();
			}

			if (showLines) {
				for (let i = 0; i < particles.length; i++) {
					for (let j = i + 1; j < particles.length; j++) {
						const a = particles[i]!;
						const b = particles[j]!;
						const dx = a.x - b.x;
						const dy = a.y - b.y;
						const dist = Math.sqrt(dx * dx + dy * dy);

						if (dist < CONNECT_DISTANCE) {
							const opacity = (1 - dist / CONNECT_DISTANCE) * 0.4;
							ctx.beginPath();
							ctx.moveTo(a.x, a.y);
							ctx.lineTo(b.x, b.y);
							ctx.strokeStyle = sub;
							ctx.globalAlpha = opacity;
							ctx.lineWidth = 0.5;
							ctx.stroke();
							ctx.globalAlpha = 1;
						}
					}
				}
			}

			animationRef.current = requestAnimationFrame(animate);
		};

		animationRef.current = requestAnimationFrame(animate);
		canvas.addEventListener('mousemove', handleMouseMove);
		canvas.addEventListener('mouseleave', handleMouseLeave);
		window.addEventListener('resize', resize);

		const observer = new MutationObserver(() => {
			// theme change detected via data-theme attribute
		});
		observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

		return () => {
			cancelAnimationFrame(animationRef.current);
			canvas.removeEventListener('mousemove', handleMouseMove);
			canvas.removeEventListener('mouseleave', handleMouseLeave);
			window.removeEventListener('resize', resize);
			observer.disconnect();
		};
	}, [initParticles, getColors, mouseMode, showLines]);

	return (
		<div className={styles.container}>
			<div className={styles.controls}>
				<label className={styles.label}>
					파티클 수 ({particleCount})
					<input
						className={styles.range}
						type="range"
						min="20"
						max="200"
						step="10"
						value={particleCount}
						onChange={(e) => setParticleCount(Number(e.target.value))}
					/>
				</label>
				<div className={styles.toggleGroup}>
					<span className={styles.toggleLabel}>마우스 모드</span>
					<div className={styles.buttons}>
						<button
							type="button"
							className={`${styles.modeButton} ${mouseMode === 'repel' ? styles.active : ''}`}
							onClick={() => setMouseMode('repel')}
						>
							밀어내기
						</button>
						<button
							type="button"
							className={`${styles.modeButton} ${mouseMode === 'attract' ? styles.active : ''}`}
							onClick={() => setMouseMode('attract')}
						>
							끌어당기기
						</button>
					</div>
				</div>
				<label className={styles.checkLabel}>
					<input
						type="checkbox"
						checked={showLines}
						onChange={(e) => setShowLines(e.target.checked)}
					/>
					연결선 표시
				</label>
			</div>
			<div className={styles.canvasWrapper} ref={containerRef}>
				<canvas ref={canvasRef} className={styles.canvas} />
				<p className={styles.hint}>캔버스 위에서 마우스를 움직여보세요</p>
			</div>
		</div>
	);
}

InteractiveParticles.displayName = 'InteractiveParticles';
