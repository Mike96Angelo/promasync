"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function every(arr, iterator) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let awaits = [];
        for (let item of arr) {
            awaits.push(iterator(item));
        }
        for (let i = 0; i < arr.length; i++) {
            if (!(yield awaits[i])) {
                return false;
            }
        }
        return true;
    });
}
exports.every = every;
function everySeries(arr, iterator) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < arr.length; i++) {
            if (!(yield iterator(arr[i]))) {
                return false;
            }
        }
        return true;
    });
}
exports.everySeries = everySeries;
function everyLimit(limit, arr, iterator) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (limit < 1) {
            throw new Error('limit must be greater then 0.');
        }
        let awaits = [];
        for (let i = 0; i < arr.length; i++) {
            awaits.push(iterator(arr[i]));
            if (i % limit === 0) {
                for (let j = 0; j < awaits.length; j++) {
                    if (!(yield awaits[j])) {
                        return false;
                    }
                }
                awaits = [];
            }
        }
        return true;
    });
}
exports.everyLimit = everyLimit;
