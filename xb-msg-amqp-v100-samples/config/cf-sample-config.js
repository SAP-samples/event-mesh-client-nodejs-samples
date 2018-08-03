'use strict';

const fs = require('fs');

module.exports = {
  uri              : 'wss://em.cfapps.<region>.ondemand.com/protocols/amqp10ws',
  oa2 :{
    endpoint     : 'https://authentication.<region>.ondemand.com/oauth/token',
    client       : '<client_id>',
    secret       : '<client_secret>'
  },
  credentials: {
    mechanism    : '',
    user         : '',
    password     : ''
  },
  data: {
    source       : 'queue:SampleForAQueue',
    target       : 'topic:sample/for/a/topic',
    payload      : new Buffer.allocUnsafe(20),
    maxCount     : 100,
    logCount     : 10
  }
};

