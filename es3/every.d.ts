export declare function every<T>(arr: T[], iterator: ((item: T) => Promise<boolean>)): Promise<boolean>;
export declare function everySeries<T>(arr: T[], iterator: ((item: T) => Promise<boolean>)): Promise<boolean>;
export declare function everyLimit<T>(limit: number, arr: T[], iterator: ((item: T) => Promise<boolean>)): Promise<boolean>;
