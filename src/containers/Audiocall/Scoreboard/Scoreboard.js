import React from 'react';
import styles from './Scoreboard.module.scss';
import { NavLink } from 'react-router-dom';

const Scoreboard = (props) => {
	return (
        <div className={styles.scoreboardField}>
            <h3>Какой-то результат</h3>
            <div>
                <ul>
                    <li>слов изучено</li>
                    <li>слов не изучено</li>
                </ul>
            </div>
            <NavLink to={'/games'}><h5>Назад к списку игр</h5></NavLink>
        </div>
    )
};

export default Scoreboard;