const mqttprotocol = require('aws-iot-device-sdk');

const device = mqttprotocol.device({
    clientId: 'test_client_1',
    host: 'af45gc5tdv54r-ats.iot.eu-north-1.amazonaws.com',
    port: 8883,
    keyPath: 'D:/Training/Practice/MQTT/awskeys/AWS-private.pem.key',
    certPath: 'D:/Training/Practice/MQTT/awskeys/AWS-certificate.pem.crt',
    caPath: 'D:/Training/Practice/MQTT/awskeys/AmazonRootCA1.pem',
});

device.on('message', (topic, payload) => {
    var data = JSON.parse(payload.toString());
    console.log('message', topic, JSON.stringify(data));
    // device.end();
});

device.on('connect', () => {
    console.log('Connected to AWS IoT');
    device.subscribe('$aws/things/testThings/shadow/update/accepted');
    device.subscribe('$aws/things/testThings/shadow/get/accepted');
    device.subscribe('$aws/things/testThings/shadow/get/rejected');
    device.subscribe('$aws/things/testThings/shadow/update/rejected');
    device.subscribe('$aws/things/testThings/shadow/update/delta');
    device.subscribe('$aws/things/testThings/shadow/update/documents');
    device.subscribe('$aws/things/testThings/shadow/delete/accepted');
    device.subscribe('$aws/things/testThings/shadow/delete/rejected');
    device.subscribe('$aws/things/testThings/shadow/delete/documents');
});

device.publish('$aws/things/testThings/shadow/get', "", { qos: 0 }, (err) => {
    if (err) {
        console.log('Error in publishing to AWS IoT');
    }
});