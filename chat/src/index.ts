import ChatComponent from './comp';
import getReducer from './reducer';

import { interfaces, registrar, store } from 'sdk';


class Chat implements interfaces.chat.IChat {
    get Component(): new(...args: any[]) => React.Component<interfaces.chat.IPassedProps> {
        return ChatComponent
    }
}

registrar.bind<interfaces.chat.IChat>(interfaces.chat.IChatSymbol, Chat);

export function init() {
    let reducer = getReducer();
    store.addReducer(reducer.name, reducer.reducer);

    return registrar.resolve([ interfaces.grid.IGridSymbol ])
}
