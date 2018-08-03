'use strict';

const data = { target: '/topic/a.b.c', payload: new Buffer.allocUnsafe(50).fill('X'), maxCount: 100000, logCount: 10000 };
const options = Object.assign({
    // tls : { host : '127.0.0.1', port: 5671 }
    // net : { host : '127.0.0.1', port: 5672 }
    // wss : { host : 'localhost', port: 433, path: '/' }
    // ws  : { host : 'localhost', port: 80, path: '/' }
    // sasl: { user: 'guest', password: 'guest' },
}, (process.argv.length > 2) ? require(process.argv[2]) : {}); options.data = Object.assign(data, options.data);

const { Client } = require('@sap/xb-msg-amqp-v100');
const { ProduceStatistics } = require('./tools');
const stats = new ProduceStatistics(true, options.data.maxCount, options.data.logCount);
const message = { payload : options.data.payload, done : stats.onDone, failed : stats.onFailed };

const client = new Client(options);
const stream = client.sender('out').attach(options.data.target, '', options.data.maxCount);

function send() {
    stats.onSend();

    let noPause = true;
    while (noPause && stats.countMessage()) {
        noPause = stream.write(message);
    }

    if (noPause) {
        stats.onStop();
    } else {
        stats.onWait();
    }
}

stats
    .on('info', (count) => {
        console.log(count);
    })
    .on('error', (error) => {
        console.log(error.message);
    })
    .on('done', () => {
        stream.end();
    });

stream
    .on('ready', () => {
        send();
    })
    .on('drain', () => {
        send();
    })
    .on('finish', () => {
        client.disconnect();
    });

client
    .on('connected',(destination, peerInfo) => {
        console.log('connected', peerInfo.description);
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

