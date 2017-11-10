import NavigationComponent from './comp';
import getReducer from './reducer';
import { interfaces, registry, store } from 'sdk';

class Navigation implements interfaces.nav.INavigation {
    get Component(): new(...args: any[]) => React.Component<interfaces.nav.IPassedProps> {
        return NavigationComponent
    }
}

registry.bind<interfaces.nav .INavigation>(interfaces.Symbols.INavigation, Navigation);

export function init() {
    let reducer = getReducer();
    store.addReducer(reducer.name, reducer.reducer);

    return registry.resolve(interfaces.nav.deps);
}
