import * as React from 'react';
import { IPassedProps } from './comp';

namespace interfaces {
    export enum ActionTypeKeys {
        OPEN = 'grid/OPEN',
        CLOSE = 'grid/CLOSE',
    }

    // concat of all actions
    export type ActionTypes = IOpenAction | ICloseAction;

    export interface IOpenAction {
        type: ActionTypeKeys.OPEN;
        value: string;
    }

    export interface ICloseAction {
        type: ActionTypeKeys.CLOSE;
        value: string;
    }

    export interface IGrid {
        open(streamId: string): IOpenAction;
        close(streamId: string): ICloseAction;
        readonly Component: new(...args: any[]) => React.Component<IPassedProps>;
    }

    export const IGridSymbol = Symbol('IGrid');
}

export { interfaces }
