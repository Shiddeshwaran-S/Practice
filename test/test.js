const fs = require('fs');

async function sample() {
    const data = await new Promise((res) => {
        fs.readFile('..\\Assignmet 6\\question-1.md', (err, data) => {
            res(data);
        });
    });
    console.log("async/await ",data);
}

sample()


function firstAction (cb) {
    console.log("first action..")
    cb();
}

function secondAction() {
    console.log("second action..")
}

firstAction(secondAction);