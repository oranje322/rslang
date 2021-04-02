import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const GamePlay = () => {
    const words = useSelector(state => state.words);
    console.log(words);
    return (

        <h2>начали</h2>


    );
};

export default GamePlay;
