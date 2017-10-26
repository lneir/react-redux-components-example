import ChatComponent from './comp';
import { IPassedProps } from './comp';
import getReducer from './reducer';

import registrar from '../registrar';

export interface IChat {
    readonly Component: new(...args: any[]) => React.Component<IPassedProps>;
}

export let InterfaceSymbols = {
    IChat: Symbol('IChat')
}

class Chat implements IChat {
    get Component(): new(...args: any[]) => React.Component<IPassedProps> {
        return ChatComponent
    }
}

export function init() {
    registrar.bind<IChat>(InterfaceSymbols.IChat, Chat);
    return getReducer();
}
