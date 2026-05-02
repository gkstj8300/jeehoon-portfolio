import type { StrategyIcon, MetaIcon } from '@/features/portfolio/contents';

const stroke = {
	fill: 'none',
	stroke: 'currentColor',
	strokeWidth: 2,
	strokeLinecap: 'round' as const,
	strokeLinejoin: 'round' as const,
};

export function StrategyIconSvg({ name, size = 22 }: { name: StrategyIcon; size?: number }) {
	const props = { width: size, height: size, viewBox: '0 0 24 24', ...stroke };
	switch (name) {
		case 'layers':
			return (
				<svg {...props}>
					<polygon points="12 2 2 7 12 12 22 7 12 2" />
					<polyline points="2 17 12 22 22 17" />
					<polyline points="2 12 12 17 22 12" />
				</svg>
			);
		case 'flow':
			return (
				<svg {...props}>
					<polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
				</svg>
			);
		case 'cube':
			return (
				<svg {...props}>
					<path d="M12 2L4 6v12l8 4 8-4V6l-8-4z" />
					<path d="M4 6l8 4 8-4M12 10v12" />
				</svg>
			);
		case 'sparkles':
			return (
				<svg {...props}>
					<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z" />
				</svg>
			);
		case 'shield':
			return (
				<svg {...props}>
					<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
				</svg>
			);
		case 'target':
			return (
				<svg {...props}>
					<circle cx="12" cy="12" r="10" />
					<circle cx="12" cy="12" r="6" />
					<circle cx="12" cy="12" r="2" />
				</svg>
			);
		case 'speed':
			return (
				<svg {...props}>
					<path d="M12 2v4M2 12h4M22 12h-4M5.6 5.6l2.8 2.8M18.4 5.6l-2.8 2.8" />
					<circle cx="12" cy="14" r="6" />
					<path d="M12 14l4-3" />
				</svg>
			);
		case 'chart':
			return (
				<svg {...props}>
					<path d="M3 3v18h18" />
					<path d="M7 14l4-4 4 4 5-7" />
				</svg>
			);
	}
}

export function MetaIconSvg({ name, size = 16 }: { name: MetaIcon; size?: number }) {
	const props = { width: size, height: size, viewBox: '0 0 24 24', ...stroke, strokeWidth: 2.4 };
	switch (name) {
		case 'platform':
			return (
				<svg {...props}>
					<rect x="2" y="3" width="20" height="14" rx="2" />
					<path d="M8 21h8M12 17v4" />
				</svg>
			);
		case 'timeline':
			return (
				<svg {...props}>
					<rect x="3" y="4" width="18" height="18" rx="2" />
					<line x1="16" y1="2" x2="16" y2="6" />
					<line x1="8" y1="2" x2="8" y2="6" />
					<line x1="3" y1="10" x2="21" y2="10" />
				</svg>
			);
		case 'role':
			return (
				<svg {...props}>
					<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
					<circle cx="12" cy="7" r="4" />
				</svg>
			);
		case 'goal':
			return (
				<svg {...props}>
					<circle cx="12" cy="12" r="10" />
					<circle cx="12" cy="12" r="6" />
					<circle cx="12" cy="12" r="2" />
				</svg>
			);
		case 'company':
			return (
				<svg {...props}>
					<path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" />
					<path d="M9 9v.01M9 12v.01M9 15v.01M9 18v.01" />
				</svg>
			);
		case 'stack':
			return (
				<svg {...props}>
					<polygon points="12 2 2 7 12 12 22 7 12 2" />
					<polyline points="2 17 12 22 22 17" />
					<polyline points="2 12 12 17 22 12" />
				</svg>
			);
	}
}
