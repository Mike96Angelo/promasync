export declare function sortResultBy<T, C, R>(arr: T[], iterator: ((item: T) => Promise<[C, R]>)): Promise<R[]>;
export declare function sortResultBySeries<T, C, R>(arr: T[], iterator: ((item: T) => Promise<[C, R]>)): Promise<R[]>;
export declare function sortResultByLimit<T, C, R>(limit: number, arr: T[], iterator: ((item: T) => Promise<[C, R]>)): Promise<R[]>;
