import { useEffect } from 'react';
import { Position, Status } from 'src/types';

const MOUSE_LEFT_BUTTON = 0;
const MOUSE_RIGHT_BUTTON = 2;

const isСellularElement = (element: HTMLElement) => element.hasAttribute('data-cell');

const extractPosition = (element: HTMLElement) => ({
    x: parseInt(element.getAttribute('data-x') || '0', 10),
    y: parseInt(element.getAttribute('data-y') || '0', 10),
});

export type UseBoardProps = {
    status: Status;
    onBoardUntouch: () => void;
    onBoardTouch: () => void;
    onCellMark: (position: Position) => void;
    onCellOpen: (position: Position) => void;
};

export const useBoard = ({ status, onBoardUntouch, onBoardTouch, onCellMark, onCellOpen }: UseBoardProps) => {
    useEffect(() => {
        const handler = window.oncontextmenu;

        window.oncontextmenu = () => false;

        return () => {
            window.oncontextmenu = handler;
        };
    });

    useEffect(() => {
        const handleDocumentMouseDown = (e: MouseEvent) => {
            const element = e.target as HTMLElement;

            if (status !== Status.alive) {
                return;
            }

            if (isСellularElement(element)) {
                onBoardTouch();
            }
        };

        document.addEventListener('mousedown', handleDocumentMouseDown);

        return () => {
            document.removeEventListener('mousedown', handleDocumentMouseDown);
        };
    }, [status, onBoardTouch]);

    useEffect(() => {
        const handleDocumentMouseUp = (e: MouseEvent) => {
            const element = e.target as HTMLElement;

            if (status !== Status.touch) {
                return;
            }

            onBoardUntouch();

            if (isСellularElement(element)) {
                const position = extractPosition(element);

                if (e.button === MOUSE_RIGHT_BUTTON) {
                    onCellMark(position);
                    return;
                }

                if (e.button === MOUSE_LEFT_BUTTON) {
                    onCellOpen(position);
                    return;
                }
            }
        };

        document.addEventListener('mouseup', handleDocumentMouseUp);

        return () => {
            document.removeEventListener('mouseup', handleDocumentMouseUp);
        };
    }, [status, onCellMark, onCellOpen, onBoardUntouch]);
};
