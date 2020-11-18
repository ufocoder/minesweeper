import { useBoard } from '../hooks';

describe('Board hooks', () => {
    describe('`useBoard` hook', () => {
        test('ok', () => {
            const props = {
                onBoardUntouch: jest.fn(),
                onBoardTouch: jest.fn(),
                onCellMark: jest.fn(),
                onCellOpen: jest.fn(),
            };

            expect(props).toEqual(props);
        });
    });
});
