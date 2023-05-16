require("dotenv").config();

const config = {
  port: parseInt(process.env.PORT),
  mqttHost: process.env.mqttHost,
  localHost: process.env.localHost,
  mqttPort: parseInt(process.env.mqttPort),
  userName: process.env.userName,
  password: process.env.password,
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: process.env.region,
  bucketName: process.env.bucketName,
  seoulKey: process.env.SEOUL_KEY,
  weatherKey: process.env.WEATHER_KEY,
  dbHost: process.env.DB_HOST,
  fitbitClId: process.env.FITBIT_CLID,
  fitbitSecret: process.env.FITBIT_SECID,
  ec2_host: process.env.ec2_host,
};

module.exports = {
  config,
};
