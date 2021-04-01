import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './GamePlay.module.scss';
// import Recognition from './Recognition'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

const GamePlay = ({ comingWords }) => {

    let words = ['cat', 'beautiful', 'advertise', 'game', 'digital']
    let someWord = words[Math.floor(Math.random() * words.length)];

    const [newWord, setNewWord] = useState(someWord);

    const { finalTranscript, resetTranscript, listening } = useSpeechRecognition();

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return <h2>Распознавание речи не поддерживается в Вашем бразуере :(</h2>
    }

    const startRecognition = () => {
        SpeechRecognition.startListening();
    }

    return (
        <div className={classes.cardContainer}>
            {
                <>
                    <h3>{newWord}</h3>
                </>
            }
            <div className={classes.recognitionBlock}>
                {!finalTranscript && <button onClick={startRecognition}>Начать</button>}
                {finalTranscript ?
                    <>
                        <p>{finalTranscript}</p>
                        {finalTranscript === newWord ?
                            <>
                                <p>Правильно!</p>
                                <button onClick={() => {
                                    resetTranscript();
                                    setNewWord(someWord);
                                }}>Новое слово</button>
                            </>
                            :
                            <>
                                <p>Что-то не так:(</p>
                                <button onClick={() => {
                                    resetTranscript();
                                    startRecognition();
                                }}>Еще раз</button>
                            </>
                        }
                    </> : listening ? <p>Cлушаю</p> : null}

            </div>
        </div>
    )
};

export default GamePlay;
