const fs = require('fs');

var timeoutScheduled = Date.now();

function someAsyncOperation(callback) {
  console.log(`Before file - ${Date.now() - timeoutScheduled}ms`);
  // Assume this takes 95ms to complete
  fs.readFile("./app.js",(err, data) => {
    console.log(`After file - ${Date.now() - timeoutScheduled}ms`);
    console.log(`Before callback - ${Date.now() - timeoutScheduled}ms`);
    callback();
    console.log(`After callback - ${Date.now() - timeoutScheduled}ms`);
    console.log(data == undefined ? err : data);
  });
}
console.log(`start - ${Date.now() - timeoutScheduled}ms`);

// do someAsyncOperation which takes 95 ms to complete
someAsyncOperation(() => {
  const startCallback = Date.now();
  
  // do something that will take 10ms...
  while (Date.now() - startCallback < 10) {
    // do nothing
  }
});

setTimeout(() => {
  console.log(`Total = ${Date.now() - timeoutScheduled}ms`);
}, 0);

setImmediate(()=>{
  console.log(`setImmediate - ${Date.now() - timeoutScheduled}ms`);
});