import React from 'react';

import { Status } from 'src/types';

import './assets/styles.sass';

interface StatusProps {
    status: Status;
    onClick: () => void;
}

type EmojiSrc = {
    [key in Status]: string;
};

const emojiSrc: EmojiSrc = {
    alive: require('./assets/images/smile.png').default,
    touch: require('./assets/images/sweating.png').default,
    dead: require('./assets/images/dead.png').default,
    win: require('./assets/images/cool.png').default,
};

const EmojiStatus = ({ status, onClick }: StatusProps) => {
    return (
        <div className='emoji-status' onClick={onClick}>
            <img className='emoji-status__image' src={emojiSrc[status]} alt={`You are ${status}`} />
        </div>
    );
};

export default EmojiStatus;
