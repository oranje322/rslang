import React, { useEffect, useState, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classes from './SavannahMain.module.scss';
import Header from '../../../components/Header/Header';
import Menu from '../../../components/Menu/Menu';
import Savannah from '../Savannah'
import { loadWordsForGame } from '../../../redux/thunk/gamesThunk';


const SavannahMain = () => {
    const [game, setGame] = useState(false);
    const changeState = useCallback(() => {
        setGame(!game)
    }, [game])

    const dispatch = useDispatch();
    const { words } = useSelector(state => state.games);

    useEffect(() => {
        dispatch(loadWordsForGame());
    }, []);

    return (
        <>
            <Header title={'Саванна'} />
            <Menu />
            <div className={classes.wrapper}>
                {!game ? <>
                    <NavLink to={'/games'}><h4 className={classes.back} onClick={changeState}>&#9664;</h4></NavLink>
                    <h2>Игра: Саванна</h2>
                    <p>Выберите перевод падающего слова</p>
                    <p>кликнув на перевод или клавишами 1-4 на клавиатуре</p>
                    <p>У Вас есть 5 жизней</p>
                    <p> Вы теряете жизнь, если делаете неправильный выбор</p>
                    <button className={classes.button} onClick={changeState}>Старт</button>
                </> :
                    <Savannah words={words} />
                }
            </div>
        </>
    );
};

export default SavannahMain;

