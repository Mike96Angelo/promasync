export async function run<R>(tasks: (() => Promise<R>)[]): Promise<R[]> {
  let awaits: Promise<R>[] = []
  for (let task of tasks) {
    awaits.push(task())
  }

  let results: R[] = []

  for (let item of awaits) {
    results.push(await item)
  }

  return results
}

export async function runSeries<R>(tasks: (() => Promise<R>)[]): Promise<R[]> {
  let results: R[] = []

  for (let task of tasks) {
    results.push(await task())
  }

  return results
}

export async function runLimit<R>(limit: number, tasks: (() => Promise<R>)[]): Promise<R[]> {
  if (limit < 1) {
    throw new Error('limit must be greater then 0.')
  }

  let awaits: Promise<R>[] = []
  let results: R[] = []

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
