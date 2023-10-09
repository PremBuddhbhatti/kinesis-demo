const AWS = require("aws-sdk");

AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: 'k-demo' });

const kinesis = new AWS.Kinesis({
  region: "us-east-1",
});

const streamName = "KP1-dev-KP1DataStream-LS167fmI015M";

function generateTelemetry() {
  setInterval(() => {
    const temperature = 20 + Math.random() * 10;
    const wind = Math.random() * 10;
    const pressure = 980 + Math.random() * 40;
    const telemetry = { temperature, wind, pressure };

    const params = {
      Data: JSON.stringify(telemetry),
      PartitionKey: "1234",
      StreamName: streamName,
    };

    kinesis.putRecord(params, (err, data) => {
      if (err) {
        console.error(err, err.stack);
      } else {
        console.log(data);
      }
    });
  }, 500);
}

generateTelemetry();
