import { interfaces } from './interfaces';

type InterfaceIdentifier = interfaces.InterfaceIdentifier;

// map from key: interface symbol to component that implements interface.
// Provides a method to dynamically load and init a component.
let implMap = {};

// each return a promise that will dynamically load component
implMap[interfaces.chat.IChatSymbol] = () =>
    import(/* webpackChunkName: "chat" */ '../comps/chat');

implMap[interfaces.grid.IGridSymbol] = () =>
    import(/* webpackChunkName: "grid" */ '../comps/grid');

implMap[interfaces.nav.INavigationSymbol] = () =>
    import(/* webpackChunkName: "navigation" */ '../comps/navigation');

export default function loadComponent(identifier:InterfaceIdentifier) {
    const getComponent = implMap[identifier];
    if (!module) {
        throw new Error('No implementation exists: ' + identifier.toString());
    }

    return getComponent().then(comp => comp.init());
}
