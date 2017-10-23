import Grid from './comp';
import { gridReducer } from './reducer';
import * as selectors from './selectors';
import * as actions from './actions';

//import * as actionTypes from './actionTypes';
// ToDo: need to figure better way to re-export interfaces, above doesn't work.
import { ICloseAction, IOpenAction } from './actionTypes';

export {
    Grid as component,
    gridReducer as reducer,
    selectors,
    actions,
    ICloseAction,
    IOpenAction
}

// //registrar.addEventListener('start', () => {
//     registrar.reg(myComponent, reducers: Array<IReducer>);
// //});
//
// registrar.addEventListener('ready', () => {
//     // get any component needed
//     let rooms:IComponent = registrar.get<IRooms>();
//     rooms.actions[IFetch]
// });
//
// interface IReducer {
//
// }
//
// interface IAction {
//
// }
//
// interface ISelector {
//
// }
//
// interface IComponent {
//     ReactComp?: React.Component<any, any>;
//     actions?: { [key:string]:IAction; }
//     selector: Array<ISelector>;
// }
//
// interface IRegistrar {
//     register(comp: IComponent);
//     getComponent(name: string): IComponent
// }
