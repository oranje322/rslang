import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const GamePlay = () => {

    const words = useSelector(state => state.words);
    let someWords = words ? words.activeWords.slice(0, 5) : null;

    useEffect(() => {
        console.log('words: ', words);
    }, []);

    return (
        <div>
            {someWords.map(word => (
                <div key={word._id}>
                    <h3>{word.word}</h3>
                </div>
            ))}
        </div>

    );
};

export default GamePlay;
