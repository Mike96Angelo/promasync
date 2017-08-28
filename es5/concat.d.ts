export declare function concat<T, R>(arr: T[], iterator: ((item: T) => Promise<R[]>)): Promise<R[]>;
export declare function concatSeries<T, R>(arr: T[], iterator: ((item: T) => Promise<R[]>)): Promise<R[]>;
export declare function concatLimit<T, R>(limit: number, arr: T[], iterator: ((item: T) => Promise<R[]>)): Promise<R[]>;
