import Link from 'next/link';
import type { CraftItem } from '../../types/craftItem';
import styles from './CraftCard.module.scss';

interface CraftCardProps {
	item: CraftItem;
}

export default function CraftCard({ item }: CraftCardProps) {
	const { slug, title, description, tags, thumbnailValue } = item;

	return (
		<Link className={styles.container} href={`/craft/${slug}`}>
			<div
				className={styles.thumbnail}
				style={{ background: thumbnailValue }}
			/>
			<div className={styles.content}>
				<h3 className={styles.title}>{title}</h3>
				<p className={styles.description}>{description}</p>
				<div className={styles.tags}>
					{tags.map((tag) => (
						<span key={tag} className={styles.tag}>
							{tag}
						</span>
					))}
				</div>
			</div>
		</Link>
	);
}

CraftCard.displayName = 'CraftCard';
