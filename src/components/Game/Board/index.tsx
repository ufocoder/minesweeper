import React, { FC } from 'react';
import classNames from 'classnames';

import { useBoard, UseBoardProps } from './hooks';
import { Cell, Content, Visibility } from 'src/types';

import './assets/styles.sass';

interface BroardCellProps {
    x: number;
    y: number;
    cell: Cell;
}

const BroardCell: FC<BroardCellProps> = React.memo(({ x, y, cell }) => {
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

export type BoardProps = {
    board: Cell[][];
} & UseBoardProps;

const Board: FC<BoardProps> = (props) => {
    const { board, ...restProps } = props;

    useBoard({ ...restProps });

    return (
        <table className='board'>
            <tbody>
                {board.map((row, y) => (
                    <tr className='board__row' key={y}>
                        {row.map((cell, x) => (
                            <BroardCell key={`${y}-${x}`} x={x} y={y} cell={cell} />
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Board;
