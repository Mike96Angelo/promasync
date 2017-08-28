"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function groupResultBy(arr, iterator) {
    let awaits = [];
    for (let item of arr) {
        awaits.push(iterator(item));
    }
    let results = {};
    for (let i = 0; i < arr.length; i++) {
        let [key, value] = await awaits[i];
        results[key] = results[key] || [];
        results[key].push(value);
    }
    return results;
}
exports.groupResultBy = groupResultBy;
async function groupResultBySeries(arr, iterator) {
    let results = {};
    for (let item of arr) {
        let [key, value] = await await iterator(item);
        results[key] = results[key] || [];
        results[key].push(value);
    }
    return results;
}
exports.groupResultBySeries = groupResultBySeries;
async function groupResultByLimit(limit, arr, iterator) {
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
                let [key, value] = await awaits[j];
                results[key] = results[key] || [];
                results[key].push(value);
            }
            awaits = [];
        }
    }
    return results;
}
exports.groupResultByLimit = groupResultByLimit;
