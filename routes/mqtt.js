var express = require('express');
var mqtt = require('mqtt');
var router = express.Router();
const {mqttHost, mqttPass, mqttTopic, mqttUser, mqttPort} = require('../config');


var host = mqttHost;
var topic = mqttTopic;

var options = {
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
    var client = mqtt.connect(host, options);

    client.on('connect', function () {
        client.subscribe(topic, function (err) {
            if (!err) {
                client.publish(topic, JSON.stringify(req.body), {retain: true})
            } else {
                return res.send(err)
            }
        })
    });
    return res.send('success sending: ' + req.body)
});

module.exports = router;
