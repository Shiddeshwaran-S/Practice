const childprocess = require('child_process');

const chpr = childprocess.fork('./childpros.js');

console.log('child process id: ', chpr.pid);

chpr.on('message', (msg) => {
    console.log('message from child process: ', msg);
});

chpr.send('hello from parent process');

chpr.on('exit', (code, signal) => {
    console.log('child process exited with code: ', code, ' and signal: ', signal);
});

chpr.on('disconnect', () => {
    console.log('child process disconnected');
});