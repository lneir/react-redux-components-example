import component from './comp';
import * as React from 'react';
import getReducer from './reducer';
import * as actions from './actions';

import { interfaces, registry, store } from 'sdk';

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

registry.bind<interfaces.grid.IGrid>(interfaces.Symbols.IGrid, new Grid());

export function init() {
    let reducer = getReducer();
    store.addReducer(reducer.name, reducer.reducer);

    return registry.resolve(interfaces.grid.deps)
}
