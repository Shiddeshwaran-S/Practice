const mqttprotocol = require('aws-iot-device-sdk');

const device = awsIot.device({
    clientId: 'RasperryMQTTClient',
    host: 'a2q5k4pqd9e0uy-ats.iot.us-east-1.amazonaws.com',
    port: 8883,
    keyPath: './AWS_Rasperry_secrets/private.pem.key',
    certPath: './AWS_Rasperry_secrets/certificate.pem.crt',
    caPath: './AWS_Rasperry_secrets/AmazonRootCA1.pem',
});