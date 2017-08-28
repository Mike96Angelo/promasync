"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function some(arr, iterator) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let awaits = [];
        for (let item of arr) {
            awaits.push(iterator(item));
        }
        for (let i = 0; i < arr.length; i++) {
            if (yield awaits[i]) {
                return true;
            }
        }
        return false;
    });
}
exports.some = some;
function someSeries(arr, iterator) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < arr.length; i++) {
            if (yield iterator(arr[i])) {
                return true;
            }
        }
        return false;
    });
}
exports.someSeries = someSeries;
function someLimit(limit, arr, iterator) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (limit < 1) {
            throw new Error('limit must be greater then 0.');
        }
        let awaits = [];
        for (let i = 0; i < arr.length; i++) {
            awaits.push(iterator(arr[i]));
            if (i % limit === 0) {
                for (let j = 0; j < awaits.length; j++) {
                    if (yield awaits[j]) {
                        return true;
                    }
                }
                awaits = [];
            }
        }
        return false;
    });
}
exports.someLimit = someLimit;
