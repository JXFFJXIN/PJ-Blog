import VNode from "../../vdom/vnode.js";
import {getValue} from "../../util/ObjectUtil.js";
import { IDue, IVNode } from "../../interface/index.js";

export function vforInit(vm:IDue, instructions:string, elm:HTMLElement, parent:IVNode|null) {
    let virtualNode:IVNode = new VNode(elm.nodeName, elm, [], "", getVirtualNodeData(instructions)[2], parent, 0, null);
    virtualNode.instructions = instructions;
    parent && parent.elm.removeChild(elm);
    parent && parent.elm.appendChild(document.createTextNode(""));
    let resultSet = analysisInstructions(vm, instructions, elm, parent);
    return virtualNode;
}

function analysisInstructions(vm:IDue, instructions:string, elm:HTMLElement, parent:IVNode|null):HTMLElement[] {
    let insSet:string[] = getVirtualNodeData(instructions);
    let dataSet = getValue(vm._data, insSet[2]);
    if (!dataSet) {
        throw new Error("error");
    }
    let resultSet:HTMLElement[]=[];
    for (let i = 0 ; i < dataSet.length ; i ++) {
        let tempDom:HTMLElement = document.createElement(elm.nodeName);
        tempDom.innerHTML = elm.innerHTML;
        let env:object = analysisKV(insSet[0], dataSet[i], i);
        tempDom.setAttribute("env", JSON.stringify(env));
        parent && parent.elm.appendChild(tempDom);
        resultSet.push(tempDom);
    }
    return resultSet;
}

function getVirtualNodeData(instructions:string):string[] {
    let insSet:string[] = instructions.trim().split(" ");
    if (insSet.length !== 3 || insSet[1] !== "in" && insSet[1] !== "of") {
        throw new Error("error");
    }
    return insSet;
}

function analysisKV(instructions:string, value:any, index:number):object {
    if (/([a-zA-z0-9-_$]+)/.test(instructions)) {//带括号的形式
        instructions = instructions.trim();
        instructions = instructions.substring(1, instructions.length - 1);
    }
    let keys:string[] = instructions.split(",");
    if (keys.length == 0) {
        throw new Error("error");
    }
    let obj:object = {};
    if (keys.length == 1) {
        obj[keys[0].trim()] = value;
    }
    if (keys.length == 2) {
        obj[keys[0].trim()] = index;
    }
    return obj;
}