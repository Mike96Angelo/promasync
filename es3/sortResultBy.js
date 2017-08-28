"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
function sort(a, b) {
    return a.criteria < b.criteria ? -1 : a.criteria > b.criteria ? 1 : 0;
}
function sortResultBy(arr, iterator) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var awaits, arr_1, arr_1_1, item, results, awaits_1, awaits_1_1, item, _a, criteria, value, e_1_1, e_2, _b, e_1, _c;
        return tslib_1.__generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    awaits = [];
                    try {
                        for (arr_1 = tslib_1.__values(arr), arr_1_1 = arr_1.next(); !arr_1_1.done; arr_1_1 = arr_1.next()) {
                            item = arr_1_1.value;
                            awaits.push(iterator(item));
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (arr_1_1 && !arr_1_1.done && (_b = arr_1["return"])) _b.call(arr_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    results = [];
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 6, 7, 8]);
                    awaits_1 = tslib_1.__values(awaits), awaits_1_1 = awaits_1.next();
                    _d.label = 2;
                case 2:
                    if (!!awaits_1_1.done) return [3, 5];
                    item = awaits_1_1.value;
                    return [4, item];
                case 3:
                    _a = tslib_1.__read.apply(void 0, [_d.sent(), 2]), criteria = _a[0], value = _a[1];
                    results.push({ criteria: criteria, value: value });
                    _d.label = 4;
                case 4:
                    awaits_1_1 = awaits_1.next();
                    return [3, 2];
                case 5: return [3, 8];
                case 6:
                    e_1_1 = _d.sent();
                    e_1 = { error: e_1_1 };
                    return [3, 8];
                case 7:
                    try {
                        if (awaits_1_1 && !awaits_1_1.done && (_c = awaits_1["return"])) _c.call(awaits_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7];
                case 8: return [2, results.sort(sort).map(function (item) { return item.value; })];
            }
        });
    });
}
exports.sortResultBy = sortResultBy;
function sortResultBySeries(arr, iterator) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var results, arr_2, arr_2_1, item, _a, criteria, value, e_3_1, e_3, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    results = [];
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 6, 7, 8]);
                    arr_2 = tslib_1.__values(arr), arr_2_1 = arr_2.next();
                    _c.label = 2;
                case 2:
                    if (!!arr_2_1.done) return [3, 5];
                    item = arr_2_1.value;
                    return [4, iterator(item)];
                case 3:
                    _a = tslib_1.__read.apply(void 0, [_c.sent(), 2]), criteria = _a[0], value = _a[1];
                    results.push({ criteria: criteria, value: value });
                    _c.label = 4;
                case 4:
                    arr_2_1 = arr_2.next();
                    return [3, 2];
                case 5: return [3, 8];
                case 6:
                    e_3_1 = _c.sent();
                    e_3 = { error: e_3_1 };
                    return [3, 8];
                case 7:
                    try {
                        if (arr_2_1 && !arr_2_1.done && (_b = arr_2["return"])) _b.call(arr_2);
                    }
                    finally { if (e_3) throw e_3.error; }
                    return [7];
                case 8: return [2, results.sort(sort).map(function (item) { return item.value; })];
            }
        });
    });
}
exports.sortResultBySeries = sortResultBySeries;
function sortResultByLimit(limit, arr, iterator) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var awaits, results, i, item, awaits_2, awaits_2_1, item_1, _a, criteria, value, e_4_1, e_4, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (limit < 1) {
                        throw new Error('limit must be greater then 0.');
                    }
                    awaits = [];
                    results = [];
                    i = 0;
                    _c.label = 1;
                case 1:
                    if (!(i < arr.length)) return [3, 11];
                    item = arr[i];
                    awaits.push(iterator(item));
                    if (!(i % limit === 0)) return [3, 10];
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 7, 8, 9]);
                    awaits_2 = tslib_1.__values(awaits), awaits_2_1 = awaits_2.next();
                    _c.label = 3;
                case 3:
                    if (!!awaits_2_1.done) return [3, 6];
                    item_1 = awaits_2_1.value;
                    return [4, item_1];
                case 4:
                    _a = tslib_1.__read.apply(void 0, [_c.sent(), 2]), criteria = _a[0], value = _a[1];
                    results.push({ criteria: criteria, value: value });
                    _c.label = 5;
                case 5:
                    awaits_2_1 = awaits_2.next();
                    return [3, 3];
                case 6: return [3, 9];
                case 7:
                    e_4_1 = _c.sent();
                    e_4 = { error: e_4_1 };
                    return [3, 9];
                case 8:
                    try {
                        if (awaits_2_1 && !awaits_2_1.done && (_b = awaits_2["return"])) _b.call(awaits_2);
                    }
                    finally { if (e_4) throw e_4.error; }
                    return [7];
                case 9:
                    awaits = [];
                    _c.label = 10;
                case 10:
                    i++;
                    return [3, 1];
                case 11: return [2, results.sort(sort).map(function (item) { return item.value; })];
            }
        });
    });
}
exports.sortResultByLimit = sortResultByLimit;
