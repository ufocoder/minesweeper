import produce from 'immer';

import { World, Visibility, Preset, Status, Position, Content } from 'src/types';
import { createBoard } from './board-generator';

const isCellExists = (x: number, y: number, world: World): boolean => Boolean(world.board[y] && world.board[y][x]);

export const createWorld = (preset: Preset): World => ({
    preset,
    marked: 0,
    hidden: preset.rows * preset.cols,
    status: Status.alive,
    board: createBoard(preset),
});

export const resetWorld = (world: World): World =>
    createWorld(world.preset);

export const touchWorld = (world: World): World =>
    produce(world, (draftWorld) => {
        draftWorld.status = Status.touch;
    });

export const untouchWorld = (world: World): World =>
    produce(world, (draftWorld) => {
        draftWorld.status = Status.alive;
    });

export const markCell = ({ x, y }: Position) => (world: World): World =>
    produce(world, (draftWorld) => {
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

const revealNeighbors = (x: number, y: number, world: World) => {
    if (!isCellExists(x, y, world)) {
        return;
    }

    const cell = world.board[y][x];

    if (cell.visibility === Visibility.visible || cell.visibility === Visibility.marked) {
        return;
    }

    if (cell.content === Content.digit) {
        cell.visibility = Visibility.visible;
        world.hidden -= 1;
    }

    if (cell.content === Content.blank) {
        const neighborsPositions = [
            [y - 1, x],
            [y, x - 1],
            [y, x + 1],
            [y + 1, x],
        ];

        cell.visibility = Visibility.visible;
        world.hidden -= 1;

        neighborsPositions.forEach(([y, x]) => revealNeighbors(x, y, world));
    }
};

export const openCell = ({ x, y }: Position) => (world: World): World =>
    produce(world, (draftWorld) => {
        const drafCell = draftWorld.board[y][x];

        if (drafCell.visibility === Visibility.visible) {
            return;
        }

        if (drafCell.content === Content.bombed) {
            draftWorld.status = Status.dead;

            draftWorld.board.forEach((row) =>
                row.forEach((cell) => {
                    if (cell.content === Content.bombed) {
                        cell.visibility = Visibility.visible;
                    }
                }),
            );

            return;
        }

        revealNeighbors(x, y, draftWorld);

        draftWorld.status = draftWorld.hidden === world.preset.mines ? Status.win : Status.alive;
    });
