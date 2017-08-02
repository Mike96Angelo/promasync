export async function groupResultBy<T, R>(arr: T[], iterator: ((item: T) => Promise<[string, R]>)): Promise<{[key: string]: R[]}> {
  let awaits: Promise<[string, R]>[] = []
  for (let item of arr) {
    awaits.push(iterator(item))
  }

  let results: {[key: string]: R[]} = {}

  for (let i = 0; i < arr.length; i++) {
    let [key, value] = await awaits[i]
    results[key] = results[key] || []

    results[key].push(value)
  }

  return results
}

export async function groupResultBySeries<T, R>(arr: T[], iterator: ((item: T) => Promise<[string, R]>)): Promise<{[key: string]: R[]}> {
  let results: {[key: string]: R[]} = {}

  for (let item of arr) {

    let [key, value] = await await iterator(item)
    results[key] = results[key] || []

    results[key].push(value)
  }

  return results
}

export async function groupResultByLimit<T, R>(limit: number, arr: T[], iterator: ((item: T) => Promise<[string, R]>)): Promise<{[key: string]: R[]}> {
  if (limit < 1) {
    throw new Error('limit must be greater then 0.')
  }

  let awaits: Promise<[string, R]>[] = []
  let results: {[key: string]: R[]} = {}

  for (let i = 0; i < arr.length; i++) {
    let item = arr[i]
    awaits.push(iterator(item))

    if (i % limit === 0) {
      for (let j = 0; j < awaits.length; j++) {
        let [key, value] = await awaits[j]
        results[key] = results[key] || []

        results[key].push(value)
      }

      awaits = []
    }
  }

  return results
}
