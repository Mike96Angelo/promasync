"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function some(arr, iterator) {
    let awaits = [];
    for (let item of arr) {
        awaits.push(iterator(item));
    }
    for (let i = 0; i < arr.length; i++) {
        if (await awaits[i]) {
            return true;
        }
    }
    return false;
}
exports.some = some;
async function someSeries(arr, iterator) {
    for (let i = 0; i < arr.length; i++) {
        if (await iterator(arr[i])) {
            return true;
        }
    }
    return false;
}
exports.someSeries = someSeries;
async function someLimit(limit, arr, iterator) {
    if (limit < 1) {
        throw new Error('limit must be greater then 0.');
    }
    let awaits = [];
    for (let i = 0; i < arr.length; i++) {
        awaits.push(iterator(arr[i]));
        if (i % limit === 0) {
            for (let j = 0; j < awaits.length; j++) {
                if (await awaits[j]) {
                    return true;
                }
            }
            awaits = [];
        }
    }
    return false;
}
exports.someLimit = someLimit;
