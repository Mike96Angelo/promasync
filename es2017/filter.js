"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function filter(arr, iterator) {
    let awaits = [];
    for (let item of arr) {
        awaits.push(iterator(item));
    }
    let results = [];
    for (let i = 0; i < arr.length; i++) {
        if (await awaits[i]) {
            results.push(arr[i]);
        }
    }
    return results;
}
exports.filter = filter;
async function filterSeries(arr, iterator) {
    let results = [];
    for (let i = 0; i < arr.length; i++) {
        if (await iterator(arr[i])) {
            results.push(arr[i]);
        }
    }
    return results;
}
exports.filterSeries = filterSeries;
async function filterLimit(limit, arr, iterator) {
    if (limit < 1) {
        throw new Error('limit must be greater then 0.');
    }
    let awaits = [];
    let results = [];
    for (let i = 0; i < arr.length; i++) {
        awaits.push(iterator(arr[i]));
        if (i % limit === 0) {
            for (let j = 0; j < awaits.length; j++) {
                if (await awaits[j]) {
                    results.push(arr[i - limit + j]);
                }
            }
            awaits = [];
        }
    }
    return results;
}
exports.filterLimit = filterLimit;
