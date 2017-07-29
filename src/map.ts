import {Iterator, IteratorResult, IteratorResults} from './types'

export async function map<T>(arr: T[], iterator: Iterator<T>): IteratorResults<T> {
  let awaits: IteratorResult<T>[] = []
  for (let item of arr) {
    awaits.push(iterator(item))
  }

  let results: T[] = []

  for (let item of awaits) {
    results.push(await item)
  }

  return results
}

export async function mapSeries<T>(arr: T[], iterator: Iterator<T>): IteratorResults<T> {
  let results: T[] = []

  for (let item of arr) {
    results.push(await iterator(item))
  }

  return results
}

export async function mapLimit<T>(limit: number, arr: T[], iterator: Iterator<T>): IteratorResults<T> {
  if (limit < 1) {
    throw new Error('limit must be greater then 0.')
  }

  let awaits: IteratorResult<T>[] = []
  let results: T[] = []

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
