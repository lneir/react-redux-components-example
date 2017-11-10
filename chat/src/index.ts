import ChatComponent from './comp';
import getReducer from './reducer';

import { interfaces, registry, store } from 'sdk';

class Chat implements interfaces.chat.IChat {
    get Component(): new(...args: any[]) => React.Component<interfaces.chat.IPassedProps> {
        return ChatComponent
    }
}

registry.bind<interfaces.chat.IChat>(interfaces.Symbols.IChat, Chat);

export function init() {
    let reducer = getReducer();
    store.addReducer(reducer.name, reducer.reducer);

    return registry.resolve(interfaces.chat.deps)
}
