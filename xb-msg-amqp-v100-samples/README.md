# Sample application for Messaging Client Node.js

## Description
Sample application (plain Node.js) of how to use the _Event Mesh Client_ to send and receive messages via _SAP Event Mesh_.

## How To run
This section includes the _Prerequisite_, describe _how to install_ and _how to configure_ this basic sample.

  1. Prerequisite: Enable Event Mesh on _SAP BTP_ 
      1. Create required _Event Mesh_ service via e.g. `cf cs enterprise-messaging dev event-mesh-service-instance-name -c '{"emname":"sample_application"}'`
      1. Create service key via e.g. `cf csk event-mesh-service-instance-name key-name -c '{"emname":"sample_application"}'`
      1. Get key via e.g. `cf service-key event-mesh-service-instance-name key-name`
      1. Update the `config/cf-sample-config.js` with information of the _service key_
  1. Install required dependencies via `npm install` 
  1. Run sample application
      1. Start producer via `npm run-script producer` (default) or via `node src/producer.js ../config/cf-sample-config.js` (with given config file)
      1. Start consumer via `npm run-script consumer` (default) or via `node src/consumer.js ../config/cf-sample-config.js` (with given config file)

## Support
This project is _'as-is'_ with no support, no changes being made.  
You are welcome to make changes to improve it but we are not available for questions or support of any kind.

## License
Copyright (c) 2017 SAP SE or an SAP affiliate company. All rights reserved.  
This file is licensed under the _SAP SAMPLE CODE LICENSE AGREEMENT, v1.0-071618_ except as noted otherwise in the [LICENSE file](../LICENSE.txt).
