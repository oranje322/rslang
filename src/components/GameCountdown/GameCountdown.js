import React from 'react';
import classes from './GameCountdown.module.scss';

const GameCountdown = () => {
    return (
        <div className={classes.countdown}>
            <p>3..2..1..</p>
        </div>
    );
};

export default GameCountdown;
