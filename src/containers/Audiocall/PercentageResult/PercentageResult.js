import React from 'react';
import styles from './PercentageResult.module.scss';


const PercentageResult = (props) => {
    const result = Math.floor(100/(props.correctAnswers + props.wrongAnswers)*props.correctAnswers);
    const wrongResult = Math.floor(100/(props.correctAnswers + props.wrongAnswers)*props.wrongAnswers);
	return (
        <div className={styles.percentageResultField}>
            <div className={styles.colorScaleField}>
                <div style={ {backgroundColor: 'white', width: '100%', height: `${wrongResult}%`}}>
                    <div className={styles.percentageScale}>
                        <h2>{result}%</h2>
                    </div>    
                </div>
            </div>
        </div>
	);
};

export default PercentageResult;