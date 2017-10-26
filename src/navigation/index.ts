import NavigationComponent from './comp';
import { IPassedProps } from './comp';
import getReducer from './reducer';

import registrar from '../registrar';

export interface INavigation {
    readonly Component: new(...args: any[]) => React.Component<IPassedProps>;
}

export let InterfaceSymbols = {
    INavigation: Symbol('INavigation')
}

class Navigation implements INavigation {
    get Component(): new(...args: any[]) => React.Component<IPassedProps> {
        return NavigationComponent
    }
}

export function init() {
    registrar.bind<INavigation>(InterfaceSymbols.INavigation, Navigation);
    return getReducer();
}
