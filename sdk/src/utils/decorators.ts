import proxyGetter from './proxy';
import { interfaces } from '../interfaces'

/**
 * Creates a typesript decorator that can be used to inject interfaces into
 * classes properties.
 * @param {Symbol} interfaceIdentifier  Symbol that identifies interface to be injected.
 *
 * example:
 * interface IChat {
 *  getChatName: () => string;
 * }
 *
 * class Hello {
 *   @injectInterface(IChat)
 *   private chat;
 *
 *   testMethod() {
 *     chat.getChatName();
 *   }
 * }
 */
function makeInjectInterface(registry) {
    let injectInterface = (interfaceIdentifier: interfaces.InterfaceIdentifier) => {
        return (proto: any, key: string): void  => {
           let resolve = () => {
               return registry.get(interfaceIdentifier); };
           proxyGetter(proto, key, resolve);
       };
    };

    return injectInterface;
}

export {
   makeInjectInterface
}
