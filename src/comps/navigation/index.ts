import NavigationComponent from './comp';
import getReducer from './reducer';
import { interfaces, registrar, store } from '../../sdk';

class Navigation implements interfaces.nav.INavigation {
    get Component(): new(...args: any[]) => React.Component<interfaces.nav.IPassedProps> {
        return NavigationComponent
    }
}

registrar.bind<interfaces.nav .INavigation>(interfaces.nav.INavigationSymbol, Navigation);

export function init() {
    let reducer = getReducer();
    store.addReducer(reducer.name, reducer.reducer);

    return registrar.resolve([ interfaces.grid.IGridSymbol ]);
}
