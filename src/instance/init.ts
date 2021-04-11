import {mount} from "./mount.js";
import {constructProxy} from "./proxy.js";
import {IOptions, TDue, IDue} from "../interface/index.js"

let uid = 0;

export function initMixin(Due:TDue) {
    Due.prototype._init = function (options:IOptions) {
        const vm:IDue = this;
        vm._uid = uid ++;
        vm._isVue = true;
        if (options && options.data) {
            vm._data = constructProxy(vm, options.data, "");
        }
        if (options && options.created) {
            vm.created = options.created;
        }
        if (options && options.methods) {
            vm._methods = options.methods;
            for (let temp in options.methods) {
                vm[temp] = options.methods[temp];
            }
        }
        if (options && options.computed) {
            vm._computed = options.computed;
            for (let temp in options.computed) {
                vm[temp] = options.computed[temp];
            }
        }
        if (options && options.el) {
            let rootDom = document.getElementById(options.el);
            rootDom && mount(vm, rootDom);
        }
    }
}