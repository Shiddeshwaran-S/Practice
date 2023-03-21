const parent = require('worker_threads').parentPort;
const fs = require('fs');

var data = fs.readFileSync("D:\\backup\\Élite.S01.1080p.WEBRip.HIN-ENG.DDP5.1.x265.HEVC-PSA\\Élite.S01E01..1080p.WEBRip.HIN-ENG.DDP5.1.x265.HEVC-PSA.mkv");

var total = 0;

for(var byte of data){
    total += byte;
}

parent.postMessage({'data': data, 'total': total});