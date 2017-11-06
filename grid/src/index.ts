import component from './comp';
import * as React from 'react';
import getReducer from './reducer';
import * as actions from './actions';

import { interfaces, registrar, store } from 'sdk';

class Grid implements interfaces.grid.IGrid {
    open(streamId: string): interfaces.grid.IOpenAction {
        return actions.open(streamId);
    }

    close(streamId: string): interfaces.grid.ICloseAction {
        return actions.close(streamId);
    }

    get Component(): new(...args: any[]) => React.Component<interfaces.grid.IPassedProps> {
        return component
    }
}

registrar.bind<interfaces.grid.IGrid>(interfaces.grid.IGridSymbol, Grid);

export function init() {
    let reducer = getReducer();
    store.addReducer(reducer.name, reducer.reducer);

    return registrar.resolve([ interfaces.chat.IChatSymbol ])
}