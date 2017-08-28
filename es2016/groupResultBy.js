"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function groupResultBy(arr, iterator) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let awaits = [];
        for (let item of arr) {
            awaits.push(iterator(item));
        }
        let results = {};
        for (let i = 0; i < arr.length; i++) {
            let [key, value] = yield awaits[i];
            results[key] = results[key] || [];
            results[key].push(value);
        }
        return results;
    });
}
exports.groupResultBy = groupResultBy;
function groupResultBySeries(arr, iterator) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let results = {};
        for (let item of arr) {
            let [key, value] = yield yield iterator(item);
            results[key] = results[key] || [];
            results[key].push(value);
        }
        return results;
    });
}
exports.groupResultBySeries = groupResultBySeries;
function groupResultByLimit(limit, arr, iterator) {
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
                    let [key, value] = yield awaits[j];
                    results[key] = results[key] || [];
                    results[key].push(value);
                }
                awaits = [];
            }
        }
        return results;
    });
}
exports.groupResultByLimit = groupResultByLimit;
