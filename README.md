# promasync
An async control flow for promises.

```
$ npm install promasync --save
```
imports
```javascript
// import: es3
var Async = require('promasync/es3')
// typescript
import * as Async from 'promasync/es3'

// import: es5
var Async = require('promasync/es5')
// typescript
import * as Async from 'promasync/es5'

// import: es2015 (default)
var Async = require('promasync')
var Async = require('promasync/es2015')
// typescript
import * as Async from 'promasync'
import * as Async from 'promasync/es2015'

// import: es2016
var Async = require('promasync/es2016')
// typescript
import * as Async from 'promasync/es2016'

// import: es2017
var Async = require('promasync/es2017')
// typescript
import * as Async from 'promasync/es2017'
```

```javascript
/*****************
 ** Collections **
 *****************/

Async.each<T>(array: T[], iterator: (item: T) => Promise<T>): Promise<void>;
Async.eachSeries<T>(array: T[], iterator: (item: T) => Promise<T>): Promise<void>;
Async.eachLimit<T>(limit: number, array: T[], iterator: (item: T) => Promise<T>): Promise<void>;

Async.filter<T>(array: T[], iterator: (item: T) => Promise<T>): Promise<T[]>;
Async.filterSeries<T>(array: T[], iterator: (item: T) => Promise<T>): Promise<T[]>;
Async.filterLimit<T>(limit: number, array: T[], iterator: (item: T) => Promise<T>): Promise<T[]>;

Async.map<T>(array: T[], iterator: (item: T) => Promise<T>): Promise<T[]>;
Async.mapSeries<T>(array: T[], iterator: (item: T) => Promise<T>): Promise<T[]>;
Async.mapLimit<T>(limit: number, array: T[], iterator: (item: T) => Promise<T>): Promise<T[]>;

/******************
 ** Control Flow **
 ******************/

Async.run<T>(tasks: (() => Promise<T>)[]): Promise<T[]>;
Async.runSeries<T>(tasks: (() => Promise<T>)[]): Promise<T[]>;
Async.runLimit<T>(limit: number, tasks: (() => Promise<T>)[]): Promise<T[]>;

Async.queue<T>(limit: number, worker: ((task: T) => Promise<T>)): Queue<T>;

```

Queue:
```javascript
Queue<T>.limit: number;
Queue<T>.started: boolean;
Queue<T>.paused: boolean;
Queue<T>.killed: boolean;
Queue<T>.running: number;
Queue<T>.saturated?: () => void;
Queue<T>.unsaturated?: () => void;
Queue<T>.empty?: () => void;
Queue<T>.drain?: () => void;
Queue<T>.error?: (err: any) => void;
Queue<T>.length: number;
Queue<T>.idle: boolean;
Queue<T>.pause(): void;
Queue<T>.resume(): void;
Queue<T>.push(task: T | T[]): Promise<T | T[]>;
Queue<T>.unshift(task: T | T[]): Promise<T | T[]>;
Queue<T>.remove(test: ((task: T) => boolean)): boolean;
Queue<T>.kill(): void;
```
