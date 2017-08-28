"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function filter(arr, iterator) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let awaits = [];
        for (let item of arr) {
            awaits.push(iterator(item));
        }
        let results = [];
        for (let i = 0; i < arr.length; i++) {
            if (yield awaits[i]) {
                results.push(arr[i]);
            }
        }
        return results;
    });
}
exports.filter = filter;
function filterSeries(arr, iterator) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let results = [];
        for (let i = 0; i < arr.length; i++) {
            if (yield iterator(arr[i])) {
                results.push(arr[i]);
            }
        }
        return results;
    });
}
exports.filterSeries = filterSeries;
function filterLimit(limit, arr, iterator) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (limit < 1) {
            throw new Error('limit must be greater then 0.');
        }
        let awaits = [];
        let results = [];
        for (let i = 0; i < arr.length; i++) {
            awaits.push(iterator(arr[i]));
            if (i % limit === 0) {
                for (let j = 0; j < awaits.length; j++) {
                    if (yield awaits[j]) {
                        results.push(arr[i - limit + j]);
                    }
                }
                awaits = [];
            }
        }
        return results;
    });
}
exports.filterLimit = filterLimit;
