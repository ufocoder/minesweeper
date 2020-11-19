import { Content, Visibility } from 'src/types';
import { createBoard } from '../board-generator';

const generateNumber = (min: number, max: number) => min + Math.round(Math.random() * (max - min));

describe('Board generator', () => {
    describe('Method `createBoard`', () => {
        const preset = { cols: 5, rows: 5, mines: 5 };

        test('base usage', () => {
            const board = createBoard(preset);

            expect(board.length).toEqual(preset.rows);

            board.forEach((row) => {
                expect(row.length).toEqual(preset.cols);

                row.forEach((cell) => {
                    expect(cell.visibility).toEqual(Visibility.hidden);
                });
            });
        });

        test('exclude specified position', () => {
            const position = {
                x: generateNumber(0, preset.cols - 1),
                y: generateNumber(0, preset.rows - 1),
            };

            const board = createBoard(preset, position);

            expect(board[position.y][position.x].content).not.toEqual(Content.bombed);
        });
    });
});
