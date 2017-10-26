import component from './comp';
import * as React from 'react';
import { IPassedProps } from './comp';
import getReducer from './reducer';
import * as actions from './actions';
import registrar from '../registrar';

// somewhat ackward method to re-export actionTypes which contains interfaces
// export import actionTypes = require('./actionTypes');

import { interfaces } from './interfaces';

class Grid implements interfaces.IGrid {
    open(streamId: string): interfaces.IOpenAction {
        return actions.open(streamId);
    }

    close(streamId: string): interfaces.ICloseAction {
        return actions.close(streamId);
    }

    get Component(): new(...args: any[]) => React.Component<IPassedProps> {
        return component
    }
}

registrar.bind<interfaces.IGrid>(interfaces.IGridSymbol, Grid);

export function init() {
    return getReducer();
}
