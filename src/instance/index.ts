import {initMixin} from "./init.js";
import {renderMixin} from "./render.js";
import { IOptions } from "../interface/index.js"



function Due(options:IOptions){
    this._init(options);
    if (this.created != null) {
        this.created.call(this);
    }
    this._render();
}

initMixin(Due);
renderMixin(Due);

export default Due;