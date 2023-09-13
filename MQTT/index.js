const mqtt = require("mqtt");
var mylog = console.log;
const fs = require("fs");
var tls = require("tls");
const thingName = "37220-721fbe04-6b7e-4024-a812-d87ff2f44c63";

function readFileSync(name) {
  var res = false;
  try {
    res = fs.readFileSync(name);
  } catch (e) {
    console.log("--->", name, "... ", e);
  }
  //console.log('---------->', res);
  return res;
}

// Take these files from a hub:
// privateKey = /real/certs/awsCerts/private.pem.key
// clientCert = /real/certs/awsCerts/certificate.pem.crt
// caCert     = /root/hub/awsCerts/root-CA.crt

var privateKey = readFileSync("./certs/private.pem.key");
var clientCert = readFileSync("./certs/certificate.pem.crt");
var caCert = readFileSync("./certs/root-CA.crt");

function buildBuilder(mqttClient, opts) {
  var connection;

  connection = tls.connect(opts);

  function handleTLSerrors(err) {
    mqttClient.emit("error", err);
    connection.end();
  }

  connection.on("secureConnect", function () {
    if (!connection.authorized) {
      connection.emit("error", new Error("TLS not authorized"));
    } else {
      connection.removeListener("error", handleTLSerrors);
    }
  });

  connection.on("error", handleTLSerrors);
  return connection;
}

var options = {
  privateKey,
  clientCert,
  caCert,
  clientId: "lollypop-" + +new Date(),
  host: "a6q1rnfo3vlj4.iot.us-east-1.amazonaws.com",
  keepalive: 300,
  username: "?SDK=JavaScript&Version=2.2.1",
  reconnectPeriod: 1000,
  fastDisconnectDetection: true,
  resubscribe: false,
  protocol: "mqtts",
  port: 8883,
  ca: caCert,
  key: privateKey,
  cert: clientCert,
  requestCert: true,
};

function _wrapper(client) {
  return buildBuilder(client, options);
}

var device;

initDevice();

function initDevice() {
  if (device) {
    device.end(true);
    device.removeAllListeners();
  }
  device = new mqtt.MqttClient(_wrapper, options);
}

device.on("message", (topic, payload) => {
  var data = JSON.parse(payload.toString());
  console.log("message", topic, JSON.stringify(data));
  // device.end();
});

device.on("connect", () => {
  console.log("Connected to AWS IoT");
  device.subscribe("$aws/things/"+thingName+"/shadow/update/accepted", (err, l) => {
    if (err) {
      console.log(err);
    } else {
      console.log(l);
    }
  });
  device.subscribe("$aws/things/"+thingName+"/shadow/get/accepted", (err, l) => {
    if (err) {
      console.log(err);
    } else {
      console.log(l);
    }
  });
  device.subscribe("$aws/things/"+thingName+"/shadow/get/rejected", (err, l) => {
    if (err) {
      console.log(err);
    } else {
      console.log(l);
    }
  });
  device.subscribe("$aws/things/"+thingName+"/shadow/update/rejected", (err, l) => {
    if (err) {
      console.log(err);
    } else {
      console.log(l);
    }
  });
  device.subscribe("$aws/things/"+thingName+"/shadow/update/delta", (err, l) => {
    if (err) {
      console.log(err);
    } else {
      console.log(l);
    }
  });
  device.subscribe("$aws/things/"+thingName+"/shadow/update/documents", (err, l) => {
    if (err) {
      console.log(err);
    } else {
      console.log(l);
    }
  });
  device.subscribe("$aws/things/"+thingName+"/shadow/delete/accepted", (err, l) => {
    if (err) {
      console.log(err);
    } else {
      console.log(l);
    }
  });
  device.subscribe("$aws/things/"+thingName+"/shadow/delete/rejected", (err, l) => {
    if (err) {
      console.log(err);
    } else {
      console.log(l);
    }
  });
  device.subscribe("$aws/things/"+thingName+"/shadow/delete/documents", (err, l) => {
    if (err) {
      console.log(err);
    } else {
      console.log(l);
    }
  });
});

device.on("close", function (err) {
  mylog("***** close");
  console.log(err);
});

device.on("error", function (err) {
  mylog("***** error");
  console.log(err);
});

function data(now) {
  return {
    state: {
      desired: {
        commands: {
          [now]: {
            mode: "unlock",
            agent_id: 12523,
          },
        },
        thing_name: thingName,
      },
    }
  };
}

setTimeout(() => {
  const dat = data(+new Date());
  console.log(JSON.stringify(dat));
  device.publish(
    "$aws/things/"+thingName+"/shadow/update",
    JSON.stringify(dat),
    { qos: 0 },
    (err) => {
      if (err) {
        console.log("Error in publishing to AWS IoT");
      }
    }
  );
}, 3000);
