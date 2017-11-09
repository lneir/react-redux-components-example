import { interfaces } from './interfaces';
import { Registrar, default as registrar } from './registrar';
import * as store from './store';
import shallowEqual from './utils/shallowEqual';
import { injectInterface } from './utils/decorators';
export {
    interfaces,
    registrar,
    Registrar,
    store,
    shallowEqual,
    injectInterface
}
