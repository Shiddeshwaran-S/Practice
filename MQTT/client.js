const mqtt = require("mqtt");

const client = mqtt.connect("mqtt://192.168.1.192", {
  keepalive: 300,
});

client.on("connect", () => {
  console.log("Successfully connected");

  setInterval(() => {
    client.publish("topic1", "Sending message");
  }, 3000);

  for (let i = 1; i <= 6; i++) {
    timer(i * 1000, (message) => {
      console.log(message);
    });
  }
});

function timer(ms, fn) {
  setTimeout(() => {
    fn(`${ms} seconds`);
  }, ms);
}
