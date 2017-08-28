"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
function sort(a, b) {
    return a.criteria < b.criteria ? -1 : a.criteria > b.criteria ? 1 : 0;
}
function sortBy(arr, iterator) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var awaits, arr_1, arr_1_1, item, results, i, _a, _b, _c, e_1, _d;
        return tslib_1.__generator(this, function (_e) {
            switch (_e.label) {
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
                            if (arr_1_1 && !arr_1_1.done && (_d = arr_1.return)) _d.call(arr_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    results = [];
                    i = 0;
                    _e.label = 1;
                case 1:
                    if (!(i < arr.length)) return [3, 4];
                    _b = (_a = results).push;
                    _c = {};
                    return [4, awaits[i]];
                case 2:
                    _b.apply(_a, [(_c.criteria = _e.sent(),
                            _c.value = arr[i],
                            _c)]);
                    _e.label = 3;
                case 3:
                    i++;
                    return [3, 1];
                case 4: return [2, results.sort(sort).map(function (item) { return item.value; })];
            }
        });
    });
}
exports.sortBy = sortBy;
function sortBySeries(arr, iterator) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var results, arr_2, arr_2_1, item, _a, _b, _c, e_2_1, e_2, _d;
        return tslib_1.__generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    results = [];
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 6, 7, 8]);
                    arr_2 = tslib_1.__values(arr), arr_2_1 = arr_2.next();
                    _e.label = 2;
                case 2:
                    if (!!arr_2_1.done) return [3, 5];
                    item = arr_2_1.value;
                    _b = (_a = results).push;
                    _c = {};
                    return [4, iterator(item)];
                case 3:
                    _b.apply(_a, [(_c.criteria = _e.sent(),
                            _c.value = item,
                            _c)]);
                    _e.label = 4;
                case 4:
                    arr_2_1 = arr_2.next();
                    return [3, 2];
                case 5: return [3, 8];
                case 6:
                    e_2_1 = _e.sent();
                    e_2 = { error: e_2_1 };
                    return [3, 8];
                case 7:
                    try {
                        if (arr_2_1 && !arr_2_1.done && (_d = arr_2.return)) _d.call(arr_2);
                    }
                    finally { if (e_2) throw e_2.error; }
                    return [7];
                case 8: return [2, results.sort(sort).map(function (item) { return item.value; })];
            }
        });
    });
}
exports.sortBySeries = sortBySeries;
function sortByLimit(limit, arr, iterator) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var awaits, results, i, item, j, _a, _b, _c;
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
                    if (!(i < arr.length)) return [3, 7];
                    item = arr[i];
                    awaits.push(iterator(item));
                    if (!(i % limit === 0)) return [3, 6];
                    j = 0;
                    _d.label = 2;
                case 2:
                    if (!(j < awaits.length)) return [3, 5];
                    _b = (_a = results).push;
                    _c = {};
                    return [4, awaits[j]];
                case 3:
                    _b.apply(_a, [(_c.criteria = _d.sent(),
                            _c.value = arr[i - limit + j],
                            _c)]);
                    _d.label = 4;
                case 4:
                    j++;
                    return [3, 2];
                case 5:
                    awaits = [];
                    _d.label = 6;
                case 6:
                    i++;
                    return [3, 1];
                case 7: return [2, results.sort(sort).map(function (item) { return item.value; })];
            }
        });
    });
}
exports.sortByLimit = sortByLimit;
