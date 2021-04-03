import React, { useEffect, useState } from 'react';
import classes from './GamePlay.module.scss';
const FinishGame = ({ statistics, newLevelWords }) => {
    return (
        <div className={classes.gameContainer}>
            <p> Вы освоили {statistics} cлов!</p>
            <p>Ура!</p>
            <button className={classes.button} onClick={newLevelWords}>Играть еще раз</button>
        </div>
    )
}
export default FinishGame;