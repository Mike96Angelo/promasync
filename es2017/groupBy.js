"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function groupBy(arr, iterator) {
    let awaits = [];
    for (let item of arr) {
        awaits.push(iterator(item));
    }
    let results = {};
    for (let i = 0; i < arr.length; i++) {
        let key = await awaits[i];
        results[key] = results[key] || [];
        results[key].push(arr[i]);
    }
    return results;
}
exports.groupBy = groupBy;
async function groupBySeries(arr, iterator) {
    let results = {};
    for (let item of arr) {
        let key = await await iterator(item);
        results[key] = results[key] || [];
        results[key].push(item);
    }
    return results;
}
exports.groupBySeries = groupBySeries;
async function groupByLimit(limit, arr, iterator) {
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
                let key = await awaits[j];
                results[key] = results[key] || [];
                results[key].push(arr[i - limit + j]);
            }
            awaits = [];
        }
    }
    return results;
}
exports.groupByLimit = groupByLimit;
