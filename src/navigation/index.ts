import Navigation from './comp';
import { navigationReducer } from './reducer';
import * as selectors from './selectors';

// public interface for navigation connected component
export {
    Navigation as component,
    navigationReducer as reducer,
    selectors
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
