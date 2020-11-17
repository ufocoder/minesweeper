import React, { FC, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';

import './assets/styles.sass';

const rootModalElement = document.getElementById('root-modal');

const Modal: FC = ({ children }) => {
    const element = useMemo(() => document.createElement('div'), []);

    useEffect(() => {
        rootModalElement!.appendChild(element);

        return () => {
            rootModalElement!.removeChild(element);
        };
    }, [element]);

    return ReactDOM.createPortal(
        <div className='modal'>
            <div className='modal__content'>{children}</div>
            <div className='modal__overlay' />
        </div>,
        element,
    );
};

export default Modal;
