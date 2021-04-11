import {renderData} from "./render.js"
import {rebuild} from "./mount.js";
import {getValue} from "../util/ObjectUtil.js";
import { IDue, IOptions, TArrayProto, TNamespace } from "../interface/index.js";

const arrayProto = Array.prototype // 获取Array的原型
function defArrayFunc (obj:TArrayProto, func:string, namespace:TNamespace, vm:IDue):void {
    Object.defineProperty(obj, func, {
        enumerable: true,
        configurable: true,
        value: function(...args:string[]):any {
            let original:any = arrayProto[func];
            const result = original.apply(this, args);
            rebuild(vm, getNameSpace(namespace, ""));
            renderData(vm, getNameSpace(namespace, ""));
            return result;
        }
    });
}

function proxyArr(vm:IDue, arr:any, namespace:TNamespace):any {
    let obj:TArrayProto = {
        eleType: "Array",
        toString():string {
            let result = "";
            for (let i = 0 ; i < arr.length ; i ++) {
                result += arr[i] + ", "
            }
            return result.substring(0, result.length - 2);
        },
        push() {},
        pop() {},
        shift() {},
        unshift() {}
    }
    defArrayFunc.call(vm, obj, 'push', namespace, vm);
    defArrayFunc.call(vm, obj, 'pop', namespace, vm);
    defArrayFunc.call(vm, obj, 'shift', namespace, vm);
    defArrayFunc.call(vm, obj, 'unshift', namespace, vm);
    arr.__proto__ = obj;
    return arr;
}

function constructObjectProxy(vm:IDue, obj:object, namespace:TNamespace):object {
    let proxyObj:object = {};
    for (let prop in obj) {
        Object.defineProperty(proxyObj, prop, {
            configurable: true,
            set: function (value:any):void {
                // console.log("set:" + getNameSpace(namespace, prop));
                obj[prop] = value;
                renderData(vm, getNameSpace(namespace, prop));
            },
            get():any {
                return obj[prop];
            }
        });
        Object.defineProperty(vm, prop, {
            configurable: true,
            set: function (value:any):void {
                // console.log("set:" + getNameSpace(namespace, prop));
                obj[prop] = value;
                let val = getValue(vm._data, getNameSpace(namespace, prop))
                if (val instanceof Array) {
                    rebuild(vm, getNameSpace(namespace, prop));
                    renderData(vm, getNameSpace(namespace, prop));
                } else {
                    renderData(vm, getNameSpace(namespace, prop));
                }
            },
            get():any {
                return obj[prop];
            }
        });
        if (obj[prop] instanceof Object) {
            proxyObj[prop] = constructProxy(vm, obj[prop], getNameSpace(namespace, prop));
        }
    }
    return proxyObj;
}

export function constructProxy(vm:IDue, obj:IOptions["data"], namespace:TNamespace) {
    let proxyObj:any[]|object;
    if (obj instanceof Array) {
        proxyObj = new Array(obj.length);
        for (let i = 0 ; i < (proxyObj as any[]).length ; i ++) {
            proxyObj[i] = constructProxy(vm, obj[i], namespace);
        }
        proxyObj = proxyArr(vm, obj, namespace);
    } else if (obj instanceof Object) {
        proxyObj = constructObjectProxy(vm, obj, namespace);
    } else {
        throw new Error("error");
    }
    return proxyObj;
}

function getNameSpace(nowNameSpace:TNamespace, nowProp:TNamespace):TNamespace {
    if (nowNameSpace == null || nowNameSpace == "") {
        return nowProp;
    } else if (nowProp == null || nowProp == "") {
        return nowNameSpace;
    } else {
        return nowNameSpace + "." + nowProp;
    }
}