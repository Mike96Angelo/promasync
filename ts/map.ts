export async function map<T, R>(arr: T[], iterator: ((item: T) => Promise<R>)): Promise<R[]> {
  let awaits: Promise<R>[] = []
  for (let item of arr) {
    awaits.push(iterator(item))
  }

  let results: R[] = []

  for (let item of awaits) {
    results.push(await item)
  }

  return results
}

export async function mapSeries<T, R>(arr: T[], iterator: ((item: T) => Promise<R>)): Promise<R[]> {
  let results: R[] = []

  for (let item of arr) {
    results.push(await iterator(item))
  }

  return results
}

export async function mapLimit<T, R>(limit: number, arr: T[], iterator: ((item: T) => Promise<R>)): Promise<R[]> {
  if (limit < 1) {
    throw new Error('limit must be greater then 0.')
  }

  let awaits: Promise<R>[] = []
  let results: R[] = []

  for (let i = 0; i < arr.length; i++) {
    let item = arr[i]
    awaits.push(iterator(item))

    if (i % limit === 0) {
      for (let item of awaits) {
        results.push(await item)
      }

      awaits = []
    }
  }

  return results
}
