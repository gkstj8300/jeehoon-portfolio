import styles from './Introduce.module.scss';

export default function Introduce() {
	return (
		<section>
			<div className={styles.container}>
				<h3 className={styles.title}>
					소개
				</h3>
				<div className={styles.introduce}>
					<p>
						안녕하세요,<br/>프론트엔드 개발자 박지훈 입니다.<br/><br/>
						레거시 시스템의 기술 부채를 분석하고, 점진적 마이그레이션을 설계·실행하여 사용자 경험과 개발 생산성을 동시에 개선해온 프론트엔드 개발자입니다.<br/><br/>
						월 40만 UV 커머스 플랫폼의 React/Next.js 전환을 주도하며 Lighthouse 기반 성능 최적화(LCP 60% 단축)와 UI/UX 개선을 통해 GA4 기준 이탈률 15%p 감소를 달성했습니다.<br/>
						공통 컴포넌트 설계와 개발 환경 구축을 통해 팀 전체의 개발 리드타임을 30% 단축한 경험이 있습니다.
					</p>
				</div>
			</div>

			<div className={styles.footer}>
				<small className={styles.lastUpdate}>
					마지막 업데이트
				</small>
				<span className={styles.updateDate}>
					2026.03.23
				</span>
			</div>
		</section>
	);
}
