import React from 'react';
import './assets/styles.sass';

interface ScoreboardProps {
    score: number;
}

const Scoreboard = ({ score }: ScoreboardProps) => <div className='scoreboard'>{score}</div>;

export default Scoreboard;
