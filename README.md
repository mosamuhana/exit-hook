# @devteks/exit-hook

> Run some code before the process exits

This package is useful for cleaning up before exiting.

## how to use
```
$ npm install @devteks/exit-hook --save
```

# Usage:
import:
```javascript
const { addExitHook, removeExitHook, clearExitHooks } = require('@devteks/exit-hook');
// OR
import { addExitHook, removeExitHook, clearExitHooks } from '@devteks/exit-hooks';
```
    
```javascript
// addExitHook() return a function to remove the hook
async function main() {
    addExitHook(() => {
        console.log('exit hook1');
    });
    addExitHook(() => {
        console.log('exit hook2');
    });
    // process some thing
    throw new Error('some error');
}

main();
// will print
// 'exit hook1'
// 'exit hook1'
```

Removing an exit hook:

```js
import { addExitHook } from '@devteks/exit-hooks';

// Returns a function that removes the hook when called.
const unsubscribe = addExitHook(() => {
    // exit hook code
});

unsubscribe();
```
