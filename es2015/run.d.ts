export declare function run<R>(tasks: (() => Promise<R>)[]): Promise<R[]>;
export declare function runSeries<R>(tasks: (() => Promise<R>)[]): Promise<R[]>;
export declare function runLimit<R>(limit: number, tasks: (() => Promise<R>)[]): Promise<R[]>;
