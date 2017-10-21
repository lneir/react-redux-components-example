export enum ActionTypeKeys {
    OPEN = 'navigation/OPEN'
}

export interface OpenAction {
    type: ActionTypeKeys.OPEN;
    value: string;
}

// concat of all actions
export type ActionTypes = OpenAction;
