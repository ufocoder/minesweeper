import React from 'react';

import './assets/styles.sass';

const Help = () => {
    return (
        <div className='about'>
            <p>You have to discover all the free squares without exploding the mines in the grid.</p>
            <p>
                <a className='about__link' href='https://en.wikipedia.org/wiki/Minesweeper_(video_game)'>
                    Read on wikipedia
                </a>
            </p>
            <p>
                <a className='about__link' href='https://github.com/ufocoder/minesweeper'>
                    Sources
                </a>
            </p>
        </div>
    );
};

export default Help;
