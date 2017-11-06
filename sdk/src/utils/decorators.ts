import proxyGetter from './proxy';
import registrar from '../registrar';

// function getDecorators() {

    // Decorator used to bind action creators and inject them into a class property
   let injectInterface = (interfaceIdentifier: symbol) => {
       return function(proto: any, key: string): void {
        //    let dispatch = store.dispatch;
        //    let actionCreators = kernel.get(actionCreatorsIdentifier);
        //    let boundActionCreators = Redux.bindActionCreators(actionCreators, dispatch);
           let resolve = () => {
               return registrar.get(interfaceIdentifier); };
           proxyGetter(proto, key, resolve);
       };
   };

   export {
       injectInterface
   }
// }
//
// export default getDecorators;
