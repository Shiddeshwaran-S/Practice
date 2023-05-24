const fs = require('fs');

fs.watchFile('file.txt',(curr, prev)=>{
    console.log('Current: ',curr.mtime,'Previous: ',prev.mtime);
});

fs.writeFile('file.txt','Buffer.from([0x30,0x41,0x46,0x4C])',()=>{
    console.log('file write success.');
});