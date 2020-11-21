import produce from 'immer';

import { World, Visibility, Preset, Status, Position, Content } from 'src/types';
import { createBoard } from './board-generator';

const isCellExists = (x: number, y: number, world: World): boolean => Boolean(world.board[y] && world.board[y][x]);

export const createWorld = (preset: Preset): World => ({
    preset,
    tries: 0,
    marked: 0,
    hidden: preset.rows * preset.cols,
    status: Status.alive,
    board: createBoard(preset),
});

export const resetWorld = (world: World): World => createWorld(world.preset);

export const touchWorld = (world: World): World =>
    produce(world, (draftWorld) => {
        if (draftWorld.status === Status.alive) {
            draftWorld.status = Status.touch;
        }
    });

export const untouchWorld = (world: World): World =>
    produce(world, (draftWorld) => {
        if (draftWorld.status === Status.touch) {
            draftWorld.status = Status.alive;
        }
    });

export const markBoardCell = (world: World, { x, y }: Position): World =>
    produce(world, (draftWorld) => {
        if (world.status !== Status.alive) {
            return;
        }

        if (!isCellExists(x, y, world)) {
            return;
        }

        const cell = draftWorld.board[y][x];

        if (cell.visibility === Visibility.visible) {
            return;
        }

        if (cell.visibility === Visibility.marked) {
            draftWorld.marked -= 1;
            draftWorld.board[y][x].visibility = Visibility.hidden;

            return;
        }

        if (cell.visibility === Visibility.hidden && draftWorld.marked < draftWorld.preset.mines) {
            draftWorld.marked += 1;
            draftWorld.board[y][x].visibility = Visibility.marked;

            return;
        }
    });

const getNeigborsPositions = (x: number, y: number): [number, number][] => [
    [y - 1, x - 1],
    [y - 1, x],
    [y - 1, x + 1],
    [y, x - 1],
    [y, x + 1],
    [y + 1, x - 1],
    [y + 1, x],
    [y + 1, x + 1],
];

const revealNeighbors = (x: number, y: number, world: World) => {
    let queuePositions: [number, number][] = [[x, y]];

    while (queuePositions.length > 0) {
        const position = queuePositions.shift();

        if (!position) {
            continue;
        }

        if (!isCellExists(position[0], position[1], world)) {
            continue;
        }

        const cell = world.board[position[1]][position[0]];

        if (cell.visibility === Visibility.visible || cell.visibility === Visibility.marked) {
            continue;
        }

        if (cell.content === Content.digit) {
            cell.visibility = Visibility.visible;

            world.hidden -= 1;
        }

        if (cell.content === Content.blank) {
            cell.visibility = Visibility.visible;
            world.hidden -= 1;

            queuePositions = queuePositions.concat(getNeigborsPositions(position[1], position[0]));
        }
    }
};

export const openBoardCell = (world: World, { x, y }: Position): World =>
    produce(world, (draftWorld) => {
        if (world.status !== Status.alive) {
            return;
        }

        const drafCell = draftWorld.board[y][x];

        if (draftWorld.status === Status.dead || draftWorld.status === Status.win) {
            return;
        }

        if (drafCell.visibility === Visibility.visible) {
            return;
        }

        if (drafCell.content === Content.bombed && world.tries > 0) {
            draftWorld.status = Status.dead;
            draftWorld.tries += 1;

            draftWorld.board.forEach((row) =>
                row.forEach((cell) => {
                    if (cell.content === Content.bombed) {
                        cell.visibility = Visibility.visible;
                    }
                }),
            );

            return;
        }

        if (drafCell.content === Content.bombed) {
            draftWorld.board = createBoard(world.preset, { x, y });
        }

        revealNeighbors(x, y, draftWorld);

        draftWorld.tries += 1;
        draftWorld.status = draftWorld.hidden === world.preset.mines ? Status.win : Status.alive;
    });
