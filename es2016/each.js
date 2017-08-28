"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function each(arr, iterator) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let awaits = [];
        for (let item of arr) {
            awaits.push(iterator(item));
        }
        for (let item of awaits) {
            yield item;
        }
    });
}
exports.each = each;
function eachSeries(arr, iterator) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        for (let item of arr) {
            yield iterator(item);
        }
    });
}
exports.eachSeries = eachSeries;
function eachLimit(limit, arr, iterator) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (limit < 1) {
            throw new Error('limit must be greater then 0.');
        }
        let awaits = [];
        for (let i = 0; i < arr.length; i++) {
            let item = arr[i];
            awaits.push(iterator(item));
            if (i % limit === 0) {
                for (let item of awaits) {
                    yield item;
                }
                awaits = [];
            }
        }
    });
}
exports.eachLimit = eachLimit;
