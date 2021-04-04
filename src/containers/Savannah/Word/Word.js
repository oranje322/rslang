import React, { useRef, useEffect, useState } from 'react';
import classes from './Word.module.scss';
import { getItemTopPercent } from '../functions';

const Word = props => {
	let reqId;
	const wordRef = useRef();
	const [isAnimate, setIsAnimate] = useState(false);
	const initWordTopPosition = '5%';

	useEffect(() => {
		if (wordRef.current) {
			setIsAnimate(true);
		}
	}, [wordRef]);

	useEffect(() => {
		if (props.isWordAnimated && isAnimate) {
			animate();
		}
		return () => {
			window.cancelAnimationFrame(reqId);
		};
	}, [props.isWordAnimated, isAnimate]);

	useEffect(() => {
		wordRef.current.style.top = initWordTopPosition;
	}, [props.word.word]);

	const animate = () => {
		const word = wordRef.current;
    if (!word) return;
		reqId = window.requestAnimationFrame(animate);
		const wordTopPercent = getItemTopPercent(word);

		if (wordTopPercent < parseInt(props.wordFinishPosition)) {
			word.style.top = wordTopPercent + 0.1 + '%';
		} else {
			props.onFinishHandler();
		}
	};

	return (
		<div ref={wordRef} className={classes.word}>
			{props.word.word}
		</div>
	);
};

export default Word;
