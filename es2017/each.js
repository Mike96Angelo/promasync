"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function each(arr, iterator) {
    let awaits = [];
    for (let item of arr) {
        awaits.push(iterator(item));
    }
    for (let item of awaits) {
        await item;
    }
}
exports.each = each;
async function eachSeries(arr, iterator) {
    for (let item of arr) {
        await iterator(item);
    }
}
exports.eachSeries = eachSeries;
async function eachLimit(limit, arr, iterator) {
    if (limit < 1) {
        throw new Error('limit must be greater then 0.');
    }
    let awaits = [];
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        awaits.push(iterator(item));
        if (i % limit === 0) {
            for (let item of awaits) {
                await item;
            }
            awaits = [];
        }
    }
}
exports.eachLimit = eachLimit;
