'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Reveal.module.scss';

interface RevealProps {
	children: React.ReactNode;
	delay?: number;
	className?: string;
}

export default function Reveal({ children, delay = 0, className }: RevealProps) {
	const ref = useRef<HTMLDivElement>(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const node = ref.current;
		if (!node) return;

		const prefersReducedMotion =
			typeof window !== 'undefined' &&
			window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (prefersReducedMotion) {
			setVisible(true);
			return;
		}

		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						setVisible(true);
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
		);

		observer.observe(node);
		return () => observer.disconnect();
	}, []);

	return (
		<div
			ref={ref}
			className={`${styles.reveal} ${visible ? styles.visible : ''} ${className ?? ''}`.trim()}
			style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
		>
			{children}
		</div>
	);
}
