'use strict';

 /**
  * timerMin (seconds) - the minimum time interval to produce a message
  * timerMax (seconds) - the maximum time interval to produce a message
  */

const service = 'myrabbitmq';
const taskList = {
    myOutA : { topic: 'Sales/Order/Created'        , timerMin: 1, timerMax: 11 },
    myOutB : { topic: 'Outbound/Delivery/Released' , timerMin: 5, timerMax:  8 }
};

module.exports.taskList = taskList;
module.exports.service= service;

