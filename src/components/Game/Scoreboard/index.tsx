import React, { FC } from 'react';
import './assets/styles.sass';

interface ScoreboardProps {
    score: number;
}

const Scoreboard: FC<ScoreboardProps> = ({ score }) => <div className='scoreboard'>{score}</div>;

export default Scoreboard;
