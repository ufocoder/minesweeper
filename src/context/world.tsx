import React, { FC, createContext, useContext, useReducer } from 'react';

import presets from 'src/context/lib/presets.json';
import { createWorld, markBoardCell, openBoardCell, resetWorld, touchWorld, untouchWorld } from 'src/context/lib/game';

import { World, Preset, Position } from 'src/types';

const WorldStateContext = createContext<State | undefined>(undefined);
const WorldDispatchContext = createContext<Dispatch | undefined>(undefined);

type State = World;

type Action =
    | { type: 'createWorld'; payload: { preset: Preset } }
    | { type: 'resetWorld' }
    | { type: 'touchWorld' }
    | { type: 'untouchWorld' }
    | { type: 'markBoardCell'; payload: { position: Position } }
    | { type: 'openBoardCell'; payload: { position: Position } };

type Dispatch = (action: Action) => void;

function worldReducer(state: State, action: Action) {
    switch (action.type) {
        case 'createWorld':
            return createWorld(action.payload.preset);

        case 'resetWorld':
            return resetWorld(state);

        case 'touchWorld':
            return touchWorld(state);

        case 'untouchWorld':
            return untouchWorld(state);

        case 'markBoardCell':
            return markBoardCell(state, action.payload.position);

        case 'openBoardCell':
            return openBoardCell(state, action.payload.position);

        default:
            throw new Error(`Unhandled action`);
    }
}

const useWorldState = () => {
    const context = useContext(WorldStateContext);

    if (context === undefined) {
        throw new Error('useWorldState must be used within a WorldProvider');
    }

    return context;
};

const useWorldDispatch = () => {
    const dispatch = useContext(WorldDispatchContext);

    if (dispatch === undefined) {
        throw new Error('useWorldDispatch must be used within a WorldProvider');
    }

    return {
        createWorld: (preset: Preset) => dispatch({ type: 'createWorld', payload: { preset } }),
        resetWorld: () => dispatch({ type: 'resetWorld' }),
        touchBoard: () => dispatch({ type: 'touchWorld' }),
        untouchBoard: () => dispatch({ type: 'untouchWorld' }),
        openBoardCell: (position: Position) => dispatch({ type: 'openBoardCell', payload: { position } }),
        markBoardCell: (position: Position) => dispatch({ type: 'markBoardCell', payload: { position } }),
    };
};

const WorldProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(worldReducer, createWorld(presets.easy));

    return (
        <WorldStateContext.Provider value={state}>
            <WorldDispatchContext.Provider value={dispatch}>{children}</WorldDispatchContext.Provider>
        </WorldStateContext.Provider>
    );
};

export { WorldProvider, useWorldState, useWorldDispatch };
