import { interfaces } from './interfaces';

// type InterfaceIdentifier = interfaces.InterfaceIdentifier;

// map from key: interface symbol to component that implements interface.
// Provides a method to dynamically load and init a component.
let implMap = {};

// each return a promise that will dynamically load component
implMap[interfaces.chat.IChatSymbol] = () =>
    import(/* webpackChunkName: "chat" */ 'chat');

implMap[interfaces.grid.IGridSymbol] = () =>
    import(/* webpackChunkName: "grid" */ 'grid');

implMap[interfaces.nav.INavigationSymbol] = () =>
    import(/* webpackChunkName: "navigation" */ 'navigation');

export default function loadComponent(identifier:symbol) {
    const getComponent = implMap[identifier];
    if (!module) {
        throw new Error('No implementation exists: ' + identifier.toString());
    }

    return getComponent().then(comp => comp.init());
}