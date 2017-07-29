# promasync
An async control flow for promises.

```
$ npm install promasync --save
```
imports
```javascript
// import: es3
var Async = require('promasync/es3').Async
// typescript
import {Async} from 'promasync/es3'

// import: es5
var Async = require('promasync/es5').Async
// typescript
import {Async} from 'promasync/es5'

// import: es2015 (default)
var Async = require('promasync').Async
var Async = require('promasync/es2015').Async
// typescript
import {Async} from 'promasync'
import {Async} from 'promasync/es2015'

// import: es2016
var Async = require('promasync/es2016').Async
// typescript
import {Async} from 'promasync/es2016'

// import: es2017
var Async = require('promasync/es2017').Async
// typescript
import {Async} from 'promasync/es2017'
```

```javascript
Async.each(arr: any[], iterator: (item: any) => Promise<any>): Promise<void>;

Async.eachSeries(arr: any[], iterator: (item: any) => Promise<any>): Promise<void>;

Async.eachLimit(limit: number, arr: any[], iterator: (item: any) => Promise<any>): Promise<void>;

Async.filter(arr: any[], iterator: (item: any) => Promise<any>): Promise<any[]>;

Async.filterSeries(arr: any[], iterator: (item: any) => Promise<any>): Promise<any[]>;

Async.filterLimit(limit: number, arr: any[], iterator: (item: any) => Promise<any>): Promise<any[]>;

Async.map(arr: any[], iterator: (item: any) => Promise<any>): Promise<any[]>;

Async.mapSeries(arr: any[], iterator: (item: any) => Promise<any>): Promise<any[]>;

Async.mapLimit(limit: number, arr: any[], iterator: (item: any) => Promise<any>): Promise<any[]>;

Async.parallel(tasks: (() => Promise<any>)[]): Promise<any[]>;

Async.series(tasks: (() => Promise<any>)[]): Promise<any[]>;

Async.parallelLimit(limit: number, tasks: (() => Promise<any>)[]): Promise<any[]>;

```
