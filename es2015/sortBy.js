"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function sort(a, b) {
    return a.criteria < b.criteria ? -1 : a.criteria > b.criteria ? 1 : 0;
}
function sortBy(arr, iterator) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let awaits = [];
        for (let item of arr) {
            awaits.push(iterator(item));
        }
        let results = [];
        for (let i = 0; i < arr.length; i++) {
            results.push({
                criteria: yield awaits[i],
                value: arr[i]
            });
        }
        return results.sort(sort).map(item => item.value);
    });
}
exports.sortBy = sortBy;
function sortBySeries(arr, iterator) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let results = [];
        for (let item of arr) {
            results.push({
                criteria: yield iterator(item),
                value: item
            });
        }
        return results.sort(sort).map(item => item.value);
    });
}
exports.sortBySeries = sortBySeries;
function sortByLimit(limit, arr, iterator) {
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
                for (let j = 0; j < awaits.length; j++) {
                    results.push({
                        criteria: yield awaits[j],
                        value: arr[i - limit + j]
                    });
                }
                awaits = [];
            }
        }
        return results.sort(sort).map(item => item.value);
    });
}
exports.sortByLimit = sortByLimit;
