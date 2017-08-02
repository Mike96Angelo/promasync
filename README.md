# promasync
An async control flow for promises.

```
$ npm install promasync --save
```
import: (typescript)
```javascript
import * as Async from 'promasync/ts'
```
require:
```javascript
var Async = require('promasync') // (default: es2015)
var Async = require('promasync/es3')
var Async = require('promasync/es5')
var Async = require('promasync/es2015')
var Async = require('promasync/es2016')
var Async = require('promasync/es2017')
```

```javascript
/*****************
 ** Collections **
 *****************/

Async.concat<T, R>(arr: T[], iterator: ((item: T) => Promise<R[]>)): Promise<R[]>;
Async.concatSeries<T, R>(arr: T[], iterator: ((item: T) => Promise<R[]>)): Promise<R[]>;
Async.concatLimit<T, R>(limit: number, arr: T[], iterator: ((item: T) => Promise<R[]>)): Promise<R[]>;

Async.each<T>(arr: T[], iterator: ((item: T) => Promise<any>)): Promise<void>;
Async.eachSeries<T>(arr: T[], iterator: ((item: T) => Promise<any>)): Promise<void>;
Async.eachLimit<T>(limit: number, arr: T[], iterator: ((item: T) => Promise<any>)): Promise<void>;

Async.every<T>(arr: T[], iterator: ((item: T) => Promise<boolean>)): Promise<boolean>;
Async.everySeries<T>(arr: T[], iterator: ((item: T) => Promise<boolean>)): Promise<boolean>;
Async.everyLimit<T>(limit: number, arr: T[], iterator: ((item: T) => Promise<boolean>)): Promise<boolean>;

Async.filter<T>(arr: T[], iterator: ((item: T) => Promise<boolean>)): Promise<T[]>;
Async.filterSeries<T>(arr: T[], iterator: ((item: T) => Promise<boolean>)): Promise<T[]>;
Async.filterLimit<T>(limit: number, arr: T[], iterator: ((item: T) => Promise<boolean>)): Promise<T[]>;

Async.groupBy<T>(arr: T[], iterator: ((item: T) => Promise<string>)): Promise<{[key: string]: T[]}>;
Async.groupBySeries<T>(arr: T[], iterator: ((item: T) => Promise<string>)): Promise<{[key: string]: T[]}>;
Async.groupByLimit<T>(limit: number, arr: T[], iterator: ((item: T) => Promise<string>)): Promise<{[key: string]: T[]}>;

Async.groupResultBy<T, R>(arr: T[], iterator: ((item: T) => Promise<[string, R]>)): Promise<{[key: string]: R[]}>;
Async.groupResultBySeries<T, R>(arr: T[], iterator: ((item: T) => Promise<[string, R]>)): Promise<{[key: string]: R[]}>;
Async.groupResultByLimit<T, R>(limit: number, arr: T[], iterator: ((item: T) => Promise<[string, R]>)): Promise<{[key: string]: R[]}>;

Async.map<T, R>(arr: T[], iterator: ((item: T) => Promise<R>)): Promise<R[]>;
Async.mapSeries<T, R>(arr: T[], iterator: ((item: T) => Promise<R>)): Promise<R[]>;
Async.mapLimit<T, R>(limit: number, arr: T[], iterator: ((item: T) => Promise<R>)): Promise<R[]>;

Async.some<T>(arr: T[], iterator: ((item: T) => Promise<boolean>)): Promise<boolean>;
Async.someSeries<T>(arr: T[], iterator: ((item: T) => Promise<boolean>)): Promise<boolean>;
Async.someLimit<T>(limit: number, arr: T[], iterator: ((item: T) => Promise<boolean>)): Promise<boolean>;

Async.sortBy<T, C>(arr: T[], iterator: ((item: T) => Promise<C>)): Promise<T[]>;
Async.sortBySeries<T, C>(arr: T[], iterator: ((item: T) => Promise<C>)): Promise<T[]>;
Async.sortByLimit<T, C>(limit: number, arr: T[], iterator: ((item: T) => Promise<C>)): Promise<T[]>;

Async.sortResultBy<T, C, R>(arr: T[], iterator: ((item: T) => Promise<[C, R]>)): Promise<R[]>;
Async.sortResultBySeries<T, C, R>(arr: T[], iterator: ((item: T) => Promise<[C, R]>)): Promise<R[]>;
Async.sortResultByLimit<T, C, R>(limit: number, arr: T[], iterator: ((item: T) => Promise<[C, R]>)): Promise<R[]>;

/******************
 ** Control Flow **
 ******************/

Async.run<R>(tasks: (() => Promise<R>)[]): Promise<R[]>;
Async.runSeries<R>(tasks: (() => Promise<R>)[]): Promise<R[]>;
Async.runLimit<R>(limit: number, tasks: (() => Promise<R>)[]): Promise<R[]>;

Async.queue<T, R>(limit: number, worker: ((task: T) => Promise<R>)): Queue<T, R>;
```

Queue:
```javascript
Queue<T, R>.limit: number;
Queue<T, R>.started: boolean;
Queue<T, R>.paused: boolean;
Queue<T, R>.killed: boolean;
Queue<T, R>.running: number;
Queue<T, R>.saturated?: () => void;
Queue<T, R>.unsaturated?: () => void;
Queue<T, R>.empty?: () => void;
Queue<T, R>.drain?: () => void;
Queue<T, R>.error?: (err: any) => void;
Queue<T, R>.length: number; // readonly
Queue<T, R>.idle: boolean; // readonly
Queue<T, R>.pause(): void;
Queue<T, R>.resume(): void;
Queue<T, R>.push(task: T | T[]): Promise<R | R[]>;
Queue<T, R>.unshift(task: T | T[]): Promise<R | R[]>;
Queue<T, R>.remove(test: ((task: T) => boolean)): boolean;
Queue<T, R>.kill(): void;
```
