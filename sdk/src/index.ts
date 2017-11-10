import { interfaces } from './interfaces';
import { Registrar, default as registrar } from './registrar';
import * as store from './store';
import { injectInterface } from './utils/decorators';
import bindDependencies from './utils/bindDependencies';

export {
    interfaces,
    registrar,
    Registrar,
    store,
    injectInterface,
    bindDependencies
}
