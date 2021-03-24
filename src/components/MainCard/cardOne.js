import React from 'react';
import levelImg from '../../assets/img/levelImg.png';
import classes from './cardMain.scss';


const CardOne = () => {
    let { cardBox, violet, buttonBox } = classes;
    return (
        <div className={`${violet} ${cardBox}`}>
            <h2>Готовые наборы</h2>
            <p> выбирайте тему и уровень сложности</p>
            <div className={classes.box}>
                <img src={levelImg} alt='startImg' />
                <div className={buttonBox}>
                    <button>Начать</button>
                </div>
            </div>

        </div>
    )
}
export default CardOne;