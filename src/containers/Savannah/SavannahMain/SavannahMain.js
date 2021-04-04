import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classes from './SavannahMain.module.scss';
import Header from '../../../components/Header/Header';
import Menu from '../../../components/Menu/Menu';
import Savannah from '../Savannah'


const SavannahMain = () => {
    const [game, setGame] = useState(true);
    return (
        <>
            <Header title={'Саванна'} />
            <Menu />
            <div className={classes.wrapper}>
                {game ? <>
                    <NavLink to={'/games'}><h4 className={classes.back} onClick={() => setGame(!game)}>&#9664;</h4></NavLink>
                    <h2>Игра: Саванна</h2>
                    <p>Выберите перевод падающего слова</p>
                    <p>У Вас есть 5 жизней</p>
                    <p> Вы теряете жизнь, если делаете неправильный выбор</p>
                    <button className={classes.button} onClick={() => setGame(!game)}>Старт</button>
                </> :
                    <Savannah />
                }
            </div>
        </>
    );
};

export default SavannahMain;

