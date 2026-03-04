'use client';

import { useState } from 'react';
import styles from './WavyText.module.scss';

export default function WavyText() {
	const [text, setText] = useState('Hello, World!');
	const [speed, setSpeed] = useState(1);
	const [height, setHeight] = useState(20);

	return (
		<div className={styles.container}>
			<div className={styles.controls}>
				<label className={styles.label}>
					텍스트
					<input
						className={styles.input}
						type="text"
						value={text}
						onChange={(e) => setText(e.target.value)}
						placeholder="텍스트를 입력하세요"
					/>
				</label>
				<label className={styles.label}>
					속도 ({speed.toFixed(1)}s)
					<input
						className={styles.range}
						type="range"
						min="0.3"
						max="3"
						step="0.1"
						value={speed}
						onChange={(e) => setSpeed(Number(e.target.value))}
					/>
				</label>
				<label className={styles.label}>
					높이 ({height}px)
					<input
						className={styles.range}
						type="range"
						min="5"
						max="50"
						step="1"
						value={height}
						onChange={(e) => setHeight(Number(e.target.value))}
					/>
				</label>
			</div>
			<div
				className={styles.preview}
				style={
					{
						'--wave-speed': `${speed}s`,
						'--wave-height': `${height}px`,
					} as React.CSSProperties
				}
			>
				{text.split('').map((char, i) => (
					<span
						key={`${i}-${char}`}
						className={styles.char}
						style={{ animationDelay: `${i * 0.05}s` }}
					>
						{char === ' ' ? '\u00A0' : char}
					</span>
				))}
			</div>
		</div>
	);
}

WavyText.displayName = 'WavyText';
