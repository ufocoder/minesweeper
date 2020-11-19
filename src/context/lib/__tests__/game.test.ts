import { createWorld, markBoardCell, openBoardCell, resetWorld, touchWorld, untouchWorld } from 'src/context/lib/game';
import { Content, Position, Status, Visibility, World } from 'src/types';

const generateNumber = (min: number, max: number) => min + Math.round(Math.random() * (max - min));

describe('Game lib', () => {
    const preset = { rows: 10, cols: 10, mines: 10 };

    describe('world methods', () => {
        test('Method `createWorld`', () => {
            const world = createWorld(preset);

            expect(world.preset).toEqual(preset);
            expect(world.marked).toEqual(0);
            expect(world.hidden).toEqual(preset.rows * preset.cols);
            expect(world.status).toEqual(Status.alive);
        });

        test('Method `resetWorld`', () => {
            const world = createWorld(preset);

            world.status = Status.dead;

            expect(world).not.toEqual(resetWorld(world));
        });

        test('Method `touchWorld`', () => {
            const world = createWorld(preset);
            const touchedWorld = touchWorld(world);

            expect(touchedWorld.status).toEqual(Status.touch);
        });

        test('Method `untouchWorld`', () => {
            const world = createWorld(preset);

            world.status = Status.touch;

            expect(untouchWorld(world).status).toEqual(Status.alive);
        });
    });

    describe('board methods', () => {
        test('Method `markBoardCell`', () => {
            const world = createWorld(preset);
            const position = {
                x: generateNumber(0, preset.cols - 1),
                y: generateNumber(0, preset.rows - 1),
            };

            const newWorld = markBoardCell(world, position);
            const newCell = newWorld.board[position.y][position.x];

            expect(newWorld.marked).toEqual(1);
            expect(newCell.visibility).toEqual(Visibility.marked);
        });

        describe('Method `openBoardCell`', () => {
            const bomb = () => ({ content: Content.bombed, visibility: Visibility.hidden });
            const blank = () => ({ content: Content.blank, visibility: Visibility.hidden });
            const digit = (digit: number) => ({ content: Content.digit, visibility: Visibility.hidden, digit });

            const originalWorld: World = {
                marked: 0,
                hidden: 16,
                tries: 0,
                preset: { rows: 4, cols: 4, mines: 4 },
                board: [
                    [bomb(), digit(1), blank(), blank()],
                    [digit(1), digit(1), digit(1), digit(1)],
                    [digit(1), digit(1), digit(3), bomb()],
                    [digit(1), bomb(), digit(3), bomb()],
                ],
                status: Status.alive,
            };

            const copyWorld = () => JSON.parse(JSON.stringify(originalWorld));

            test('open blank cell', () => {
                const position = { x: 3, y: 0 };
                const world = copyWorld();
                const newWorld = openBoardCell(world, position);

                expect(newWorld.tries).toEqual(1);
                expect(newWorld.status).toEqual(Status.alive);
                expect(newWorld.board[0][1].visibility).toEqual(Visibility.visible);
                expect(newWorld.board[0][2].visibility).toEqual(Visibility.visible);
                expect(newWorld.board[0][3].visibility).toEqual(Visibility.visible);
                expect(newWorld.board[1][1].visibility).toEqual(Visibility.visible);
                expect(newWorld.board[1][2].visibility).toEqual(Visibility.visible);
                expect(newWorld.board[1][3].visibility).toEqual(Visibility.visible);
            });

            test('open digit cell', () => {
                const position = { x: 1, y: 0 };
                const world = copyWorld();
                const newWorld = openBoardCell(world, position);

                expect(newWorld.tries).toEqual(1);
                expect(newWorld.status).toEqual(Status.alive);
                expect(newWorld.board[0][1].visibility).toEqual(Visibility.visible);
            });

            test('open bombed cell', () => {
                const position = { x: 0, y: 0 };
                const world = copyWorld();

                // recreate world after first try
                const newWorld = openBoardCell(world, position);
                const newCell = newWorld.board[position.y][position.x];

                expect(newWorld.tries).toEqual(1);
                expect(newWorld.status).toEqual(Status.alive);
                expect(newCell.content).not.toEqual(Content.bombed);

                // dead after next try
                const bombPositions: Position[] = [];

                newWorld.board.forEach((row, y) => {
                    row.forEach((cell, x) => {
                        if (cell.content === Content.bombed) {
                            bombPositions.push({ x, y });
                        }
                    });
                });

                const deadWorld = openBoardCell(newWorld, bombPositions[0]);

                expect(deadWorld.tries).toEqual(2);
                expect(deadWorld.status).toEqual(Status.dead);

                bombPositions.forEach(({ x, y }) => {
                    expect(deadWorld.board[y][x].visibility).toEqual(Visibility.visible);
                });
            });
        });
    });
});
