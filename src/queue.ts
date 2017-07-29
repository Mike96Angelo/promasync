export type Worker<T> = (task: T) => Promise<T>

class Task<T> {
  task: T
  promise: Promise<T>
  resolve: (result: any) => void
  reject: (error: any) => void

  constructor(task: T) {
    let self = this
    self.task = task
    self.promise = new Promise<T>((resolve, reject) => {
      self.resolve = resolve
      self.reject = reject
    })
  }
}

export class Queue<T> {
  limit: number
  private worker: Worker<T>
  started: boolean = false
  paused: boolean = false
  killed: boolean = false
  running: number = 0
  private tasks: Task<T>[] = []

  private _saturated: boolean = false

  // events
  saturated?: () => void
  unsaturated?: () => void
  empty?: () => void
  drain?: () => void
  error?: (err: any) => void

  constructor(limit: number, worker: Worker<T>) {
    if (limit < 1) {
      throw new Error('limit must be greater then 0.')
    }
    this.limit = limit
    this.worker = worker
  }

  get length(): number {
    return this.tasks.length + this.running
  }

  get idle(): boolean {
    return (this.tasks.length + this.running) === 0
  }

  private status() {
    if ((this.tasks.length + this.running) >= 0.75 * this.limit) {
      if (!this._saturated && this.saturated) this.saturated()
    } else {
      if (this._saturated && this.unsaturated) this.unsaturated()
    }

    if (this.tasks.length === 0 && this.running > 0) {
      if (this.empty) this.empty()
    }

    if (this.tasks.length === 0 && this.running === 0) {
      if (this.drain) this.drain()
    }
  }

  private async runWorker(task: Task<T>) {
    this.started = true
    this.running++

    try {
      task.resolve(await this.worker(task.task))
    } catch (err) {
      if (this.error) this.error(err)
      task.reject(err)
    } finally {
      this.running--
      this.status()
      this.run()
    }
  }

  private run(task?: Task<T>, unshift?: boolean) {
    if (task) {
      if (unshift) {
        this.tasks.unshift(task)
      } else {
        this.tasks.push(task)
      }
    }

    while (!this.paused && this.running < this.limit && this.tasks.length > 0) {
      let work = this.tasks.shift()
      if (work) {
        this.runWorker(work)
      } else {
        break
      }
    }
  }

  pause() {
    this.paused = true
  }

  resume() {
    this.paused = false
    this.run()
  }

  private async add(task: T|T[], unshift: boolean): Promise<T|T[]> {
    if (this.killed) {
      throw new Error('CANNOT add tasks to the queue after calling Queue.kill().')
    }

    if (Array.isArray(task)) {
      let awaits: Promise<T>[] = []
      let results: T[] = []

      for (let t of task) {
        let work = new Task<T>(t)
        this.run(work, unshift)
        awaits.push(work.promise)
      }

      for (let p of awaits) {
        results.push(await p)
      }

      return results
    } else {
      let work = new Task<T>(task)
      this.run(work, unshift)
      return await work.promise
    }
  }

  push(task: T|T[]): Promise<T|T[]> {
    return this.add(task, false)
  }

  unshift(task: T|T[]): Promise<T|T[]> {
    return this.add(task, true)
  }

  remove(test: ((task: T) => boolean)): boolean {
    for (let i = 0; i < this.tasks.length; i++) {
      let task = this.tasks[i]
      if (test(task.task)) {
        this.tasks.splice(i, 1)
        return true
      }
    }
    return false
  }

  kill() {
    this.killed = true
    this.tasks = []
  }
}

export function queue<T>(limit: number, worker: Worker<T>): Queue<T> {
  return new Queue<T>(limit, worker)
}
