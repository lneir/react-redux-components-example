import { interfaces } from './interfaces';

type InterfaceIdentifier = interfaces.InterfaceIdentifier;

// map from key: interface symbol to component that implements interface.
// Provides a method to dynamically load and init a component.
var implMap = {
}

implMap[interfaces.chat.IChatSymbol] = function() {
    return import(/* webpackChunkName: "chat" */ '../comps/chat');
}
implMap[interfaces.grid.IGridSymbol] = function() {
    return import(/* webpackChunkName: "grid" */ '../comps/grid');
}
implMap[interfaces.nav.INavigationSymbol] = function() {
    return import(/* webpackChunkName: "navigation" */ '../comps/navigation');
}

export default function loadComponent(identifier:InterfaceIdentifier) {
    const getComponent = implMap[identifier];
    if (!module) {
        throw new Error('No implementation exists: ' + identifier.toString());
    }

    return getComponent().then(comp => comp.init());
}
