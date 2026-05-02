import Image from 'next/image';
import type { DetailHero as DetailHeroData } from '@/features/portfolio/contents';
import { MetaIconSvg } from '../icons';
import styles from './DetailHero.module.scss';

interface DetailHeroProps {
	hero: DetailHeroData;
}

export default function DetailHero({ hero }: DetailHeroProps) {
	return (
		<section className={styles.hero}>
			<div className={styles.inner}>
				<div className={styles.text}>
					<h1 className={styles.title}>
						{hero.titlePre ? <span className={styles.titlePre}>{hero.titlePre}</span> : null}
						<span className={styles.titleAccent}>{hero.titleAccent}</span>
						<br />
						<span className={styles.titlePost}>{hero.titlePost}</span>
					</h1>
					<p
						className={styles.summary}
						dangerouslySetInnerHTML={{ __html: hero.summaryHtml }}
					/>
					<dl className={styles.metaGrid}>
						{hero.meta.map(item => (
							<div key={item.label} className={styles.metaItem}>
								<span className={styles.metaIcon}>
									<MetaIconSvg name={item.icon} />
								</span>
								<div className={styles.metaText}>
									<dt className={styles.metaLabel}>{item.label}</dt>
									<dd className={styles.metaValue}>{item.value}</dd>
								</div>
							</div>
						))}
					</dl>
				</div>
				{hero.thumbnail ? (
					<div className={styles.visual}>
						<div className={styles.visualWrap}>
							<Image
								src={hero.thumbnail.src}
								alt={hero.thumbnail.alt}
								fill
								sizes="(max-width: 900px) 100vw, 50vw"
								priority
							/>
						</div>
					</div>
				) : null}
			</div>
		</section>
	);
}
