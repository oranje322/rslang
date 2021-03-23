import React from 'react';
import levelImg from '../../assets/img/cardStatImg.png';
import classes from './cardStatistic.scss';


const CardStatistic = () => {
    return (
        <div className={classes.cardBox}>
            <h2>Статистика</h2>
            <p>визуализируй свой прогресс радуйся успеху</p>
            <div className={classes.box}>                
                <div className={classes.buttonBox}>                    
                    <button>Подробнее</button>
                </div>
                <img src={levelImg} alt='startImg'/>
            </div>
        </div>
    )
}
export default CardStatistic;