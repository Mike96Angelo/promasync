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
import {Async} from 'promasync/es3'

// import: es5
var Async = require('promasync/es5')
// typescript
import {Async} from 'promasync/es5'

// import: es2015 (default)
var Async = require('promasync')
var Async = require('promasync/es2015')
// typescript
import {Async} from 'promasync'
import {Async} from 'promasync/es2015'

// import: es2016
var Async = require('promasync/es2016')
// typescript
import {Async} from 'promasync/es2016'

// import: es2017
var Async = require('promasync/es2017')
// typescript
import {Async} from 'promasync/es2017'
```

```typescript
Async.each(arr: any[], iterator: (item: any) => Promise<any>): Promise<void>;

Async.eachSeries(arr: any[], iterator: (item: any) => Promise<any>): Promise<void>;

Async.eachLimit(arr: any[], limit: number, iterator: (item: any) => Promise<any>): Promise<void>;

Async.filter(arr: any[], iterator: (item: any) => Promise<any>): Promise<any[]>;

Async.filterSeries(arr: any[], iterator: (item: any) => Promise<any>): Promise<any[]>;

Async.filterLimit(arr: any[], limit: number, iterator: (item: any) => Promise<any>): Promise<any[]>;

Async.map(arr: any[], iterator: (item: any) => Promise<any>): Promise<any[]>;

Async.mapSeries(arr: any[], iterator: (item: any) => Promise<any>): Promise<any[]>;

Async.mapLimit(arr: any[], limit: number, iterator: (item: any) => Promise<any>): Promise<any[]>;

Async.parallel(tasks: (() => Promise<any>)[]): Promise<any[]>;

Async.series(tasks: (() => Promise<any>)[]): Promise<any[]>;

Async.parallelLimit(tasks: (() => Promise<any>)[], limit: number): Promise<any[]>;

```
