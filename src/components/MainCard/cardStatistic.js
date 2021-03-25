import React from 'react';
import levelImg from '../../assets/img/cardStatImg.png';
import classes from './cardMain.scss';


const CardStatistic = () => {

    let { cardBox, grey, buttonBox } = classes;
    return (
        <div className={`${grey} ${cardBox}`}>
            <h2>Статистика</h2>
            <p>визуализируй свой прогресс, радуйся успеху</p>
            <div className={classes.box}>
                <div className={buttonBox}>
                    <button>Подробнее</button>
                </div>
                <img src={levelImg} alt='startImg' />
            </div>
        </div>
    )
}
export default CardStatistic;