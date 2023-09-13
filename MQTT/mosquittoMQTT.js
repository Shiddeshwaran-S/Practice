const mqtt = require('mqtt')
const fs = require('fs')

const options = {
    clientId: 'test-client-3',
    // caCert: Buffer.from(readFileSync('./awskeys/moq/client.crt')),
    // cert: Buffer.from(readFileSync('./awskeys/moq/client.crt')),
    // key: Buffer.from(readFileSync('./awskeys/moq/client.key')),
    keepalive: 900,
    connectTimeout: 10 * 1000,
    //username: 'valli',
    //password: '12345',
    protocol: 'mqtt',
    port: 1883,
    clean: true,
    rejectUnauthorized: false,
};

const client = mqtt.connect("mqtt://test.mosquitto.org", options);

client.on('connect', () => {
    console.log("****** CONNECTION ESTABLISHED :", client.connected, "********")
    subscribe()
    publish()
});

client.on('message', (topic, msg, pkt) => {
    console.log("*********  MESSAGE RECEIVED **********")
    console.log("TOPIC:", topic)
    console.log("MESSAGE:", JSON.parse(unravel(msg)))
    // console.log("PACKET:", pkt)
});

client.on('offline', () => {
    console.log("******** OFFLINE *********")
});

client.on('error', (err) => {
    console.log("******* ERROR *******\n", err)
});

client.on('close', function (err) {
    console.log("******* CLOSE EVENT *********\n")
});

function subscribe() {
    if (client.connected) {
        client.subscribe('smarthome/hall/door', { qos: 1 }, (err, value) => {
            if (err)
                console.log("****** ERROR IN SUBSCRIBE ******\n", err)
            else
                console.log("****** SUBSCRIPTION SUCCESSFUL *******\n", value)
        })
    }
};

function publish() {
    if (client.connected) {
        client.publish('smarthome/hall/door', '{"status":"locked"}', { qos: 1}, (err) => {
            if (err)
                console.log("****** ERROR IN PUBLISH ******\n", err)
            else
                console.log("****** PUBLISH SUCCESSFUL *****\n")
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