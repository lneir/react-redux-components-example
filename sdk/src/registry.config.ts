import { Registry } from './registry';
import { interfaces } from './interfaces';
import { makeBindInterfaces } from './utils/bindInterfaces';
import { makeInjectInterface } from './utils/decorators';

let registry: interfaces.IRegistry;
let injectInterface;
let bindInterfaces;

function makeRegistry() {
    registry = new Registry();
    injectInterface = makeInjectInterface(registry);
    bindInterfaces = makeBindInterfaces(registry);
}

makeRegistry();

export {
    registry,
    injectInterface,
    bindInterfaces
}
