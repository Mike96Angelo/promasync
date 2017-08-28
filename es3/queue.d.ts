export declare class Queue<T, R> {
    limit: number;
    private worker;
    started: boolean;
    paused: boolean;
    killed: boolean;
    running: number;
    private tasks;
    private _saturated;
    saturated?: () => void;
    unsaturated?: () => void;
    empty?: () => void;
    drain?: () => void;
    error?: (err: any) => void;
    constructor(limit: number, worker: ((task: T) => Promise<R>));
    readonly length: number;
    readonly idle: boolean;
    private status();
    private runWorker(task);
    private run(task?, unshift?);
    pause(): void;
    resume(): void;
    private add(task, unshift);
    push(task: T | T[]): Promise<R | R[]>;
    unshift(task: T | T[]): Promise<R | R[]>;
    remove(test: ((task: T) => boolean)): boolean;
    kill(): void;
}
export declare function queue<T, R>(limit: number, worker: ((task: T) => Promise<R>)): Queue<T, R>;
