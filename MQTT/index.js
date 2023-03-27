const mqttprotocol = require('aws-iot-device-sdk');

const device = mqttprotocol.device({
    clientId: 'DemoPC',
    host: 'af45gc5tdv54r-ats.iot.eu-north-1.amazonaws.com',
    port: 8883,
    keyPath: './awskeys/AWS-private.pem.key',
    certPath: './awskeys/AWS-certificate.pem.crt',
    caPath: './awskeys/AmazonRootCA1.pem',
});

device.on('message', (topic, payload) => {
    console.log('message', topic, payload.toString());
});



device.on('connect', () => {
    console.log('Connected to AWS IoT');
    device.subscribe('$aws/things/DemoPC/shadow/update/accepted');
    device.subscribe('$aws/things/DemoPC/shadow/get/accepted');
    device.subscribe('$aws/things/DemoPC/shadow/get/rejected');
    device.subscribe('$aws/things/DemoPC/shadow/update/rejected');
    device.subscribe('$aws/things/DemoPC/shadow/update/delta');
    device.subscribe('$aws/things/DemoPC/shadow/update/documents');
    device.subscribe('$aws/things/DemoPC/shadow/delete/accepted');
    device.subscribe('$aws/things/DemoPC/shadow/delete/rejected');
    device.subscribe('$aws/things/DemoPC/shadow/delete/documents');
});

device.publish('$aws/things/DemoPC/shadow/get', JSON.stringify({
    "state": { 
        "desired": { 
            "welcome": "aws-iot", 
            "1": "One", 
            "2": "Two", 
            "numeral": 1 
        }, 
        "reported": { 
            "welcome": "aws-iot", 
            "1": "Once", 
            "2": "Twice" 
        }, 
        "delta": { 
            "1": "One", 
            "2": "Two", 
            "numeral": 1 
        }, 
    },
}));