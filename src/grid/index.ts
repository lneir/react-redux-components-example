import component from './comp';
import * as React from 'react';
import { IGridState, IPassedProps } from './comp';
import getReducer from './reducer';
import * as actions from './actions';

import registrar from '../registrar';

// somewhat ackward method to re-export actionTypes which contains interfaces
export import actionTypes = require('./actionTypes');

export interface IGrid {
    open(streamId: string): actionTypes.IOpenAction;
    close(streamId: string): actionTypes.ICloseAction;
    readonly Component: new(...args: any[]) => React.Component<IPassedProps>;
}

export let InterfaceSymbols = {
    IGrid: Symbol('IGrid')
}

class Grid implements IGrid {
    open(streamId: string): actionTypes.IOpenAction {
        return actions.open(streamId);
    }

    close(streamId: string): actionTypes.ICloseAction {
        return actions.close(streamId);
    }

    get Component(): new(...args: any[]) => React.Component<IPassedProps> {
        return component
    }
}

export function init() {
    registrar.bind<IGrid>(InterfaceSymbols.IGrid, Grid);
    return getReducer();
}
