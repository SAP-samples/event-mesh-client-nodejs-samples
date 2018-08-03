'use strict';

const data = { logCount : 1000, verbose: false };
const options = Object.assign({
    // tls : { host : '0.0.0.0', port: 5671 }
    // net : { host : '0.0.0.0', port: 5672 }
    // wss : { host : '0.0.0.0', port: 433, path: '/', backlog: 511 }
    // ws  : { host : '0.0.0.0', port: 80, path: '/', backlog: 511 }
    // sasl: { mechanism: 'ANONYMOUS PLAIN EXTERNAL' }
}, (process.argv.length > 2) ? require(process.argv[2]) : {}); options.data = Object.assign(data, options.data);

const AMQP = require('../index');
const server = new AMQP.Server(options);

server
    .on('listening', (type, host, port) => {
        console.log('%s server listening at port %d host %s', type, port, host);
    })
    .on('authenticate', (type, data, request, callback) => {
        if (options.data.verbose) console.log('ws upgrade request');
        callback();                         // approve ws upgrade, type: 'Basic' or 'Bearer'
    })
    .on('error', (error) => {
        console.log(error.message);
    })
    .on('close', () => {
        console.log('server close');
    })
    .on('connection', (connection) => {

        connection
            .on('authenticate', (mechanism, data, callback) => {
                if (options.data.verbose)
                    console.log('authenticate "%s" for "%s"', mechanism, data.user ? data.user : data.identity );
                callback();                  // approve client SASL request
            })
            .on('valid', () => {
                if (options.data.verbose)
                    console.log('authenticated');
            })
            .on('ready', (peerInfo) => {
                console.log('ready', peerInfo.description);
            })
            .on('idle', (local) => {         // idle state, local socket timeout or incoming empty frame or ws ping
                console.log(local ? 'idle' : 'heartbeat');
            })
            .on('final', (hadAssert, closeTimeout) => {
                console.log('final');        // ending without immediate close, server can set individual close timer
            })
            .on('assert', (error) => {
                console.log(error.message);  // peer protocol error, container close with error, connection is ending
            })
            .on('error', (error) => {
                console.log(error.message);  // any error occurred, but no assert (if assert event is handled)
            })
            .on('abort', (hadError) => {
                console.log('abort');        // closed while authentication
            })
            .on('close', (hadError) => {
                console.log('close');        // closed after authentication
            })
            .on('session', (endpoint) => {
                if (options.data.verbose)
                    console.log('session');  // new session opened the very first time, on client request
            })
            .on('sender', (endpoint) => {
                if (options.data.verbose)
                    console.log('sender');   // new outgoing link opened the very first time, on client request
            })
            .on('receiver', (endpoint) => {
                if (options.data.verbose)
                    console.log('receiver'); // new incoming link opened the very first time, on client request

                let cnt = 0;
                endpoint.stream().on('data', (message) => {
                    message.done();
                    if (++cnt % options.data.logCount === 0) console.log(cnt);
                });
            })
        ;

    })
;

server.listen();

