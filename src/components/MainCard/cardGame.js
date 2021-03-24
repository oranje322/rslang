import React from 'react';
import classes from './cardGame.scss';

const CardGame = () => {
    function clickGame() {
        
    }
    return (        
        <div className={classes.cardBox}>
            <h2>Мини игры</h2>
            <p>геймификация для активного запоминания</p>
            <div className={classes.buttonBox}>
                <button onClick={clickGame}>Посмотреть</button>
            </div>            
        </div>
    )
}
export default CardGame;