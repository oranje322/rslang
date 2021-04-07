import React from 'react';
import classes from './AnswerItem.module.scss';

const AnswerItem = (props) => {
    const cls = [classes.liItem]
    if (props.answerCheck) {
        cls.push(classes[props.answerCheck])
    }
	return (
        <li 
            className={cls.join(' ')}
            onClick={()=>props.onAnswerClick(props.item.word)}
        >
            {props.item.wordTranslate}
        </li>
	);
};

export default AnswerItem;