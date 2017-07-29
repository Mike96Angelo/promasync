export type IteratorResult<T> = Promise<T>
export type IteratorResults<T> = Promise<T[]>
export type Iterator<T> = (item: T) => IteratorResult<T>

export type TaskResult<T> = Promise<T>
export type TaskResults<T> = Promise<T[]>
export type Task<T> = () => TaskResult<T>
