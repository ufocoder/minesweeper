import * as game from '../game';
import { Status } from 'src/types';

describe('Game lib', () => {
    const preset = { rows: 10, cols: 10, mines: 10 };

    test('Method `createWorld`', () => {
        const world = game.createWorld(preset);

        expect(world.preset).toEqual(preset);
        expect(world.marked).toEqual(0);
        expect(world.hidden).toEqual(preset.rows * preset.cols);
        expect(world.status).toEqual(Status.alive);
    });

    test('Method `touchWorld`', () => {
        const world = game.createWorld(preset);
        const touchedWorld = game.touchWorld(world);

        expect(touchedWorld.status).toEqual(Status.touch);
    });

    test('Method `untouchWorld`', () => {
        const world = game.createWorld(preset);

        world.status = Status.touch;

        expect(world).toEqual(Status.alive);
    });
});
