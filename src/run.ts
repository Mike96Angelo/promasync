import {Task, TaskResult, TaskResults} from './types'


export async function run<T>(tasks: Task<T>[]): TaskResults<T> {
  let awaits: TaskResult<T>[] = []
  for (let task of tasks) {
    awaits.push(task())
  }

  let results: T[] = []

  for (let item of awaits) {
    results.push(await item)
  }

  return results
}

export async function runSeries<T>(tasks: Task<T>[]): TaskResults<T> {
  let results: T[] = []

  for (let task of tasks) {
    results.push(await task())
  }

  return results
}

export async function runLimit<T>(limit: number, tasks: Task<T>[]): TaskResults<T> {
  if (limit < 1) {
    throw new Error('limit must be greater then 0.')
  }

  let awaits: TaskResult<T>[] = []
  let results: T[] = []

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i]
    awaits.push(task())

    if (i % limit === 0) {
      for (let item of awaits) {
        results.push(await item)
      }

      awaits = []
    }
  }

  return results
}
