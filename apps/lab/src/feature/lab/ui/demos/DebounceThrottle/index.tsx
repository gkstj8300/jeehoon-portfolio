'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import styles from './DebounceThrottle.module.scss';

interface EventLog {
	id: number;
	timestamp: number;
}

export default function DebounceThrottle() {
	const [delay, setDelay] = useState(300);
	const [rawEvents, setRawEvents] = useState<EventLog[]>([]);
	const [debounceEvents, setDebounceEvents] = useState<EventLog[]>([]);
	const [throttleEvents, setThrottleEvents] = useState<EventLog[]>([]);
	const [isActive, setIsActive] = useState(true);

	const idCounter = useRef(0);
	const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
	const throttleReady = useRef(true);

	const rawRef = useRef<HTMLDivElement>(null);
	const debounceRef = useRef<HTMLDivElement>(null);
	const throttleRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = useCallback((ref: React.RefObject<HTMLDivElement | null>) => {
		if (ref.current) {
			ref.current.scrollTop = ref.current.scrollHeight;
		}
	}, []);

	useEffect(() => {
		scrollToBottom(rawRef);
	}, [rawEvents, scrollToBottom]);

	useEffect(() => {
		scrollToBottom(debounceRef);
	}, [debounceEvents, scrollToBottom]);

	useEffect(() => {
		scrollToBottom(throttleRef);
	}, [throttleEvents, scrollToBottom]);

	const handleMouseMove = useCallback(() => {
		if (!isActive) return;

		const now = Date.now();
		const id = ++idCounter.current;

		setRawEvents((prev) => [...prev, { id, timestamp: now }]);

		if (debounceTimer.current) {
			clearTimeout(debounceTimer.current);
		}
		debounceTimer.current = setTimeout(() => {
			setDebounceEvents((prev) => [
				...prev,
				{ id: ++idCounter.current, timestamp: Date.now() },
			]);
		}, delay);

		if (throttleReady.current) {
			throttleReady.current = false;
			setThrottleEvents((prev) => [
				...prev,
				{ id: ++idCounter.current, timestamp: Date.now() },
			]);
			setTimeout(() => {
				throttleReady.current = true;
			}, delay);
		}
	}, [isActive, delay]);

	const handleReset = () => {
		setRawEvents([]);
		setDebounceEvents([]);
		setThrottleEvents([]);
		idCounter.current = 0;
		if (debounceTimer.current) {
			clearTimeout(debounceTimer.current);
		}
		throttleReady.current = true;
	};

	return (
		<div className={styles.container}>
			<div className={styles.controls}>
				<label className={styles.label}>
					딜레이 ({delay}ms)
					<input
						className={styles.range}
						type="range"
						min="100"
						max="1000"
						step="50"
						value={delay}
						onChange={(e) => setDelay(Number(e.target.value))}
					/>
				</label>
				<div className={styles.buttons}>
					<button
						className={styles.button}
						type="button"
						onClick={() => setIsActive((prev) => !prev)}
					>
						{isActive ? '중지' : '시작'}
					</button>
					<button
						className={`${styles.button} ${styles.resetButton}`}
						type="button"
						onClick={handleReset}
					>
						초기화
					</button>
				</div>
			</div>

			<div
				className={styles.trackArea}
				onMouseMove={handleMouseMove}
			>
				<p className={styles.trackText}>
					이 영역 위에서 마우스를 움직여보세요
				</p>
			</div>

			<div className={styles.columns}>
				<div className={styles.column}>
					<div className={styles.columnHeader}>
						<h3 className={styles.columnTitle}>Raw</h3>
						<span className={styles.count}>{rawEvents.length}</span>
					</div>
					<div className={styles.bars} ref={rawRef}>
						{rawEvents.map((event) => (
							<div
								key={event.id}
								className={styles.bar}
								style={{ backgroundColor: '#3b82f6' }}
							/>
						))}
					</div>
				</div>
				<div className={styles.column}>
					<div className={styles.columnHeader}>
						<h3 className={styles.columnTitle}>Debounce</h3>
						<span className={styles.count}>{debounceEvents.length}</span>
					</div>
					<div className={styles.bars} ref={debounceRef}>
						{debounceEvents.map((event) => (
							<div
								key={event.id}
								className={styles.bar}
								style={{ backgroundColor: '#10b981' }}
							/>
						))}
					</div>
				</div>
				<div className={styles.column}>
					<div className={styles.columnHeader}>
						<h3 className={styles.columnTitle}>Throttle</h3>
						<span className={styles.count}>{throttleEvents.length}</span>
					</div>
					<div className={styles.bars} ref={throttleRef}>
						{throttleEvents.map((event) => (
							<div
								key={event.id}
								className={styles.bar}
								style={{ backgroundColor: '#f59e0b' }}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

DebounceThrottle.displayName = 'DebounceThrottle';
