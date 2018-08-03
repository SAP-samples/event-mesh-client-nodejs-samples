'use strict';

const data = { source : '/topic/a.b.#', maxCount : 100000, logCount : 10000, slowWork : false };
const options = Object.assign({
    // tls : { host : 'localhost', port: 5671 }
    // net : { host : 'localhost', port: 5672 }
    // wss : { host : 'localhost', port: 433, path: '/' }
    // ws  : { host : 'localhost', port: 80, path: '/' }
    // sasl: { user : 'guest', password : 'guest' },
}, (process.argv.length > 2) ? require(process.argv[2]) : {}); options.data = Object.assign(data, options.data);

const { Client } = require('../index');
const { ConsumeStatistics } = require('./tools');
const stats = new ConsumeStatistics(options.data.maxCount, options.data.logCount);

const client = new Client(options);
const stream = client.receiver('InputA').attach(options.data.source);

stats
    .on('info', (count) => {
        console.log(count);
    })
    .on('done', () => {
        client.disconnect();
    });

stream
    .on('subscribed', () => {
        console.log('attached');
        if (options.data.slowWork) wait(1000, 250);
    })
    .on('error', (error) => {
        console.log(error.message);
    })
    .on('data', (message) => {
        stats.onReceive();
        message.done();
    });

client
    .on('connected',(destination, peerInfo) => {
        console.log('connected', peerInfo.description);
    })
    .on('idle', (local) => {
        console.log(local ? 'idle' : 'heartbeat');
    })
    .on('assert', (error) => {
        console.log(error.message);
    })
    .on('error', (error) => {
        console.log(error.message);
    })
    .on('reconnecting', (destination) => {
        console.log('reconnecting, using destination ' + destination);
    })
    .on('disconnected', (hadError, byBroker, statistics) => {
        console.log('disconnected');
        stats.print(statistics);
    });

client.connect();

// wait and work to simulate slow processing

function wait(waitTime, workTime) {
    if (stats.ready()) return;
    console.log('wait for', waitTime, 'ms');
    setTimeout(work, waitTime, waitTime, workTime);
    stream.pause();
}

function work(waitTime, workTime) {
    if (stats.ready()) return;
    console.log('work for', workTime, 'ms');
    setTimeout(wait, workTime, waitTime, workTime);
    stream.resume();
}

