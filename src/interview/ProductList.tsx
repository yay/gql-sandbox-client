import React, { useEffect, useState } from 'react';

// Knowledge questions:

// Q: What is the difference between macrotask and microtask? (when it comes to JavaScript execution)
// A: After this macrotask has finished, all available microtasks will be processed.
//    While these microtasks are processed, they can queue even more microtasks,
//    which will all be run one by one, until the microtask queue is exhausted.

// Q: What are some examples or micro- and macrotasks?
// A: Microtasks include: MutationObserver, Promise.then/catch, other techniques based on Promise such as the fetch API,
//    V8 garbage collection process, process.nextTick() in Node environment.
//    Macrotasks include: initial script, setTimeout, setInterval, I/O, UI rendering.
//    Note: MutationObserver provides the ability to watch for changes being made to the DOM tree.

// Q: What is big O notation?
// Q: What is the time complexity of the binary search algorithm? Why is it O(log2(n))?
// A: Because number of elements in the binary tree is n = 2 ^ depth, so depth is log2(n).

// Q: What are the various ways to traverse a tree?
// A: Depth-first (pre-order, in-order, post-order), breadth-first (level-order, use a queue)

// Thought process questions:

// Q: How would you deep clone an object? `const objClone = Object.assign({}, obj);` <-- shallow copy
// A: (structuredClone)
//   - shallow copy top - level properties
//   - special handling for arrays, objects, functions, etc.
//   - functions and DOM objects are not cloned
//   - the prototype chain is not walked or duplicated
//   - property descriptors, setters, getters, and similar metadata - like features are not duplicated
//   - iterate through all array elements and create a new array where every element is a deep clone of the original element
//   - recursively deep clone all object properties of the original object
//   - make sure self - referential objects are cloned correctly: a Map of original objects to their clones
//     (make sure they use a Map as a map and not an Object, and know why using Object wouldn't work)

// How do you prevent component from re-rendering if its props and state are not changed but its parent is re-rendered?
// const ChildComponentMemo = React.memo(ChildComponent);
// Q: What is a higher-order component? How does it work internally?
// A: A higher-order component is a function that takes a component and returns a new component.

// Q: What is useImperativeHandle hook for?
// A: `useImperativeHandle` is a React Hook that lets you customize the handle exposed as a ref
//    to the parent component.
//
//    const MyInput = React.forwardRef((props, ref) {
//    React.useImperativeHandle(ref, () => {
//      return {
//        // ... your methods ...
//      };
//    }, []);

// Q: What are controlled and uncontrolled components?
// A: In a controlled component, data is handled by a React component.
//    In uncontrolled components, data is handled by the DOM itself.

type Product = { name: string; price: string };

function search(query: string): Promise<Product[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!query) {
        resolve([
          { name: 'Default product 1', price: '$100' },
          { name: 'Default product 2', price: '$150' },
          { name: 'Default product 3', price: '$200' },
        ]);
        return; // otherwise second resolve will execute (though without affecting anything)
      }
      resolve([
        { name: `Product 1 ${query}`, price: `$${Math.floor(100 + Math.random() * 900)}` },
        { name: `Product 2 ${query}`, price: `$${Math.floor(100 + Math.random() * 900)}` },
        { name: `Product 3 ${query}`, price: `$${Math.floor(100 + Math.random() * 900)}` },
      ]);
    }, 2000);
  });
}

function Products(props: { products: Product[] }) {
  const { products } = props;

  return products.map((product) => (
    <div key={product.name}>
      <span>{product.name}</span>
      <span style={{ float: 'right' }}>{product.price}</span>
    </div>
  ));
}

export default function ProductList() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    search('').then((result) => {
      setLoading(false);
      setProducts(result);
    });
  }, []);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    search(query).then((result) => {
      setLoading(false);
      setProducts(result);
    });
    event.preventDefault();
  }

  return (
    <div style={{ width: '30%' }}>
      <div>
        <p>Product List</p>
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              Search:&nbsp;
              <input onChange={handleChange} type="text" value={query} />
            </label>
            &nbsp;
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
      <div style={{ paddingTop: '10px' }}>{loading ? 'Loading...' : <Products products={products} />}</div>
    </div>
  );
}

