import {getValue,getEnvAttr } from "../../util/ObjectUtil.js";
import {generateAnnoCode, isTrue} from "../../util/Code.js";
import { IDue, IVNode } from "../../interface/index.js";

export function checkVBind(vm:IDue, vnode:IVNode) {
    if (vnode.nodeType !== 1) {
        return;
    }
    let attrNames:string[] = vnode.elm.getAttributeNames();
    for (let i = 0 ; i < attrNames.length ; i ++) {
        if (attrNames[i].indexOf("v-bind:") === 0 || attrNames[i].indexOf(":") === 0) {
            
            vBind(vm, vnode, attrNames[i], (vnode.elm.getAttribute(attrNames[i]) as string));
        }
    }
}

function vBind(vm:IDue, vnode:IVNode, name:string, value:string) {
    let k:string = name.split(":")[1];
    if (/^{[\w\W]+}$/.test(value)) {
        let str:string = value.substring(1, value.length - 1).trim();//解析出表达式的内容
        let expressionList:string[] = str.split(",");
        let result:string = analysisExpression(vm, vnode, expressionList);
        vnode.elm.setAttribute(k, result);
    } else {
        let v:string = getValue(vm._data, value);
        vnode.elm.setAttribute(k, v);
    }
}

function analysisExpression(vm:IDue, vnode:IVNode, expressionList:string[]) {
    let attr:object|any[] = getEnvAttr(vm, vnode);
    let code:string = generateAnnoCode(attr);
    let result:string = "";
    for (let i = 0 ; i < expressionList.length ; i ++) {
        let site = expressionList[i].indexOf(":");
        if (site > -1) {
            if (isTrue(expressionList[i].substring(site + 1, expressionList[i].length), code)) {
                result += expressionList[i].substring(0, site) + ",";
            }
        } else {
            result += expressionList[i] + ",";
        }
    }
    if (result.length > 0) {
        result = result.substring(0, result.length - 1);
    }
    return result;
}

