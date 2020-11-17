import React, { FC } from 'react';

import Board from './Board';
import { UseBoardProps } from './Board/hooks';

import Emoji from './Emoji';
import Scoreboard from './Scoreboard';

import { World } from 'src/types';

import './assets/styles.sass';

type GameProps = {
    world: World;
    onEmojiClick: () => void;
} & UseBoardProps;

const Game: FC<GameProps> = (props) => {
    const { world, onEmojiClick, ...restProps } = props;
    const {
        status,
        marked,
        board,
        preset: { mines },
    } = world;

    return (
        <div className='game'>
            <div className='game__header'>
                <Scoreboard score={mines} />
                <Emoji status={status} onClick={onEmojiClick} />
                <Scoreboard score={marked} />
            </div>

            <div className='game__content'>
                <Board board={board} {...restProps} />
            </div>
        </div>
    );
};

export default Game;
