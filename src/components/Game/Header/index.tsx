import React from 'react';
import { useWorldDispatch, useWorldState } from 'src/context/world';

import EmojiStatus from './Emoji';
import Scoreboard from './Scoreboard';

const Header = () => {
    const {
        preset: { mines },
        marked,
        status,
    } = useWorldState();

    const { resetWorld } = useWorldDispatch();

    return (
        <>
            <Scoreboard score={mines} />
            <EmojiStatus status={status} onClick={resetWorld} />
            <Scoreboard score={marked} />
        </>
    );
};

export default Header;
