'use strict';

const data = { source : { address:'/topic/a.b.#', expires : 'connection-close', timeout : 0 }, logCount : 10000, slowWork : false };
const options = Object.assign({
    // tls : { host : 'localhost', port: 5671 }
    // net : { host : 'localhost', port: 5672 }
    // wss : { host : 'localhost', port: 433, path: '/' }
    // ws  : { host : 'localhost', port: 80, path: '/' }
    // sasl: { user : 'guest', password : 'guest' },
}, (process.argv.length > 2) ? require(process.argv[2]) : {}); options.data = Object.assign(data, options.data);

const { Client } = require('../index');
const client = new Client(options);
const stream = client.receiver('InputA').attach(options.data);
let msgCount = 0, logCount = options.data.logCount;

stream
    .on('subscribed', () => {
        console.log('subscribed');
        if (options.data.slowWork) wait(1000, 250);
    })
    .on('error', (error) => {
        console.log(error);
    })
    .on('data', (message) => {
        message.done();
        if (++msgCount % logCount === 0) console.log(msgCount);
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
        console.log(error);
    })
    .on('disconnected', (hadError, byBroker, statistics) => {
        console.log('disconnected');
        setTimeout(() => client.connect(), 1000);
    });

client.connect();

// wait and work to simulate slow processing

function wait(waitTime, workTime) {
    console.log('wait for', waitTime, 'ms');
    setTimeout(work, waitTime, waitTime, workTime);
    stream.pause();
}

function work(waitTime, workTime) {
    console.log('work for', workTime, 'ms');
    setTimeout(wait, workTime, waitTime, workTime);
    stream.resume();
}

