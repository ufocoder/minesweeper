import React from 'react';

import Header from './Header';
import Board from './Board';

import './assets/styles.sass';

const Game = () => {
    return (
        <div className='game'>
            <div className='game__header'>
                <Header />
            </div>

            <div className='game__content'>
                <Board />
            </div>
        </div>
    );
};

export default Game;
