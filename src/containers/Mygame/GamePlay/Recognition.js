import React from 'react'
import classes from './GamePlay.module.scss';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

const Recognition = ({ someWord, chooseWord }) => {
    const { transcript, resetTranscript, listening } = useSpeechRecognition();

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return <h2>Распознавание речи не поддерживается в Вашем бразуере :(</h2>
    }

    const startRecognition = () => {
        SpeechRecognition.startListening();
    }

    useEffect(() => {
        chooseWord();
    }, [transcript])

    return (
        <div className={classes.recognitionBlock}>
            <button onClick={startRecognition}>Начать</button>
            {transcript ?
                <>
                    <p>{transcript}</p>
                    {transcript === someWord ? <p>Правильно!</p>
                        :
                        <p>Что-то не так:(</p> &&
                        <button onClick={resetTranscript}>Еще раз</button>
                    }
                </> : listening ? <p>Cлушаю</p> : null}

        </div>
    )

}


export default Recognition;