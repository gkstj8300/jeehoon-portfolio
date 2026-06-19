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
						비즈니스 문제를 아키텍처로 해결하고, 데이터로 성과를 증명하는 4년 차 프론트엔드 개발자입니다.<br/><br/>
						10년 된 대형 커머스를 무중단 Next.js로 마이그레이션하여 LCP 60% 단축과 GA4 기준 이탈률 15%p 감소를 달성했습니다.<br/>
						대형 관제 플랫폼에서는 웹소켓-REST 하이브리드 동기화 구조와 Django 기반 BFF를 직접 설계·구현하여 클라이언트 복잡도를 최적화했습니다.<br/>
						Claude Code CLI를 페어 프로그래머로, Figma MCP를 UI 프로토타이핑에 활용하면서도, 크롬 힙 스냅샷 분석으로 AI 생성 코드의 가비지 컬렉션 누수를 직접 추적·제어하여 런타임 안정성을 확보하였습니다.
					</p>
				</div>
			</div>

			<div className={styles.footer}>
				<small className={styles.lastUpdate}>
					마지막 업데이트
				</small>
				<span className={styles.updateDate}>
					2026.06.19
				</span>
			</div>
		</section>
	);
}
