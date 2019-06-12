var dotenv = require('dotenv');
dotenv.config();
module.exports = {
    port: process.env.PORT,
    mqttHost: process.env.MQTT_HOST,
    mqttTopic: process.env.MQTT_TOPIC,
    mqttUser: process.env.MQTT_USERNAME,
    mqttPass: process.env.MQTT_PASSWORD,
    mqttPort: process.env.MQTT_PORT
};