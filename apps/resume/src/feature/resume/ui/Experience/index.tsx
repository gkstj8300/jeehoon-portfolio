import { Ui } from '@jeehoon/ui';
import Image from 'next/image';
import { useMemo } from 'react';
import styles from './Experience.module.scss';
import naedamLogoImg from './assets/neadam_logo.png';
import jhLogoImg from './assets/jhsolution_logo.svg';

interface CompanyProps {
	name: string;
	logoSrc: string;
	durationStart: string;
	durationEnd: string;
	position: string;
	experienceItems: string[];
}

function useCalculateDuration(durationStart: string, durationEnd: string) {
	return useMemo(() => {
		const startDate = new Date(durationStart);
		const endDate = durationEnd === '재직중' ? new Date() : new Date(durationEnd);

		let years = endDate.getFullYear() - startDate.getFullYear();
		let months = endDate.getMonth() - startDate.getMonth();

		if (months < 0) {
			years--;
			months += 12;
		}

		const yearText = years > 0 ? `${years}년` : '';
		const monthText = months > 0 ? `${months}개월` : '';
		return `${yearText} ${monthText}`.trim();
	}, [durationStart, durationEnd]);
}

function CompanySection({ name, logoSrc, durationStart, durationEnd, position, experienceItems }: CompanyProps) {
	const duration = useCalculateDuration(durationStart, durationEnd);

	return (
		<div className={styles.experience}>
			<div className={styles.details}>
				<Image
					className={styles.companyImg}
					src={logoSrc}
					alt="companyImg"
					width={128}
					height={128}
					priority
				/>
				<div className={styles.companyWrap}>
					<h4 className={styles.companyName}>
						{name}
					</h4>
					<div className={styles.duration}>
						<div className={styles.durationDate}>
							{durationStart}<span>~</span>{durationEnd}
						</div>
						<span className={styles.calculateDuration}>
							{duration}
						</span>
					</div>
					<div className={styles.position}>
						{position}
					</div>
				</div>
			</div>
			<div className={styles.divider}></div>
			<ul className={styles.description}>
				{experienceItems.map((item, idx) => (
					<li key={idx}>{item}</li>
				))}
			</ul>
		</div>
	);
}

export default function Experience() {
	return (
		<section>
			<Ui.Title title='경력' />
			<CompanySection
				name="제이에이치솔루션"
				logoSrc={jhLogoImg.src}
				durationStart="2026-01"
				durationEnd="재직중"
				position="정규직 | 프론트엔드 서비스 개발 | 대리"
				experienceItems={[
					'삼성물산 건물 관제 시스템(SEMS) 프론트엔드 설계 및 개발 (FE 1명 / 전체 6명)',
					'JH Solution 기업 홈페이지 리뉴얼 (FE 1명 / 전체 3명)',
				]}
			/>
			<CompanySection
				name="내담씨앤씨"
				logoSrc={naedamLogoImg.src}
				durationStart="2022-03"
				durationEnd="2025-03"
				position="정규직 | 프론트엔드 서비스 개발 | 대리"
				experienceItems={[
					'한국미스미 커머스 플랫폼 React/Next.js 마이그레이션 (FE 3명 / 전체 6명)',
					'한국미스미 커머스 플랫폼 데이터 기반 UI/UX 개선 및 운영 (FE 1명 / 전체 2명)',
					'사내 홈페이지 리뉴얼 기획 및 개발 (3명)',
					'한화생명 코어 시스템 구축 프로젝트 (2명)',
				]}
			/>
		</section>
	);
}
