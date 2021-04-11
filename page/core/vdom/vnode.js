export default class VNode {
    constructor(tag, elm, children, text, data, parent, nodeType, key, env = {}, instructions = "", template = []) {
        this.tag = tag;
        this.elm = elm;
        this.children = children;
        this.text = text;
        this.data = data;
        this.parent = parent;
        this.nodeType = nodeType;
        this.key = key;
        this.env = env;
        this.instructions = instructions;
        this.template = template;
    }
}
