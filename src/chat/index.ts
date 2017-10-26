import ChatComponent from './comp';
import getReducer from './reducer';
import registrar from '../registrar';
import { interfaces } from '../sdk/interfaces'

class Chat implements interfaces.chat.IChat {
    get Component(): new(...args: any[]) => React.Component<interfaces.chat.IPassedProps> {
        return ChatComponent
    }
}

registrar.bind<interfaces.chat.IChat>(interfaces.chat.IChatSymbol, Chat);

export function init() {
    return getReducer();
}
