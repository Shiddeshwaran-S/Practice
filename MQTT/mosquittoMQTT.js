const mqtt = require('mqtt')
const fs = require('fs')

const options = {
    clientId: 'test-client-1',
    // caCert: Buffer.from(readFileSync('./awskeys/moq/client.crt')),
    // cert: Buffer.from(readFileSync('./awskeys/moq/client.crt')),
    // key: Buffer.from(readFileSync('./awskeys/moq/client.key')),
    keepalive: 900,
    connectTimeout: 10 * 1000,
    //username: 'valli',
    //password: '12345',
    protocol: 'mqtt',
    port: 1883,
    clean: false,
    rejectUnauthorized: false,
};

const client = mqtt.connect("mqtt://test.mosquitto.org", options);

client.on('connect', () => {
    console.log("****** CONNECTION ESTABLISHED :", client.connected, "********")
    subscribe()
    // publish()
});

client.on('message', (topic, msg, pkt) => {
    console.log("*********  MESSAGE RECEIVED **********")
    console.log("TOPIC:", topic)
    console.log("MESSAGE:", JSON.parse(unravel(msg)))
    //console.log("PACKET:", pkt)
});

client.on('offline', () => {
    console.log("******** OFFLINE *********")
});

client.on('error', (err) => {
    console.log("******* ERROR *******", err)
});

client.on('close', function (err) {
    console.log("******* CLOSE EVENT *********")
});

function subscribe() {
    if (client.connected) {
        client.subscribe('smarthome/hall/door', { qos: 0 }, (err, value) => {
            if (err)
                console.log("****** ERROR IN SUBSCRIBE ******", err)
            else
                console.log("****** SUBSCRIPTION SUCCESSFUL *******", value)
        })
    }
};

function publish() {
    if (client.connected) {
        client.publish('smarthome/hall/door', '{"status":"locked"}', { qos: 0, retain: true}, (err) => {
            if (err)
                console.log("****** ERROR IN PUBLISH ******", err)
            else
                console.log("****** PUBLISH SUCCESSFUL *****")
        })
    }
};

function unravel(x) {
    return Buffer.from(x).toString('utf-8');
};

function readFileSync(name) {
    var res = false;
    try { res = fs.readFileSync(name); } catch (e) { }
    return res;
};