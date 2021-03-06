"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function map(arr, iterator) {
    let awaits = [];
    for (let item of arr) {
        awaits.push(iterator(item));
    }
    let results = [];
    for (let item of awaits) {
        results.push(await item);
    }
    return results;
}
exports.map = map;
async function mapSeries(arr, iterator) {
    let results = [];
    for (let item of arr) {
        results.push(await iterator(item));
    }
    return results;
}
exports.mapSeries = mapSeries;
async function mapLimit(limit, arr, iterator) {
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
                results.push(await item);
            }
            awaits = [];
        }
    }
    return results;
}
exports.mapLimit = mapLimit;
