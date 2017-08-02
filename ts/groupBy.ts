export async function groupBy<T>(arr: T[], iterator: ((item: T) => Promise<string>)): Promise<{[key: string]: T[]}> {
  let awaits: Promise<string>[] = []
  for (let item of arr) {
    awaits.push(iterator(item))
  }

  let results: {[key: string]: T[]} = {}

  for (let i = 0; i < arr.length; i++) {
    let key = await awaits[i]
    results[key] = results[key] || []

    results[key].push(arr[i])
  }

  return results
}

export async function groupBySeries<T>(arr: T[], iterator: ((item: T) => Promise<string>)): Promise<{[key: string]: T[]}> {
  let results: {[key: string]: T[]} = {}

  for (let item of arr) {

    let key = await await iterator(item)
    results[key] = results[key] || []

    results[key].push(item)
  }

  return results
}

export async function groupByLimit<T>(limit: number, arr: T[], iterator: ((item: T) => Promise<string>)): Promise<{[key: string]: T[]}> {
  if (limit < 1) {
    throw new Error('limit must be greater then 0.')
  }

  let awaits: Promise<string>[] = []
  let results: {[key: string]: T[]} = {}

  for (let i = 0; i < arr.length; i++) {
    let item = arr[i]
    awaits.push(iterator(item))

    if (i % limit === 0) {
      for (let j = 0; j < awaits.length; j++) {
        let key = await awaits[j]
        results[key] = results[key] || []

        results[key].push(arr[i - limit + j])
      }

      awaits = []
    }
  }

  return results
}
