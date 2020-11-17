import React, { FC, useEffect } from 'react';

import './assets/styles.sass';

interface WindowProps {
    title: string;
    style?: React.CSSProperties;
    onClose?: () => void;
}

const Window: FC<WindowProps> = ({ title, children, style, onClose }) => {
    useEffect(() => {
        const hanldeDocumentKeydown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose!();
            }
        };

        if (onClose) {
            document.addEventListener('keydown', hanldeDocumentKeydown);
        }

        return () => {
            if (onClose) {
                document.removeEventListener('keydown', hanldeDocumentKeydown);
            }
        };
    }, [onClose]);

    return (
        <div className='window'>
            <div className='window__header'>
                <div className='window__header-text'>{title}</div>
                {onClose ? (
                    <div className='window__header-buttons'>
                        <button className='window__button-close' onClick={onClose} aria-label='close'></button>
                    </div>
                ) : null}
            </div>
            <div className='window__content' style={style}>
                {children}
            </div>
        </div>
    );
};

export default Window;
