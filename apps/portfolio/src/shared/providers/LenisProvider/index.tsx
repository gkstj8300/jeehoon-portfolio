'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

interface LenisProviderProps {
	children: React.ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
	useEffect(() => {
		if (typeof window === 'undefined') return;

		const prefersReducedMotion = window.matchMedia(
			'(prefers-reduced-motion: reduce)'
		).matches;

		if (prefersReducedMotion) return;

		const lenis = new Lenis({
			duration: 1.1,
			easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			smoothWheel: true,
		});

		let rafId = 0;
		function raf(time: number) {
			lenis.raf(time);
			rafId = window.requestAnimationFrame(raf);
		}
		rafId = window.requestAnimationFrame(raf);

		return () => {
			window.cancelAnimationFrame(rafId);
			lenis.destroy();
		};
	}, []);

	return <>{children}</>;
}
