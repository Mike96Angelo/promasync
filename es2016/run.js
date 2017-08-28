"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function run(tasks) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let awaits = [];
        for (let task of tasks) {
            awaits.push(task());
        }
        let results = [];
        for (let item of awaits) {
            results.push(yield item);
        }
        return results;
    });
}
exports.run = run;
function runSeries(tasks) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let results = [];
        for (let task of tasks) {
            results.push(yield task());
        }
        return results;
    });
}
exports.runSeries = runSeries;
function runLimit(limit, tasks) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
                    results.push(yield item);
                }
                awaits = [];
            }
        }
        return results;
    });
}
exports.runLimit = runLimit;
