export declare function filter<T>(arr: T[], iterator: ((item: T) => Promise<boolean>)): Promise<T[]>;
export declare function filterSeries<T>(arr: T[], iterator: ((item: T) => Promise<boolean>)): Promise<T[]>;
export declare function filterLimit<T>(limit: number, arr: T[], iterator: ((item: T) => Promise<boolean>)): Promise<T[]>;
