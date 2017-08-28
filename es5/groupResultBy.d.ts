export declare function groupResultBy<T, R>(arr: T[], iterator: ((item: T) => Promise<[string, R]>)): Promise<{
    [key: string]: R[];
}>;
export declare function groupResultBySeries<T, R>(arr: T[], iterator: ((item: T) => Promise<[string, R]>)): Promise<{
    [key: string]: R[];
}>;
export declare function groupResultByLimit<T, R>(limit: number, arr: T[], iterator: ((item: T) => Promise<[string, R]>)): Promise<{
    [key: string]: R[];
}>;
