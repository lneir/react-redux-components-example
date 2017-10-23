export enum ActionTypeKeys {
    OPEN = 'grid/OPEN',
    CLOSE = 'grid/CLOSE',
}

export interface OpenAction {
    type: ActionTypeKeys.OPEN;
    value: string;
}

export interface CloseAction {
    type: ActionTypeKeys.CLOSE;
    value: string;
}

// concat of all actions
export type ActionTypes = OpenAction | CloseAction;
