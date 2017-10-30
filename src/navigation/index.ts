import NavigationComponent from './comp';
import getReducer from './reducer';
import registrar from '../registrar';
import { interfaces } from '../sdk/interfaces'
import * as store from '../sdk/store';

class Navigation implements interfaces.nav.INavigation {
    get Component(): new(...args: any[]) => React.Component<interfaces.nav.IPassedProps> {
        return NavigationComponent
    }
}

registrar.bind<interfaces.nav .INavigation>(interfaces.nav.INavigationSymbol, Navigation);

export function init() {
    var reducer = getReducer();
    store.addReducer(reducer.name, reducer.reducer);

    return registrar.resolve([ interfaces.grid.IGridSymbol ]);
}
