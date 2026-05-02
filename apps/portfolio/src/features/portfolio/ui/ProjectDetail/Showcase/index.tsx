'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { ShowcaseBlock } from '@/features/portfolio/contents';
import Reveal from '@/features/portfolio/ui/common/Reveal';
import styles from './Showcase.module.scss';

interface ShowcaseProps {
	data: ShowcaseBlock;
}

export default function Showcase({ data }: ShowcaseProps) {
	const [activeId, setActiveId] = useState(data.items[0]?.id ?? '');
	const active = data.items.find(item => item.id === activeId) ?? data.items[0];

	return (
		<section className={`${styles.section} ${styles.alt}`}>
			<div className={styles.inner}>
				<Reveal className={styles.header}>
					<span className={styles.label}>{data.label}</span>
					<h2 className={styles.title}>{data.title}</h2>
					<p className={styles.lead}>{data.lead}</p>
				</Reveal>

				{data.layout === 'tabs' ? (
					<Reveal>
						<div className={styles.tabsWrap}>
							<div className={styles.tabs} role="tablist">
								{data.items.map(item => (
									<button
										key={item.id}
										type="button"
										role="tab"
										aria-selected={item.id === activeId}
										className={`${styles.tabBtn} ${item.id === activeId ? styles.tabActive : ''}`}
										onClick={() => setActiveId(item.id)}
									>
										{item.label}
									</button>
								))}
							</div>
							<p className={styles.tabsHint}>탭을 눌러 화면을 전환해보세요</p>
						</div>

						{active ? (
							<div className={styles.imageWrap}>
								<Image
									key={active.id}
									src={active.image.src}
									alt={active.image.alt}
									fill
									sizes="(max-width: 1100px) 100vw, 1100px"
									className={styles.image}
								/>
							</div>
						) : null}
					</Reveal>
				) : (
					<div className={styles.grid}>
						{data.items.map((item, idx) => (
							<Reveal key={item.id} delay={idx * 60} className={styles.gridCell}>
								<div className={styles.gridImageWrap}>
									<Image
										src={item.image.src}
										alt={item.image.alt}
										fill
										sizes="(max-width: 768px) 100vw, 50vw"
										className={styles.image}
									/>
								</div>
								<span className={styles.gridLabel}>{item.label}</span>
							</Reveal>
						))}
					</div>
				)}
			</div>
		</section>
	);
}
