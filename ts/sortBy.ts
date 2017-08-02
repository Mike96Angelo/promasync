
function sort<C, T>(a: {criteria: C, value: T}, b: {criteria: C, value: T}) {
  return a.criteria < b.criteria ? -1 : a.criteria > b.criteria ? 1 : 0
}

export async function sortBy<T, C>(arr: T[], iterator: ((item: T) => Promise<C>)): Promise<T[]> {
  let awaits: Promise<C>[] = []
  for (let item of arr) {
    awaits.push(iterator(item))
  }

  let results: {criteria: C, value: T}[] = []

  for (let i = 0; i < arr.length; i++) {
    results.push({
      criteria: await awaits[i],
      value: arr[i]
    })
  }

  return results.sort(sort).map(item => item.value)
}

export async function sortBySeries<T, C>(arr: T[], iterator: ((item: T) => Promise<C>)): Promise<T[]> {
  let results: {criteria: C, value: T}[] = []

  for (let item of arr) {
    results.push({
      criteria: await iterator(item),
      value: item
    })
  }

  return results.sort(sort).map(item => item.value)
}

export async function sortByLimit<T, C>(limit: number, arr: T[], iterator: ((item: T) => Promise<C>)): Promise<T[]> {
  if (limit < 1) {
    throw new Error('limit must be greater then 0.')
  }

  let awaits: Promise<C>[] = []
  let results: {criteria: C, value: T}[] = []

  for (let i = 0; i < arr.length; i++) {
    let item = arr[i]
    awaits.push(iterator(item))

    if (i % limit === 0) {
      for (let j = 0; j < awaits.length; j++) {
        results.push({
          criteria: await awaits[j],
          value: arr[i - limit + j]
        })
      }

      awaits = []
    }
  }

  return results.sort(sort).map(item => item.value)
}
