import React, { useRef, useEffect, useState } from 'react';
import classes from './Word.module.scss';
import { getItemTopPercent } from '../../../utils/functions';

const Word = props => {
	let animationId;
	const wordRef = useRef();
	const [isAnimate, setIsAnimate] = useState(false);
	const initWordTopPosition = '5%';

	useEffect(() => {
		if (wordRef.current) {
			setIsAnimate(true);
		}
    return () => {
      setIsAnimate(false);
    }
	}, [wordRef]);

	useEffect(() => {
		if (props.isWordAnimated && isAnimate && props.wordFinishPosition) {
			animate();
		}
		return () => {
			window.cancelAnimationFrame(animationId);
		};
	}, [props.isWordAnimated, isAnimate, props.wordFinishPosition]);

	useEffect(() => {
		wordRef.current.style.top = initWordTopPosition;
	}, [props.word.word]);

	const animate = () => {
		const word = wordRef.current;
    if (!word) return;
		animationId = window.requestAnimationFrame(animate);
		const wordTopPercent = getItemTopPercent(word);

		if (wordTopPercent < props.wordFinishPosition) {
			word.style.top = wordTopPercent + 0.1 + '%';
		} else if (wordTopPercent < 100 ){
      word.style.top = wordTopPercent + 1.5 + '%';
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
