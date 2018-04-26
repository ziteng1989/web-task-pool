### install

npm install web-task-pool

### usage

```js

import taskPool from 'web-task-pool';

const fib = taskPool(function f(number) {
    if (number === 0 || number === 1) {
        return number;
    }
    return f(number-1) + f(number-2);
});


doFib = async () => {
    const result = await fib(45);
    console.log(result);
}

doFib();


```