function promiseTrick1() {
  const promise1 = new Promise((resolve, reject) => {
    console.log(1);
    resolve('success');
  });
  promise1.then(() => console.log(3)); // added to the microtask queue (not immediately executed)
  console.log(4);
  // At this point, all the synchronized code, the current macrotask,
  // is executed.Then the JavaScript engine checks the queue of microtasks and executes them in turn.

  // 1, 4, 3
}

function promiseTrick2() {
  const promise1 = new Promise((resolve, reject) => {
    console.log(1);
  });
  promise1.then(() => {
    console.log(3);
  });
  console.log(4);

  // 1, 4
}

function promiseTrick3() {
  const promise1 = new Promise((resolve, reject) => {
    console.log(1);
    resolve('resolve1');
  });
  const promise2 = promise1.then((res) => {
    console.log(res);
  });
  console.log('promise1:', promise1);
  console.log('promise2:', promise2);

  // 1, promise1: Promise { <resolved>: 'resolve1 }, promise2: Promise { <pending> }, resolve1
}

function promiseTrick4() {
  const fn = () =>
    new Promise((resolve, reject) => {
      console.log(1);
      resolve('success');
    });
  fn().then((res) => {
    console.log(res);
  });
  console.log(2);

  // 1, 2, success
}

function promiseTrick5() {
  console.log('start');
  setTimeout(() => console.log('setTimeout'));
  new Promise((resolve) => resolve(true)).then(() => console.log('resolve'));
  // Promise.resolve().then(() => console.log('resolve'));
  console.log('end');

  // start, end, resolve, setTimeout
}

// best question
function promiseTrick6() {
  const promise = new Promise((resolve, reject) => {
    console.log(1);
    setTimeout(() => {
      console.log('timerStart');
      resolve('success'); // pushed into the microtask queue
      console.log('timerEnd');
      // the current macro task is over, the JS engine checks the microtask queue again
      // and executes microtasks in turn
    }, 0); // the timer finishes immediately and its callback function is pushed into the microtask queue
    console.log(2);
  });
  promise.then((res) => console.log(res)); // still in pending state (microtask queue is empty)
  console.log(4);
  // At this point, the first macro task ends, and the microtask queue is still empty,
  // so the JS engine starts the next macro task.

  // 1, 2, 4, timerStart, timerEnd, success
}

function promiseTrick7() {
  setTimeout(() => {
    console.log('timer1');
    setTimeout(() => {
      console.log('timer3');
    }, 0);
  }, 0);
  setTimeout(() => {
    console.log('timer2');
  }, 0);
  console.log('start');

  // start, timer1, timer2, timer3
}

function promiseTrick8() {
  const timer1 = setTimeout(() => {
    console.log('timer1');
    const promise1 = Promise.resolve().then(() => {
      console.log('promise1');
    });
  }, 0);
  const timer2 = setTimeout(() => {
    console.log('timer2');
  }, 0);
  console.log('start');

  // start, timer1, promise1, timer2
}

function promiseTrick9() {
  const promise1 = Promise.resolve().then(() => {
    console.log('promise1');
    const timer2 = setTimeout(() => {
      console.log('timer2');
    }, 0);
  });
  const timer1 = setTimeout(() => {
    console.log('timer1');
    const promise2 = Promise.resolve().then(() => {
      console.log('promise2');
    });
  }, 0);
  console.log('start');

  // start, promise1, timer1, promise2, timer2
}

function promiseTrick10() {
  const promise1 = new Promise((resolve, reject) => {
    const timer1 = setTimeout(() => {
      resolve('success');
    }, 1000);
  });
  const promise2 = promise1.then(() => {
    throw new Error('error!!!');
  });
  console.log('promise1', promise1);
  console.log('promise2', promise2);
  const timer2 = setTimeout(() => {
    console.log('promise1', promise1);
    console.log('promise2', promise2);
  }, 2000);

  // promise1: pending, promise2: pending, error, promise1: resolved, promise2: rejected
}
