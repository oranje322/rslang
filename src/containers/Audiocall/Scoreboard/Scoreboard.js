import React, { useEffect, useState } from 'react';
import styles from './Scoreboard.module.scss';
import { NavLink } from 'react-router-dom';
import PercentageResult from '../percentageResult/percentageResult';


const Scoreboard = (props) => {
    // const [isStatWordVisible, setIsStatWordVisibl] = useState(true)
                        // const timeOut = window.setTimeout(()=>{
                        //     setIsStatWordVisibl(false)
                        //     window.clearTimeout(timeOut)
                        // },2000) 
                        // <button onClick={()=>setIsStatWordVisibl(true)}>Посмотреть ответы</button>                           
    const [count, setCount] = useState({
        rightAnsw: 0,
        wrongAnsw: 0
    });    

    let first = 0;
    let second = 0;

    useEffect(() => {
        setCount({
            rightAnsw: first,
            wrongAnsw: second
        });
    }, []);

	return (
        <div className={styles.scoreboardField}>
            {count.wrongAnsw<=2
            ?<h3>Отличный результат</h3>
            :count.wrongAnsw>2 && count.wrongAnsw<=4
            ?<h3>Хороший результат</h3>
            :<h3>Нужно еще подучить</h3>}
            <p>{count.rightAnsw} слов изучено </p>
            <p>{count.wrongAnsw} - не изучено</p>
            <div className={styles.scoreboardResults}> 
                <div className={styles.scoreboardDiagram}>
                    <PercentageResult count={count}/>
                </div>
                <div className={styles.scoreboardAnswers}>                
                    <ul>
                        {props.results.map((result,index)=>{ 
                            Object.values(result).join(' ') === 'right'
                            ? first += 1
                            : second += 1
                            return ( <li key={index} >  
                            {Object.keys(result).join(' ')} - {Object.values(result).join(' ')}
                            </li>  
                        )})}                    
                    </ul>
                </div>                
            </div>
            <NavLink to={'/games'}><h5>Назад к списку игр</h5></NavLink>
        </div>
    )
};

export default Scoreboard;