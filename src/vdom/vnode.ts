
import { IVNode } from '../interface/index.js'

export default class VNode implements IVNode {
    constructor(
        public tag: string,
        public elm: HTMLElement,
        public children: any,
        public text: string,
        public data: any,
        public parent: any,
        public nodeType: number,
        public key: number | null,
        public env:object = {},
        public instructions:string="",
        public template:any[] = []
    ) {}
    
}