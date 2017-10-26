import NavigationComponent from './comp';
import { IPassedProps } from './comp';
import getReducer from './reducer';

import registrar from '../registrar';

import { interfaces } from './interfaces'

class Navigation implements interfaces.INavigation {
    get Component(): new(...args: any[]) => React.Component<IPassedProps> {
        return NavigationComponent
    }
}

export function init() {
    registrar.bind<interfaces.INavigation>(interfaces.INavigationSymbol, Navigation);
    return getReducer();
}
