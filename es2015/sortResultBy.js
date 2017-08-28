"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function sort(a, b) {
    return a.criteria < b.criteria ? -1 : a.criteria > b.criteria ? 1 : 0;
}
function sortResultBy(arr, iterator) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let awaits = [];
        for (let item of arr) {
            awaits.push(iterator(item));
        }
        let results = [];
        for (let item of awaits) {
            let [criteria, value] = yield item;
            results.push({ criteria, value });
        }
        return results.sort(sort).map(item => item.value);
    });
}
exports.sortResultBy = sortResultBy;
function sortResultBySeries(arr, iterator) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let results = [];
        for (let item of arr) {
            let [criteria, value] = yield iterator(item);
            results.push({ criteria, value });
        }
        return results.sort(sort).map(item => item.value);
    });
}
exports.sortResultBySeries = sortResultBySeries;
function sortResultByLimit(limit, arr, iterator) {
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
                    let [criteria, value] = yield item;
                    results.push({ criteria, value });
                }
                awaits = [];
            }
        }
        return results.sort(sort).map(item => item.value);
    });
}
exports.sortResultByLimit = sortResultByLimit;
