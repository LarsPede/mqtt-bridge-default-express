const express = require('express');
const mqtt = require('mqtt');
const router = express.Router();
const {mqttHost, mqttPass, mqttTopic, mqttUser, mqttPort} = require('../config');


const host = mqttHost;
const topic = mqttTopic;

const options = {
    port: mqttPort,
    username: mqttUser,
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    password: mqttPass,
    encoding: 'utf8'
};

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/', function (req, res, next) {
    const client = mqtt.connect(host, options);

    client.on('connect', function () {
        client.publish(topic, JSON.stringify(req.body), {retain: true}, function (err) {
            if (!err) {
                return res.send('success sending: ' + req.body)
            } else {
                return res.send(err)
            }
        });
        client.end();
    });
});

module.exports = router;
