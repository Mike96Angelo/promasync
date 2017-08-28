"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var Task = (function () {
    function Task(task) {
        var self = this;
        self.task = task;
        self.promise = new Promise(function (resolve, reject) {
            self.resolve = resolve;
            self.reject = reject;
        });
    }
    return Task;
}());
var Queue = (function () {
    function Queue(limit, worker) {
        this.started = false;
        this.paused = false;
        this.killed = false;
        this.running = 0;
        this.tasks = [];
        this._saturated = false;
        if (limit < 1) {
            throw new Error('limit must be greater then 0.');
        }
        this.limit = limit;
        this.worker = worker;
    }
    Object.defineProperty(Queue.prototype, "length", {
        get: function () {
            return this.tasks.length + this.running;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Queue.prototype, "idle", {
        get: function () {
            return (this.tasks.length + this.running) === 0;
        },
        enumerable: true,
        configurable: true
    });
    Queue.prototype.status = function () {
        if ((this.tasks.length + this.running) >= 0.75 * this.limit) {
            if (!this._saturated && this.saturated)
                this.saturated();
        }
        else {
            if (this._saturated && this.unsaturated)
                this.unsaturated();
        }
        if (this.tasks.length === 0 && this.running > 0) {
            if (this.empty)
                this.empty();
        }
        if (this.tasks.length === 0 && this.running === 0) {
            if (this.drain)
                this.drain();
        }
    };
    Queue.prototype.runWorker = function (task) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, _b, err_1;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.started = true;
                        this.running++;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, 4, 5]);
                        _b = (_a = task).resolve;
                        return [4, this.worker(task.task)];
                    case 2:
                        _b.apply(_a, [_c.sent()]);
                        return [3, 5];
                    case 3:
                        err_1 = _c.sent();
                        if (this.error)
                            this.error(err_1);
                        task.reject(err_1);
                        return [3, 5];
                    case 4:
                        this.running--;
                        this.status();
                        this.run();
                        return [7];
                    case 5: return [2];
                }
            });
        });
    };
    Queue.prototype.run = function (task, unshift) {
        if (task) {
            if (unshift) {
                this.tasks.unshift(task);
            }
            else {
                this.tasks.push(task);
            }
        }
        while (!this.paused && this.running < this.limit && this.tasks.length > 0) {
            var work = this.tasks.shift();
            if (work) {
                this.runWorker(work);
            }
            else {
                break;
            }
        }
    };
    Queue.prototype.pause = function () {
        this.paused = true;
    };
    Queue.prototype.resume = function () {
        this.paused = false;
        this.run();
    };
    Queue.prototype.add = function (task, unshift) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var awaits, results, task_1, task_1_1, t, work, awaits_1, awaits_1_1, p, _a, _b, e_1_1, work, e_2, _c, e_1, _d;
            return tslib_1.__generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (this.killed) {
                            throw new Error('CANNOT add tasks to the queue after calling Queue.kill().');
                        }
                        if (!Array.isArray(task)) return [3, 9];
                        awaits = [];
                        results = [];
                        try {
                            for (task_1 = tslib_1.__values(task), task_1_1 = task_1.next(); !task_1_1.done; task_1_1 = task_1.next()) {
                                t = task_1_1.value;
                                work = new Task(t);
                                this.run(work, unshift);
                                awaits.push(work.promise);
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (task_1_1 && !task_1_1.done && (_c = task_1["return"])) _c.call(task_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 6, 7, 8]);
                        awaits_1 = tslib_1.__values(awaits), awaits_1_1 = awaits_1.next();
                        _e.label = 2;
                    case 2:
                        if (!!awaits_1_1.done) return [3, 5];
                        p = awaits_1_1.value;
                        _b = (_a = results).push;
                        return [4, p];
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
                            if (awaits_1_1 && !awaits_1_1.done && (_d = awaits_1["return"])) _d.call(awaits_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7];
                    case 8: return [2, results];
                    case 9:
                        work = new Task(task);
                        this.run(work, unshift);
                        return [4, work.promise];
                    case 10: return [2, _e.sent()];
                    case 11: return [2];
                }
            });
        });
    };
    Queue.prototype.push = function (task) {
        return this.add(task, false);
    };
    Queue.prototype.unshift = function (task) {
        return this.add(task, true);
    };
    Queue.prototype.remove = function (test) {
        for (var i = 0; i < this.tasks.length; i++) {
            var task = this.tasks[i];
            if (test(task.task)) {
                this.tasks.splice(i, 1);
                return true;
            }
        }
        return false;
    };
    Queue.prototype.kill = function () {
        this.killed = true;
        this.tasks = [];
    };
    return Queue;
}());
exports.Queue = Queue;
function queue(limit, worker) {
    return new Queue(limit, worker);
}
exports.queue = queue;
