export declare function groupBy<T>(arr: T[], iterator: ((item: T) => Promise<string>)): Promise<{
    [key: string]: T[];
}>;
export declare function groupBySeries<T>(arr: T[], iterator: ((item: T) => Promise<string>)): Promise<{
    [key: string]: T[];
}>;
export declare function groupByLimit<T>(limit: number, arr: T[], iterator: ((item: T) => Promise<string>)): Promise<{
    [key: string]: T[];
}>;
