import React from 'react';
import classes from './Preloader.module.scss';

const Preloader = () => {
    return (
        <div className={classes.preloader}>
            <div className={classes.preloader__row}>
                <div className={classes.preloader__item}></div>
                <div className={classes.preloader__item}></div>
            </div>
        </div>
    )
};

export default Preloader;