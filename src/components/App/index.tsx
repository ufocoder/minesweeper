import React from 'react';
import Game from 'src/components/Game';
import Menu from 'src/components/Menu';
import Window from 'src/components/Window';
import { WorldProvider } from 'src/context/world';

import './assets/styles.sass';

const App = () => {
    return (
        <div className='app'>
            <Window title='Minesweeper'>
                <WorldProvider>
                    <Menu />
                    <Game />
                </WorldProvider>
            </Window>
        </div>
    );
};

export default App;
