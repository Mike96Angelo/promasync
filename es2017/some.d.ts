export declare function some<T>(arr: T[], iterator: ((item: T) => Promise<boolean>)): Promise<boolean>;
export declare function someSeries<T>(arr: T[], iterator: ((item: T) => Promise<boolean>)): Promise<boolean>;
export declare function someLimit<T>(limit: number, arr: T[], iterator: ((item: T) => Promise<boolean>)): Promise<boolean>;
