"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
function run(tasks) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var awaits, tasks_1, tasks_1_1, task, results, awaits_1, awaits_1_1, item, _a, _b, e_1_1, e_2, _c, e_1, _d;
        return tslib_1.__generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    awaits = [];
                    try {
                        for (tasks_1 = tslib_1.__values(tasks), tasks_1_1 = tasks_1.next(); !tasks_1_1.done; tasks_1_1 = tasks_1.next()) {
                            task = tasks_1_1.value;
                            awaits.push(task());
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (tasks_1_1 && !tasks_1_1.done && (_c = tasks_1.return)) _c.call(tasks_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    results = [];
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 6, 7, 8]);
                    awaits_1 = tslib_1.__values(awaits), awaits_1_1 = awaits_1.next();
                    _e.label = 2;
                case 2:
                    if (!!awaits_1_1.done) return [3, 5];
                    item = awaits_1_1.value;
                    _b = (_a = results).push;
                    return [4, item];
                case 3:
                    _b.apply(_a, [_e.sent()]);
                    _e.label = 4;
                case 4:
                    awaits_1_1 = awaits_1.next();
                    return [3, 2];
                case 5: return [3, 8];
                case 6:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3, 8];
                case 7:
                    try {
                        if (awaits_1_1 && !awaits_1_1.done && (_d = awaits_1.return)) _d.call(awaits_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7];
                case 8: return [2, results];
            }
        });
    });
}
exports.run = run;
function runSeries(tasks) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var results, tasks_2, tasks_2_1, task, _a, _b, e_3_1, e_3, _c;
        return tslib_1.__generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    results = [];
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 6, 7, 8]);
                    tasks_2 = tslib_1.__values(tasks), tasks_2_1 = tasks_2.next();
                    _d.label = 2;
                case 2:
                    if (!!tasks_2_1.done) return [3, 5];
                    task = tasks_2_1.value;
                    _b = (_a = results).push;
                    return [4, task()];
                case 3:
                    _b.apply(_a, [_d.sent()]);
                    _d.label = 4;
                case 4:
                    tasks_2_1 = tasks_2.next();
                    return [3, 2];
                case 5: return [3, 8];
                case 6:
                    e_3_1 = _d.sent();
                    e_3 = { error: e_3_1 };
                    return [3, 8];
                case 7:
                    try {
                        if (tasks_2_1 && !tasks_2_1.done && (_c = tasks_2.return)) _c.call(tasks_2);
                    }
                    finally { if (e_3) throw e_3.error; }
                    return [7];
                case 8: return [2, results];
            }
        });
    });
}
exports.runSeries = runSeries;
function runLimit(limit, tasks) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var awaits, results, i, task, awaits_2, awaits_2_1, item, _a, _b, e_4_1, e_4, _c;
        return tslib_1.__generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (limit < 1) {
                        throw new Error('limit must be greater then 0.');
                    }
                    awaits = [];
                    results = [];
                    i = 0;
                    _d.label = 1;
                case 1:
                    if (!(i < tasks.length)) return [3, 11];
                    task = tasks[i];
                    awaits.push(task());
                    if (!(i % limit === 0)) return [3, 10];
                    _d.label = 2;
                case 2:
                    _d.trys.push([2, 7, 8, 9]);
                    awaits_2 = tslib_1.__values(awaits), awaits_2_1 = awaits_2.next();
                    _d.label = 3;
                case 3:
                    if (!!awaits_2_1.done) return [3, 6];
                    item = awaits_2_1.value;
                    _b = (_a = results).push;
                    return [4, item];
                case 4:
                    _b.apply(_a, [_d.sent()]);
                    _d.label = 5;
                case 5:
                    awaits_2_1 = awaits_2.next();
                    return [3, 3];
                case 6: return [3, 9];
                case 7:
                    e_4_1 = _d.sent();
                    e_4 = { error: e_4_1 };
                    return [3, 9];
                case 8:
                    try {
                        if (awaits_2_1 && !awaits_2_1.done && (_c = awaits_2.return)) _c.call(awaits_2);
                    }
                    finally { if (e_4) throw e_4.error; }
                    return [7];
                case 9:
                    awaits = [];
                    _d.label = 10;
                case 10:
                    i++;
                    return [3, 1];
                case 11: return [2, results];
            }
        });
    });
}
exports.runLimit = runLimit;
