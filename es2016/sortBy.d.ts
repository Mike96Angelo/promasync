export declare function sortBy<T, C>(arr: T[], iterator: ((item: T) => Promise<C>)): Promise<T[]>;
export declare function sortBySeries<T, C>(arr: T[], iterator: ((item: T) => Promise<C>)): Promise<T[]>;
export declare function sortByLimit<T, C>(limit: number, arr: T[], iterator: ((item: T) => Promise<C>)): Promise<T[]>;
