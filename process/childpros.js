const fs = require('fs')

fs.readFileSync('./childpros.js', (err, data) => {
    if (err) {
        console.log('error: ', err);
    } else {
        console.log('data: ', data.toString());
    }
});

process.on('message', (msg) => {
    console.log('message from parent process: ', msg);

    process.send('hello from child process');

    process.disconnect();

    console.log(process.arch);

    process.exit(0);
});