import React from 'react';
import levelImg from '../../../assets/img/levelImg.png';
import classes from './cardOne.scss';


const CardOne = () => {
    return (
        <div className={classes.cardBox}>
            <h2>Готовые наборы</h2>
            <p>Выбирайте тему и уровень сложности</p>
            <div className={classes.box}>
                <img src={levelImg} alt='startImg'/>
                <div className={classes.buttonBox}>                    
                    <button>Начать</button>
                </div>
            </div>
                
        </div>
    )
}
export default CardOne;