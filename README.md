# Messaging Client Node.js - Samples for SAP Cloud Platform Enterprise Messaging

## Description
SAP Cloud Platform Enterprise Messaging provides a cloud-based messaging framework for the development of decoupled and resilient services and integration flows (using SAP Cloud Integration) to support asynchronous communication principles.
Direct integration with SAP S/4HANA Business Event Handling allows efficient development of innovative and scaling extensions.

This repository provides documentation and samples of how to use the Messaging Client (Node.js) for messaging via SAP Cloud Platform Enterprise Messaging in the Cloud Foundry environment. Details on each sample application and the covered scenario are described in the table _List of content and sample projects_ below.

For more details of SAP Cloud Platform Enterprise Messaging take a look at the [SAP Cloud Platform Enterprise Messaging on SAP Help portal](https://help.sap.com/viewer/product/SAP_ENTERPRISE_MESSAGING/Cloud/en-US).

This repository provides samples of how to use the Messaging Client (Node.js) for messaging via SAP Cloud Platform Enterprise Messaging in the Cloud Foundry environment.

## List of content and sample projects

|Sample/Content|Scenario|Scenario Description|
|---|---|---|
|[xb-msg-amqp-v100-doc](xb-msg-amqp-v100-doc)|Node.js Messaging Client documentation (includes basic sample)|Documentation and related samples which shows how this library provides a messaging client as well as classes to realize a server for `AMQP 1.0`|
|[xb-msg-amqp-v100-samples](xb-msg-amqp-v100-samples)|Basic Messaging Sample which runs locally|This sample demonstrates how each application (plain Node.js, non SAP CP) can use the _Enterprise Messaging Client_ to send and receive messages via _SAP Cloud Platform Enterprise Messaging_. Therefore the messaging sample consists of a `consumer.js` and a `producer.js` which provides the corresponding functionality for send/receive (and the `config/cf-sample-config.js` to configure the sample)|
|[event-simulator](event-simulator)|Event Simulator for SAP CP deployment|The Event Simulator application demonstrates a scenario where events are emitted and send as messages via Enterprise Messaging which were consumed and further processed (i.e. logged via console). Therefore the messaging sample consists of a `main.js` which provides the corresponding functionality and start the simulation (and a `config.js` to configure the sample)|

## Requirements
To run the samples a running `Enterprise Messaging Service @SAP CP` is required.  
Further necessary configuration and settings are dependent on the specific sample and are documented there.

## Download and Installation
To download and install the samples just clone this repository via:
```
git clone https://github.com/SAP/enterprise-messaging-client-nodejs-samples
```

For details on how to configure and run the samples please take a look into the README in the corresponding samples directory.


## Support
This project is _'as-is'_ with no support, no changes being made.  
You are welcome to make changes to improve it but we are not available for questions or support of any kind.

## License
Copyright (c) 2018 SAP SE or an SAP affiliate company. All rights reserved.  
This file is licensed under the _SAP SAMPLE CODE LICENSE AGREEMENT, v1.0-071618_ except as noted otherwise in the [LICENSE file](./LICENSE.txt).
