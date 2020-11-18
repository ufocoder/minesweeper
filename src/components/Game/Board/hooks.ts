import { useEffect } from 'react';
import { useWorldDispatch, useWorldState } from 'src/context/world';
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

export const useBoard = () => {
    const { status } = useWorldState();
    const { touchBoard, untouchBoard, openBoardCell, markBoardCell } = useWorldDispatch();

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
                touchBoard();
            }
        };

        document.addEventListener('mousedown', handleDocumentMouseDown);

        return () => {
            document.removeEventListener('mousedown', handleDocumentMouseDown);
        };
    }, [status, touchBoard]);

    useEffect(() => {
        const handleDocumentMouseUp = (e: MouseEvent) => {
            const element = e.target as HTMLElement;

            if (status !== Status.touch) {
                return;
            }

            untouchBoard();

            if (isСellularElement(element)) {
                const position = extractPosition(element);

                if (e.button === MOUSE_RIGHT_BUTTON) {
                    markBoardCell(position);
                    return;
                }

                if (e.button === MOUSE_LEFT_BUTTON) {
                    openBoardCell(position);
                    return;
                }
            }
        };

        document.addEventListener('mouseup', handleDocumentMouseUp);

        return () => {
            document.removeEventListener('mouseup', handleDocumentMouseUp);
        };
    }, [status, markBoardCell, openBoardCell, untouchBoard]);
};
