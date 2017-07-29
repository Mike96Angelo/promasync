export async function each<T>(arr: T[], iterator: ((item: T) => Promise<any>)) {
  let awaits: Promise<T>[] = []
  for (let item of arr) {
    awaits.push(iterator(item))
  }

  for (let item of awaits) {
    await item
  }
}

export async function eachSeries<T>(arr: T[], iterator: ((item: T) => Promise<any>)) {
  for (let item of arr) {
    await iterator(item)
  }
}

export async function eachLimit<T>(limit: number, arr: T[], iterator: ((item: T) => Promise<any>)) {
  if (limit < 1) {
    throw new Error('limit must be greater then 0.')
  }

  let awaits: Promise<any>[] = []

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
