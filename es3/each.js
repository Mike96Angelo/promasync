"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
function each(arr, iterator) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var awaits, arr_1, arr_1_1, item, awaits_1, awaits_1_1, item, e_1_1, e_2, _a, e_1, _b;
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
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (arr_1_1 && !arr_1_1.done && (_a = arr_1["return"])) _a.call(arr_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 6, 7, 8]);
                    awaits_1 = tslib_1.__values(awaits), awaits_1_1 = awaits_1.next();
                    _c.label = 2;
                case 2:
                    if (!!awaits_1_1.done) return [3, 5];
                    item = awaits_1_1.value;
                    return [4, item];
                case 3:
                    _c.sent();
                    _c.label = 4;
                case 4:
                    awaits_1_1 = awaits_1.next();
                    return [3, 2];
                case 5: return [3, 8];
                case 6:
                    e_1_1 = _c.sent();
                    e_1 = { error: e_1_1 };
                    return [3, 8];
                case 7:
                    try {
                        if (awaits_1_1 && !awaits_1_1.done && (_b = awaits_1["return"])) _b.call(awaits_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7];
                case 8: return [2];
            }
        });
    });
}
exports.each = each;
function eachSeries(arr, iterator) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var arr_2, arr_2_1, item, e_3_1, e_3, _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, 6, 7]);
                    arr_2 = tslib_1.__values(arr), arr_2_1 = arr_2.next();
                    _b.label = 1;
                case 1:
                    if (!!arr_2_1.done) return [3, 4];
                    item = arr_2_1.value;
                    return [4, iterator(item)];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3:
                    arr_2_1 = arr_2.next();
                    return [3, 1];
                case 4: return [3, 7];
                case 5:
                    e_3_1 = _b.sent();
                    e_3 = { error: e_3_1 };
                    return [3, 7];
                case 6:
                    try {
                        if (arr_2_1 && !arr_2_1.done && (_a = arr_2["return"])) _a.call(arr_2);
                    }
                    finally { if (e_3) throw e_3.error; }
                    return [7];
                case 7: return [2];
            }
        });
    });
}
exports.eachSeries = eachSeries;
function eachLimit(limit, arr, iterator) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var awaits, i, item, awaits_2, awaits_2_1, item_1, e_4_1, e_4, _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (limit < 1) {
                        throw new Error('limit must be greater then 0.');
                    }
                    awaits = [];
                    i = 0;
                    _b.label = 1;
                case 1:
                    if (!(i < arr.length)) return [3, 11];
                    item = arr[i];
                    awaits.push(iterator(item));
                    if (!(i % limit === 0)) return [3, 10];
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 7, 8, 9]);
                    awaits_2 = tslib_1.__values(awaits), awaits_2_1 = awaits_2.next();
                    _b.label = 3;
                case 3:
                    if (!!awaits_2_1.done) return [3, 6];
                    item_1 = awaits_2_1.value;
                    return [4, item_1];
                case 4:
                    _b.sent();
                    _b.label = 5;
                case 5:
                    awaits_2_1 = awaits_2.next();
                    return [3, 3];
                case 6: return [3, 9];
                case 7:
                    e_4_1 = _b.sent();
                    e_4 = { error: e_4_1 };
                    return [3, 9];
                case 8:
                    try {
                        if (awaits_2_1 && !awaits_2_1.done && (_a = awaits_2["return"])) _a.call(awaits_2);
                    }
                    finally { if (e_4) throw e_4.error; }
                    return [7];
                case 9:
                    awaits = [];
                    _b.label = 10;
                case 10:
                    i++;
                    return [3, 1];
                case 11: return [2];
            }
        });
    });
}
exports.eachLimit = eachLimit;
