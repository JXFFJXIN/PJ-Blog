import { setValue } from "../../util/ObjectUtil.js";
export function vmodel(vm, elm, data) {
    elm.onchange = function (event) {
        setValue(vm._data, data, event.target.value);
    };
    elm.oninput = function (event) {
        setValue(vm._data, data, event.target.value);
    };
}
