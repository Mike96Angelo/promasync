export async function every<T>(arr: T[], iterator: ((item: T) => Promise<boolean>)): Promise<boolean> {
  let awaits: Promise<boolean>[] = []
  for (let item of arr) {
    awaits.push(iterator(item))
  }

  for (let i = 0; i < arr.length; i++) {
    if (!await awaits[i]) {
      return false
    }
  }

  return true
}

export async function everySeries<T>(arr: T[], iterator: ((item: T) => Promise<boolean>)): Promise<boolean> {
  for (let i = 0; i < arr.length; i++) {
    if (!await iterator(arr[i])) {
      return false
    }
  }

  return true
}

export async function everyLimit<T>(limit: number, arr: T[], iterator: ((item: T) => Promise<boolean>)): Promise<boolean> {
  if (limit < 1) {
    throw new Error('limit must be greater then 0.')
  }

  let awaits: Promise<boolean>[] = []

  for (let i = 0; i < arr.length; i++) {
    awaits.push(iterator(arr[i]))

    if (i % limit === 0) {
      for (let j = 0; j < awaits.length; j++) {
        if (!await awaits[j]) {
          return false
        }
      }

      awaits = []
    }
  }

  return true
}
