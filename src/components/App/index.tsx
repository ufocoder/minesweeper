import React, { useState } from 'react';

import Game from 'src/components/Game';
import Menu from 'src/components/Menu';
import Window from 'src/components/Window';

import presets from 'src/lib/presets.json';
import * as game from 'src/lib/game';
import { World, Preset, Position } from 'src/types';

import './assets/styles.sass';

const App = () => {
    const [world, setWorld] = useState<World>(game.createWorld(presets.easy));

    const handleSettingsSubmit = (preset: Preset) => setWorld(() => game.createWorld(preset));
    const handleEmojiClick = () => setWorld(game.resetWorld);
    const handleBoardTouch = () => setWorld(game.touchWorld);
    const handleBoardUntouch = () => setWorld(game.untouchWorld);

    const handleCellMark = (position: Position) => setWorld(game.markCell(position));
    const handleCellOpen = (position: Position) => setWorld(game.openCell(position));

    return (
        <div className='app'>
            <Window title='Minesweeper'>
                <Menu onSettingsSubmit={handleSettingsSubmit} />
                <Game
                    world={world}
                    onEmojiClick={handleEmojiClick}
                    onBoardTouch={handleBoardTouch}
                    onBoardUntouch={handleBoardUntouch}
                    onCellMark={handleCellMark}
                    onCellOpen={handleCellOpen}
                />
            </Window>
        </div>
    );
};

export default App;
