'use client';

import { finale } from '@/features/home/contents/kinetic';
import { useMotion } from '@/features/home/lib/motionContext';
import { useMagneticHandlers } from '@/features/home/lib/usePointerEffects';
import styles from './KineticHome.module.scss';

interface FinaleProps {
	signatureRef: React.RefObject<HTMLParagraphElement>;
}

export default function Finale({ signatureRef }: FinaleProps) {
	const { moving, finePointer } = useMotion();
	const magnetic = useMagneticHandlers(moving && finePointer);

	return (
		<section className={styles.finale} aria-labelledby="home-finale-title">
			<div className={styles.finaleTop}>
				<div>
					<p className={styles.label}>{finale.label}</p>
					<h2 id="home-finale-title">
						{finale.titleLines.map((line, index) => (
							<span key={line}>
								{line}
								{index < finale.titleLines.length - 1 ? <br /> : null}
							</span>
						))}
					</h2>
				</div>
				<a
					className={styles.contact}
					href={`mailto:${finale.email}`}
					{...magnetic}
				>
					<span aria-hidden="true">↗</span>
					{finale.contactLabel}
				</a>
			</div>

			{/* 시안의 하단 메뉴(저작권·GitHub·맨 위로)는 싣지 않는다 —
			    공통 Footer가 저작권과 GitHub를, 공통 BackToTop이 «맨 위로»를 이미 맡고 있어
			    그대로 옮기면 한 화면에 저작권이 두 줄(연도까지 다르게) 생긴다 */}
			<p className={styles.signature} ref={signatureRef} aria-hidden="true">
				{finale.signature}
				<span>.</span>
			</p>
		</section>
	);
}
