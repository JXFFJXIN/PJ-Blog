export interface IVNode {
    tag:string,
    elm:HTMLElement,
    children:any,
    text:string,
    data:any,
    parent:any,
    nodeType:number,
    key:number|null,
    env:object,
    instructions:string,
    template:any[]
}

export interface IOptions {
    el:string,
    data:object|any[],
    computed:object,
    created:Function,
    methods:object,
}

export interface IDue {
    _uid:number,
    _isVue:boolean,
    _data:object|any[],
    created:Function,
    _methods:object,
    _computed:object,
    _vnode:IVNode
}

export type TNamespace = string;

export type TDue = {
    (options:IOptions):void
}

export type TArrayProto = {
    eleType:string,
    toString:()=>string,
    push:any,
    pop:any,
    shift:any,
    unshift:any,
}
