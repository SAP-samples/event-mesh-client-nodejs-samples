'use strict';

const msg = require('@sap/xb-msg');
const config = require('./config');

const env = require('@sap/xb-msg-env');
const xsenv = require('@sap/xsenv');

xsenv.loadEnv();
const client = new msg.Client(env.msgClientOptions(config.service, [], ['myOutA', 'myOutB']));

function setupOptions(tasks, options) {
    Object.getOwnPropertyNames(tasks).forEach((id) => {
        const task = tasks[id];
        options.destinations[0].ostreams[id] = {
            channel: 1,
            exchange: 'amq.topic',
            routingKey: task.topic
        };
    });
    return options;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return (Math.floor(Math.random() * (max - min + 1)) + min) * 1000;
}

function initTasks(tasks, client) {
    Object.getOwnPropertyNames(tasks).forEach((id) => {
        const task = tasks[id];
        const stream = client.ostream(id);

        const handler = () => {
            console.log('publishing ' + task.topic);

            const message = {
                target: { address: 'topic:' + task.topic },
                payload: Buffer.allocUnsafe(50).fill('X')
            };
            if (!stream.write(message)) {
                console.log('wait');
                return;
            }
            setTimeout(handler, getRandomInt(task.timerMin, task.timerMax));
        };

        stream.on('drain', () => {
            setTimeout(handler, getRandomInt(task.timerMin, task.timerMax));
        });

        setTimeout(handler, getRandomInt(task.timerMin, task.timerMax));
    });
}

client
    .on('connected', () => {
        console.log('connected');
        initTasks(config.taskList, client);
    })
    .on('drain', () => {
        console.log('continue');
    })
    .on('error', (error) => {
        console.log(error);
    });

client.connect();

