import { IDue, IVNode } from "../../interface/index.js";
import {getValue} from "../../util/ObjectUtil.js";

export function checkVOn(vm:IDue, vnode:IVNode):void {
    if (vnode.nodeType !== 1) {
        return;
    }
    let attrNames:string[] = vnode.elm.getAttributeNames();
    for (let i = 0 ; i < attrNames.length ; i ++) {
        if (attrNames[i].indexOf("v-on:") == 0 || attrNames[i].indexOf("@") == 0) {
            // vBind(vm, vnode, attrNames[i], vnode.elm.getAttribute(attrNames[i]));
            von(vm, vnode, attrNames[i].split(":")[1], (vnode.elm.getAttribute(attrNames[i]) as string));
        }
    }
}

function von(vm:IDue, vnode:IVNode, event:string, key:string) {
    let method = getValue(vm._methods, key);
    if (method) {
        vnode.elm.addEventListener(event, proxyExecute(vm, method));
    }
}

function proxyExecute(vm:IDue, method:any) {
    return function () {
        method.call(vm);
    }
}