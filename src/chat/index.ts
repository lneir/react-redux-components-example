import ChatComponent from './comp';
import { IPassedProps } from './comp';
import getReducer from './reducer';

import registrar from '../registrar';

import { interfaces } from './interfaces'

class Chat implements interfaces.IChat {
    get Component(): new(...args: any[]) => React.Component<IPassedProps> {
        return ChatComponent
    }
}

export function init() {
    registrar.bind<interfaces.IChat>(interfaces.IChatSymbol, Chat);
    return getReducer();
}
