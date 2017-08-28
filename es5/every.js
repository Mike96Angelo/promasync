"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
function every(arr, iterator) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var awaits, arr_1, arr_1_1, item, i, e_1, _a;
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
                            if (arr_1_1 && !arr_1_1.done && (_a = arr_1.return)) _a.call(arr_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    i = 0;
                    _b.label = 1;
                case 1:
                    if (!(i < arr.length)) return [3, 4];
                    return [4, awaits[i]];
                case 2:
                    if (!(_b.sent())) {
                        return [2, false];
                    }
                    _b.label = 3;
                case 3:
                    i++;
                    return [3, 1];
                case 4: return [2, true];
            }
        });
    });
}
exports.every = every;
function everySeries(arr, iterator) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var i;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < arr.length)) return [3, 4];
                    return [4, iterator(arr[i])];
                case 2:
                    if (!(_a.sent())) {
                        return [2, false];
                    }
                    _a.label = 3;
                case 3:
                    i++;
                    return [3, 1];
                case 4: return [2, true];
            }
        });
    });
}
exports.everySeries = everySeries;
function everyLimit(limit, arr, iterator) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var awaits, i, j;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (limit < 1) {
                        throw new Error('limit must be greater then 0.');
                    }
                    awaits = [];
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
                    if (!(_a.sent())) {
                        return [2, false];
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
                case 7: return [2, true];
            }
        });
    });
}
exports.everyLimit = everyLimit;
