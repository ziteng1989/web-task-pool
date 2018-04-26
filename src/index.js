import { FjsPromise } from 'rc-ctrl';
import greenlet from 'greenlet';

const MAX_CAPACITY = 3;

class Queue {
    queue = [];
    
    constructor(capacity) {
        this.capacity = capacity;
        this.count = 0;
    }

    push(item) {
        this.queue.push(item);
        this.run();
    }

    pop() {
        const [head, ...rest] = this.queue;
        this.queue = rest;
        return head;
    }

    run() {
        if (this.count < this.capacity && this.queue.length > 0) {
            const item = this.pop();
            this.count = this.count + 1;
            greenlet(item.fn)(...item.args).then(response => {
                item.resolve(response);
                this.count = this.count - 1;
                this.run();
            }).catch(err => {
                item.reject(err);
                this.count = this.count - 1;
                this.run();
            });
        }
    }
}

const TaskQueue = new Queue(MAX_CAPACITY);

export default function taskPool(fn) {
    return function() {
        const args = [...arguments];
        return new FjsPromise((resolve, reject) => {
            TaskQueue.push({
                resolve,
                reject,
                fn,
                args
            });
        });
    }
}