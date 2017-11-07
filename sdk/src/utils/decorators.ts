import proxyGetter from './proxy';
import registrar from '../registrar';

let injectInterface = (interfaceIdentifier: symbol) => {
    return function(proto: any, key: string): void {
       let resolve = () => { return registrar.get(interfaceIdentifier); };
       proxyGetter(proto, key, resolve);
   };
};

export {
   injectInterface
}
