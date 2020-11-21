import React from 'react';
import Game from 'src/components/Game';
import Menu from 'src/components/Menu';
import Window from 'src/components/Window';
import { WorldProvider } from 'src/context/world';

import './assets/styles.sass';

const App = () => {
    return (
        <div className='wrapper'>
            <div className='app'>
                <Window title='Minesweeper'>
                    <WorldProvider>
                        <Menu />
                        <Game />
                    </WorldProvider>
                </Window>
            </div>
        </div>
    );
};

export default App;
