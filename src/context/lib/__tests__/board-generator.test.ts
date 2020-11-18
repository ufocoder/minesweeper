import { createBoard } from '../board-generator';

describe('Board generator', () => {
    test('Method `createBoard`', () => {
        const preset = {
            cols: 5,
            rows: 5,
            mines: 5,
        };

        const board = createBoard(preset);

        expect(board.length).toEqual(preset.rows);

        board.forEach((row) => {
            expect(row.length).toEqual(preset.cols);
        });
    });
});
