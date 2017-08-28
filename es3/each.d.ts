export declare function each<T>(arr: T[], iterator: ((item: T) => Promise<any>)): Promise<void>;
export declare function eachSeries<T>(arr: T[], iterator: ((item: T) => Promise<any>)): Promise<void>;
export declare function eachLimit<T>(limit: number, arr: T[], iterator: ((item: T) => Promise<any>)): Promise<void>;
