var timeoutEvent = setTimeout(function() {
    console.log('Hello World!');
}, 1000);

// clearTimeout(timeoutEvent);
console.log(timeoutEvent.unref());
console.log(timeoutEvent.ref());