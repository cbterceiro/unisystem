"use strict";
exports.__esModule = true;
function markFormGroupDirty(formGroup) {
    Object.values(formGroup.controls).forEach(function (control) {
        control.markAsDirty();
        if (control.controls) {
            control.controls.forEach(function (c) { return markFormGroupDirty(c); });
        }
    });
}
exports.markFormGroupDirty = markFormGroupDirty;
function delay(fn, timeout) {
    return setTimeout(fn, timeout || 0);
}
exports.delay = delay;
