"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sort(a, b) {
    return a.criteria < b.criteria ? -1 : a.criteria > b.criteria ? 1 : 0;
}
async function sortResultBy(arr, iterator) {
    let awaits = [];
    for (let item of arr) {
        awaits.push(iterator(item));
    }
    let results = [];
    for (let item of awaits) {
        let [criteria, value] = await item;
        results.push({ criteria, value });
    }
    return results.sort(sort).map(item => item.value);
}
exports.sortResultBy = sortResultBy;
async function sortResultBySeries(arr, iterator) {
    let results = [];
    for (let item of arr) {
        let [criteria, value] = await iterator(item);
        results.push({ criteria, value });
    }
    return results.sort(sort).map(item => item.value);
}
exports.sortResultBySeries = sortResultBySeries;
async function sortResultByLimit(limit, arr, iterator) {
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
                let [criteria, value] = await item;
                results.push({ criteria, value });
            }
            awaits = [];
        }
    }
    return results.sort(sort).map(item => item.value);
}
exports.sortResultByLimit = sortResultByLimit;
