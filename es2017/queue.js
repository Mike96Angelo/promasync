"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Task {
    constructor(task) {
        let self = this;
        self.task = task;
        self.promise = new Promise((resolve, reject) => {
            self.resolve = resolve;
            self.reject = reject;
        });
    }
}
class Queue {
    constructor(limit, worker) {
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
    get length() {
        return this.tasks.length + this.running;
    }
    get idle() {
        return (this.tasks.length + this.running) === 0;
    }
    status() {
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
    }
    async runWorker(task) {
        this.started = true;
        this.running++;
        try {
            task.resolve(await this.worker(task.task));
        }
        catch (err) {
            if (this.error)
                this.error(err);
            task.reject(err);
        }
        finally {
            this.running--;
            this.status();
            this.run();
        }
    }
    run(task, unshift) {
        if (task) {
            if (unshift) {
                this.tasks.unshift(task);
            }
            else {
                this.tasks.push(task);
            }
        }
        while (!this.paused && this.running < this.limit && this.tasks.length > 0) {
            let work = this.tasks.shift();
            if (work) {
                this.runWorker(work);
            }
            else {
                break;
            }
        }
    }
    pause() {
        this.paused = true;
    }
    resume() {
        this.paused = false;
        this.run();
    }
    async add(task, unshift) {
        if (this.killed) {
            throw new Error('CANNOT add tasks to the queue after calling Queue.kill().');
        }
        if (Array.isArray(task)) {
            let awaits = [];
            let results = [];
            for (let t of task) {
                let work = new Task(t);
                this.run(work, unshift);
                awaits.push(work.promise);
            }
            for (let p of awaits) {
                results.push(await p);
            }
            return results;
        }
        else {
            let work = new Task(task);
            this.run(work, unshift);
            return await work.promise;
        }
    }
    push(task) {
        return this.add(task, false);
    }
    unshift(task) {
        return this.add(task, true);
    }
    remove(test) {
        for (let i = 0; i < this.tasks.length; i++) {
            let task = this.tasks[i];
            if (test(task.task)) {
                this.tasks.splice(i, 1);
                return true;
            }
        }
        return false;
    }
    kill() {
        this.killed = true;
        this.tasks = [];
    }
}
exports.Queue = Queue;
function queue(limit, worker) {
    return new Queue(limit, worker);
}
exports.queue = queue;
