new Promise((resolve, reject) => {
  setTimeout(() => {
    const value = Math.random();
    if (value > 0.5) {
      resolve(value);
      console.log('value > 0.5');
    }
    resolve('oops!');
    console.log('value <= 0.5');
  }, 2000);
}).then((value) => {
  console.log('value:', value);
});
