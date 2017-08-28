"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
function filter(arr, iterator) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var awaits, arr_1, arr_1_1, item, results, i, e_1, _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    awaits = [];
                    try {
                        for (arr_1 = tslib_1.__values(arr), arr_1_1 = arr_1.next(); !arr_1_1.done; arr_1_1 = arr_1.next()) {
                            item = arr_1_1.value;
                            awaits.push(iterator(item));
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (arr_1_1 && !arr_1_1.done && (_a = arr_1["return"])) _a.call(arr_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    results = [];
                    i = 0;
                    _b.label = 1;
                case 1:
                    if (!(i < arr.length)) return [3, 4];
                    return [4, awaits[i]];
                case 2:
                    if (_b.sent()) {
                        results.push(arr[i]);
                    }
                    _b.label = 3;
                case 3:
                    i++;
                    return [3, 1];
                case 4: return [2, results];
            }
        });
    });
}
exports.filter = filter;
function filterSeries(arr, iterator) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var results, i;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    results = [];
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < arr.length)) return [3, 4];
                    return [4, iterator(arr[i])];
                case 2:
                    if (_a.sent()) {
                        results.push(arr[i]);
                    }
                    _a.label = 3;
                case 3:
                    i++;
                    return [3, 1];
                case 4: return [2, results];
            }
        });
    });
}
exports.filterSeries = filterSeries;
function filterLimit(limit, arr, iterator) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var awaits, results, i, j;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (limit < 1) {
                        throw new Error('limit must be greater then 0.');
                    }
                    awaits = [];
                    results = [];
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < arr.length)) return [3, 7];
                    awaits.push(iterator(arr[i]));
                    if (!(i % limit === 0)) return [3, 6];
                    j = 0;
                    _a.label = 2;
                case 2:
                    if (!(j < awaits.length)) return [3, 5];
                    return [4, awaits[j]];
                case 3:
                    if (_a.sent()) {
                        results.push(arr[i - limit + j]);
                    }
                    _a.label = 4;
                case 4:
                    j++;
                    return [3, 2];
                case 5:
                    awaits = [];
                    _a.label = 6;
                case 6:
                    i++;
                    return [3, 1];
                case 7: return [2, results];
            }
        });
    });
}
exports.filterLimit = filterLimit;
