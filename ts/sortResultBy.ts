
function sort<C, R>(a: {criteria: C, value: R}, b: {criteria: C, value: R}) {
  return a.criteria < b.criteria ? -1 : a.criteria > b.criteria ? 1 : 0
}

export async function sortResultBy<T, C, R>(arr: T[], iterator: ((item: T) => Promise<[C, R]>)): Promise<R[]> {
  let awaits: Promise<[C, R]>[] = []
  for (let item of arr) {
    awaits.push(iterator(item))
  }

  let results: {criteria: C, value: R}[] = []

  for (let item of awaits) {
    let [criteria, value] = await item
    results.push({criteria, value})
  }

  return results.sort(sort).map(item => item.value)
}

export async function sortResultBySeries<T, C, R>(arr: T[], iterator: ((item: T) => Promise<[C, R]>)): Promise<R[]> {
  let results: {criteria: C, value: R}[] = []

  for (let item of arr) {
    let [criteria, value] = await iterator(item)
    results.push({criteria, value})
  }

  return results.sort(sort).map(item => item.value)
}

export async function sortResultByLimit<T, C, R>(limit: number, arr: T[], iterator: ((item: T) => Promise<[C, R]>)): Promise<R[]> {
  if (limit < 1) {
    throw new Error('limit must be greater then 0.')
  }

  let awaits: Promise<[C, R]>[] = []
  let results: {criteria: C, value: R}[] = []

  for (let i = 0; i < arr.length; i++) {
    let item = arr[i]
    awaits.push(iterator(item))

    if (i % limit === 0) {
      for (let item of awaits) {
        let [criteria, value] = await item
        results.push({criteria, value})
      }

      awaits = []
    }
  }

  return results.sort(sort).map(item => item.value)
}
