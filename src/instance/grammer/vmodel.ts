import { IDue} from "../../interface/index.js";
import {setValue} from "../../util/ObjectUtil.js";

export function vmodel(vm:IDue, elm:HTMLElement, data:string) {
    elm.onchange = function (event:any) {
        setValue(vm._data, data, event.target.value);
    }
    elm.oninput = function (event:any) {
        setValue(vm._data, data, event.target.value);
    }
}