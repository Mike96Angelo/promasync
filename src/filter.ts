import {Iterator, IteratorResult, IteratorResults} from './types'


export async function filter<T>(arr: T[], iterator: Iterator<T>): IteratorResults<T> {
  let awaits: IteratorResult<T>[] = []
  for (let item of arr) {
    awaits.push(iterator(item))
  }

  let results: T[] = []

  for (let i = 0; i < arr.length; i++) {
    if (await awaits[i]) {
      results.push(arr[i])
    }
  }

  return results
}

export async function filterSeries<T>(arr: T[], iterator: Iterator<T>): IteratorResults<T> {
  let results: T[] = []

  for (let i = 0; i < arr.length; i++) {
    if (await iterator(arr[i])) {
      results.push(arr[i])
    }
  }

  return results
}

export async function filterLimit<T>(limit: number, arr: T[], iterator: Iterator<T>): IteratorResults<T> {
  if (limit < 1) {
    throw new Error('limit must be greater then 0.')
  }

  let awaits: IteratorResult<T>[] = []
  let results: T[] = []

  for (let i = 0; i < arr.length; i++) {
    awaits.push(iterator(arr[i]))

    if (i % limit === 0) {
      for (let j = 0; j < awaits.length; j++) {
        if (await awaits[j]) {
          results.push(arr[i - limit + j])
        }
      }

      awaits = []
    }
  }

  return results
}
