"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function groupBy(arr, iterator) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let awaits = [];
        for (let item of arr) {
            awaits.push(iterator(item));
        }
        let results = {};
        for (let i = 0; i < arr.length; i++) {
            let key = yield awaits[i];
            results[key] = results[key] || [];
            results[key].push(arr[i]);
        }
        return results;
    });
}
exports.groupBy = groupBy;
function groupBySeries(arr, iterator) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let results = {};
        for (let item of arr) {
            let key = yield yield iterator(item);
            results[key] = results[key] || [];
            results[key].push(item);
        }
        return results;
    });
}
exports.groupBySeries = groupBySeries;
function groupByLimit(limit, arr, iterator) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (limit < 1) {
            throw new Error('limit must be greater then 0.');
        }
        let awaits = [];
        let results = {};
        for (let i = 0; i < arr.length; i++) {
            let item = arr[i];
            awaits.push(iterator(item));
            if (i % limit === 0) {
                for (let j = 0; j < awaits.length; j++) {
                    let key = yield awaits[j];
                    results[key] = results[key] || [];
                    results[key].push(arr[i - limit + j]);
                }
                awaits = [];
            }
        }
        return results;
    });
}
exports.groupByLimit = groupByLimit;
