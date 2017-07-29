import {Iterator, IteratorResult} from './types'

export async function each<T>(arr: T[], iterator: Iterator<T>) {
  let awaits: IteratorResult<T>[] = []
  for (let item of arr) {
    awaits.push(iterator(item))
  }

  for (let item of awaits) {
    await item
  }
}

export async function eachSeries<T>(arr: T[], iterator: Iterator<T>) {
  for (let item of arr) {
    await iterator(item)
  }
}

export async function eachLimit<T>(limit: number, arr: T[], iterator: Iterator<T>) {
  if (limit < 1) {
    throw new Error('limit must be greater then 0.')
  }

  let awaits: IteratorResult<T>[] = []

  for (let i = 0; i < arr.length; i++) {
    let item = arr[i]
    awaits.push(iterator(item))

    if (i % limit === 0) {
      for (let item of awaits) {
        await item
      }

      awaits = []
    }
  }
}
