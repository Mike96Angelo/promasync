"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
function groupResultBy(arr, iterator) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var awaits, arr_1, arr_1_1, item, results, i, _a, key, value, e_1, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
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
                            if (arr_1_1 && !arr_1_1.done && (_b = arr_1.return)) _b.call(arr_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    results = {};
                    i = 0;
                    _c.label = 1;
                case 1:
                    if (!(i < arr.length)) return [3, 4];
                    return [4, awaits[i]];
                case 2:
                    _a = tslib_1.__read.apply(void 0, [_c.sent(), 2]), key = _a[0], value = _a[1];
                    results[key] = results[key] || [];
                    results[key].push(value);
                    _c.label = 3;
                case 3:
                    i++;
                    return [3, 1];
                case 4: return [2, results];
            }
        });
    });
}
exports.groupResultBy = groupResultBy;
function groupResultBySeries(arr, iterator) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var results, arr_2, arr_2_1, item, _a, key, value, e_2_1, e_2, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    results = {};
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 7, 8, 9]);
                    arr_2 = tslib_1.__values(arr), arr_2_1 = arr_2.next();
                    _c.label = 2;
                case 2:
                    if (!!arr_2_1.done) return [3, 6];
                    item = arr_2_1.value;
                    return [4, iterator(item)];
                case 3: return [4, _c.sent()];
                case 4:
                    _a = tslib_1.__read.apply(void 0, [_c.sent(), 2]), key = _a[0], value = _a[1];
                    results[key] = results[key] || [];
                    results[key].push(value);
                    _c.label = 5;
                case 5:
                    arr_2_1 = arr_2.next();
                    return [3, 2];
                case 6: return [3, 9];
                case 7:
                    e_2_1 = _c.sent();
                    e_2 = { error: e_2_1 };
                    return [3, 9];
                case 8:
                    try {
                        if (arr_2_1 && !arr_2_1.done && (_b = arr_2.return)) _b.call(arr_2);
                    }
                    finally { if (e_2) throw e_2.error; }
                    return [7];
                case 9: return [2, results];
            }
        });
    });
}
exports.groupResultBySeries = groupResultBySeries;
function groupResultByLimit(limit, arr, iterator) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var awaits, results, i, item, j, _a, key, value;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (limit < 1) {
                        throw new Error('limit must be greater then 0.');
                    }
                    awaits = [];
                    results = {};
                    i = 0;
                    _b.label = 1;
                case 1:
                    if (!(i < arr.length)) return [3, 7];
                    item = arr[i];
                    awaits.push(iterator(item));
                    if (!(i % limit === 0)) return [3, 6];
                    j = 0;
                    _b.label = 2;
                case 2:
                    if (!(j < awaits.length)) return [3, 5];
                    return [4, awaits[j]];
                case 3:
                    _a = tslib_1.__read.apply(void 0, [_b.sent(), 2]), key = _a[0], value = _a[1];
                    results[key] = results[key] || [];
                    results[key].push(value);
                    _b.label = 4;
                case 4:
                    j++;
                    return [3, 2];
                case 5:
                    awaits = [];
                    _b.label = 6;
                case 6:
                    i++;
                    return [3, 1];
                case 7: return [2, results];
            }
        });
    });
}
exports.groupResultByLimit = groupResultByLimit;
