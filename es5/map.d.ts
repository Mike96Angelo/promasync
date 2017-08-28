export declare function map<T, R>(arr: T[], iterator: ((item: T) => Promise<R>)): Promise<R[]>;
export declare function mapSeries<T, R>(arr: T[], iterator: ((item: T) => Promise<R>)): Promise<R[]>;
export declare function mapLimit<T, R>(limit: number, arr: T[], iterator: ((item: T) => Promise<R>)): Promise<R[]>;
