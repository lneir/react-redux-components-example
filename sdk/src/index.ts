import { interfaces } from './interfaces';
import { Registry, default as registry } from './registry';
import * as store from './store';
import { injectInterface } from './utils/decorators';
import bindDependencies from './utils/bindDependencies';

export {
    interfaces,
    registry,
    Registry,
    store,
    injectInterface,
    bindDependencies
}
