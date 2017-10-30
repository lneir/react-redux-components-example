import ChatComponent from './comp';
import getReducer from './reducer';
import registrar from '../registrar';
import { interfaces } from '../sdk/interfaces'
import * as store from '../sdk/store';


class Chat implements interfaces.chat.IChat {
    get Component(): new(...args: any[]) => React.Component<interfaces.chat.IPassedProps> {
        return ChatComponent
    }
}

registrar.bind<interfaces.chat.IChat>(interfaces.chat.IChatSymbol, Chat);

export function init() {
    var reducer = getReducer();
    store.addReducer(reducer.name, reducer.reducer);

    return registrar.resolve([ interfaces.grid.IGridSymbol ])
}
