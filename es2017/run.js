"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function run(tasks) {
    let awaits = [];
    for (let task of tasks) {
        awaits.push(task());
    }
    let results = [];
    for (let item of awaits) {
        results.push(await item);
    }
    return results;
}
exports.run = run;
async function runSeries(tasks) {
    let results = [];
    for (let task of tasks) {
        results.push(await task());
    }
    return results;
}
exports.runSeries = runSeries;
async function runLimit(limit, tasks) {
    if (limit < 1) {
        throw new Error('limit must be greater then 0.');
    }
    let awaits = [];
    let results = [];
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        awaits.push(task());
        if (i % limit === 0) {
            for (let item of awaits) {
                results.push(await item);
            }
            awaits = [];
        }
    }
    return results;
}
exports.runLimit = runLimit;
