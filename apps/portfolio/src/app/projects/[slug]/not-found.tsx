import Link from 'next/link';

export default function ProjectNotFound() {
	return (
		<main
			style={{
				minHeight: '70vh',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				gap: '1rem',
				padding: '4rem 1.5rem',
				textAlign: 'center',
				color: 'var(--pf-text-primary)',
			}}
		>
			<h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800 }}>
				프로젝트를 찾을 수 없습니다
			</h1>
			<p style={{ color: 'var(--pf-text-secondary)' }}>
				요청하신 프로젝트가 삭제되었거나 잘못된 주소입니다.
			</p>
			<Link
				href="/#projects"
				style={{
					marginTop: '0.5rem',
					padding: '0.75rem 1.5rem',
					borderRadius: '999px',
					background: 'var(--pf-accent)',
					color: '#fff',
					fontWeight: 600,
				}}
			>
				프로젝트 목록으로 돌아가기
			</Link>
		</main>
	);
}
