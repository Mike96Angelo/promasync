"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function concat(arr, iterator) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let awaits = [];
        for (let item of arr) {
            awaits.push(iterator(item));
        }
        let results = [];
        for (let item of awaits) {
            results = results.concat(yield item);
        }
        return results;
    });
}
exports.concat = concat;
function concatSeries(arr, iterator) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let results = [];
        for (let item of arr) {
            results = results.concat(yield iterator(item));
        }
        return results;
    });
}
exports.concatSeries = concatSeries;
function concatLimit(limit, arr, iterator) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (limit < 1) {
            throw new Error('limit must be greater then 0.');
        }
        let awaits = [];
        let results = [];
        for (let i = 0; i < arr.length; i++) {
            let item = arr[i];
            awaits.push(iterator(item));
            if (i % limit === 0) {
                for (let item of awaits) {
                    results = results.concat(yield item);
                }
                awaits = [];
            }
        }
        return results;
    });
}
exports.concatLimit = concatLimit;
