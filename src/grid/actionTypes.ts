export enum ActionTypeKeys {
    OPEN = 'grid/OPEN',
    CLOSE = 'grid/CLOSE',
}

export interface IOpenAction {
    type: ActionTypeKeys.OPEN;
    value: string;
}

export interface ICloseAction {
    type: ActionTypeKeys.CLOSE;
    value: string;
}

// concat of all actions
export type ActionTypes = IOpenAction | ICloseAction;
