type IteratorResult = Promise<any>
type IteratorResults = Promise<any[]>
type Iterator = (item: any) => IteratorResult

type TaskResult = Promise<any>
type TaskResults = Promise<any[]>
type Task = () => TaskResult
// type GroupIterator = (item: any) => IteratorResults

export const Async = {
  /*****************
   ** Collections **
   *****************/
  // concat
  // detect
  // each
  async each(arr: any[], iterator: Iterator) {
    let awaits: IteratorResult[] = []
    for (let item of arr) {
      awaits.push(iterator(item))
    }

    for (let item of awaits) {
      await item
    }
  },

  async eachSeries(arr: any[], iterator: Iterator) {
    for (let item of arr) {
      await iterator(item)
    }
  },

  async eachLimit(limit: number, arr: any[], iterator: Iterator) {
    if (limit < 1) {
      throw new Error('limit must be greater then 0.')
    }

    let awaits: IteratorResult[] = []

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
  },

  // eachOf

  // filter
  async filter(arr: any[], iterator: Iterator): IteratorResults {
    let awaits: IteratorResult[] = []
    for (let item of arr) {
      awaits.push(iterator(item))
    }

    let results: any[] = []

    for (let i = 0; i < arr.length; i++) {
      if (await awaits[i]) {
        results.push(arr[i])
      }
    }

    return results
  },

  async filterSeries(arr: any[], iterator: Iterator): IteratorResults {
    let results: any[] = []

    for (let i = 0; i < arr.length; i++) {
      if (await iterator(arr[i])) {
        results.push(arr[i])
      }
    }

    return results
  },

  async filterLimit(limit: number, arr: any[], iterator: Iterator): IteratorResults {
    if (limit < 1) {
      throw new Error('limit must be greater then 0.')
    }

    let awaits: IteratorResult[] = []
    let results: any[] = []

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
  },

  // groupBy
  // map
  async map(arr: any[], iterator: Iterator): IteratorResults {
    let awaits: IteratorResult[] = []
    for (let item of arr) {
      awaits.push(iterator(item))
    }

    let results: any[] = []

    for (let item of awaits) {
      results.push(await item)
    }

    return results
  },

  async mapSeries(arr: any[], iterator: Iterator): IteratorResults {
    let results: any[] = []

    for (let item of arr) {
      results.push(await iterator(item))
    }

    return results
  },

  async mapLimit(limit: number, arr: any[], iterator: Iterator): IteratorResults {
    if (limit < 1) {
      throw new Error('limit must be greater then 0.')
    }

    let awaits: IteratorResult[] = []
    let results: any[] = []

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
  },

  // mapValues
  // reduce
  // reject
  // some
  // sortBy
  // transform

  /******************
   ** Control Flow **
   ******************/

  async parallel(tasks: Task[]): TaskResults {
    let awaits: TaskResult[] = []
    for (let task of tasks) {
      awaits.push(task())
    }

    let results: any[] = []

    for (let item of awaits) {
      results.push(await item)
    }

    return results
  },

  async series(tasks: Task[]): TaskResults {
    let results: any[] = []

    for (let task of tasks) {
      results.push(await task())
    }

    return results
  },

  async parallelLimit(limit: number, tasks: Task[]): TaskResults {
    if (limit < 1) {
      throw new Error('limit must be greater then 0.')
    }

    let awaits: IteratorResult[] = []
    let results: any[] = []

    for (let i = 0; i < tasks.length; i++) {
      let task = tasks[i]
      awaits.push(task())

      if (i % limit === 0) {
        for (let item of awaits) {
          results.push(await item)
        }

        awaits = []
      }
    }

    return results
  },
}


// Async.map([1,2,3,4,5], async function (a) {return a*a} ).then((r)=>console.log('good', r)).catch((err) => console.log(err))
