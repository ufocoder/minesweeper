import React from 'react';
import classNames from 'classnames';

import { useWorldState } from 'src/context/world';
import { useBoard } from './hooks';
import { Cell, Content, Status, Visibility } from 'src/types';

import './assets/styles.sass';

interface BroardCellProps {
    x: number;
    y: number;
    cell: Cell;
}

const BroardCell = React.memo(({ x, y, cell }: BroardCellProps) => {
    return (
        <td
            data-cell
            data-x={x}
            data-y={y}
            className={classNames('board__cell', {
                'board__cell--hidden': cell.visibility === Visibility.hidden,
                'board__cell--marked': cell.visibility === Visibility.marked,
                'board__cell--visible': cell.visibility === Visibility.visible,
                'board__cell--bombed': cell.visibility === Visibility.visible && cell.content === Content.bombed,
                [`board__cell--digit-${cell.digit}`]:
                    cell.visibility === Visibility.visible && cell.content === Content.digit,
            })}
        >
            {cell.visibility === Visibility.visible && cell.content === Content.digit && cell.digit}
        </td>
    );
});

interface BroardRowProps {
    row: Cell[];
    y: number;
}

const BoardRow = React.memo(({ row, y }: BroardRowProps) => (
    <tr className='board__row'>
        {row.map((cell, x) => (
            <BroardCell key={x} x={x} y={y} cell={cell} />
        ))}
    </tr>
));

const Board = () => {
    const { board, status } = useWorldState();

    useBoard();

    return (
        <table
            className={classNames('board', {
                'board--active': status === Status.touch || status === Status.alive,
            })}
        >
            <tbody>
                {board.map((row, y) => (
                    <BoardRow key={y} row={row} y={y} />
                ))}
            </tbody>
        </table>
    );
};

export default Board;
