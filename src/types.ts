export type Preset = {
    rows: number;
    cols: number;
    mines: number;
};

export type PresetMap = {
    [key: string]: Preset;
};

export enum Status {
    alive = 'alive',
    touch = 'touch',
    dead = 'dead',
    win = 'win',
}

export type Position = {
    x: number;
    y: number;
};

export enum Content {
    blank = 'blank',
    digit = 'digit',
    bombed = 'bombed',
}

export enum Visibility {
    marked = 'marked',
    visible = 'visible',
    hidden = 'hidden',
}

export type Cell = {
    content: Content;
    visibility: Visibility;
    digit?: number;
};

export type Board = Cell[][];

export type World = {
    marked: number;
    hidden: number;
    preset: Preset;
    board: Cell[][];
    status: Status;
};
