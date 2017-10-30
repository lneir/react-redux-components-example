import { interfaces } from './interfaces';

// map from key: interface symbol to module that implements interface.
var implMap = {}

implMap[interfaces.chat.IChatSymbol] = 'chat';
implMap[interfaces.grid.IGridSymbol] = 'grid';
implMap[interfaces.nav.INavigationSymbol] = 'navigation';

export default implMap;
