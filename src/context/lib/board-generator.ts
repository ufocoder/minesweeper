import { Board, Content, Visibility, Preset, Position } from 'src/types';

const createRandomNumberSet = (max: number, limit: number, exclude?: number) => {
    const numbers = Array.from(Array(max)).map((_, key) => key);

    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    if (exclude !== undefined) {
        const index = numbers.indexOf(exclude);
        if (index !== -1) {
            numbers.splice(index, 1);
        }
    }

    return new Set(numbers.splice(0, limit));
};

const calculateDigits = (x: number, y: number, board: Board) => {
    const positions = [
        [y - 1, x - 1],
        [y - 1, x],
        [y - 1, x + 1],
        [y, x - 1],
        [y, x + 1],
        [y + 1, x - 1],
        [y + 1, x],
        [y + 1, x + 1],
    ];

    return positions.reduce((neighbors, [y, x]) => {
        if (board[y] && board[y][x] && board[y][x].content === Content.bombed) {
            return neighbors + 1;
        }

        return neighbors;
    }, 0);
};

export const createBoard = ({ rows, cols, mines }: Preset, position?: Position): Board => {
    const bombedNumbers = position
        ? createRandomNumberSet(rows * cols, mines, cols * position.y + position.x)
        : createRandomNumberSet(rows * cols, mines);

    const board = Array.from(Array(rows), (_, y) =>
        Array.from(Array(cols)).map((_, x) => {
            return {
                content: bombedNumbers.has(y * cols + x) ? Content.bombed : Content.blank,
                visibility: Visibility.hidden,
            };
        }),
    ) as Board;

    board.forEach((row, y) =>
        row.forEach((cell, x) => {
            if (cell.content === Content.bombed) {
                return;
            }

            const neighbors = calculateDigits(x, y, board);

            if (neighbors) {
                cell.content = Content.digit;
                cell.digit = neighbors;
            }
        }),
    );

    return board;
};
