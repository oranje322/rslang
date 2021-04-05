import React from 'react';
import styles from './PercentageResult.module.scss';


const PercentageResult = (props) => {
    const result = Math.floor(100/(props.count.rightAnsw + props.count.wrongAnsw)*props.count.rightAnsw);
    const wrongResult = Math.floor(100/(props.count.rightAnsw + props.count.wrongAnsw)*props.count.wrongAnsw);
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