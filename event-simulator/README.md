# Event Simulator

Simulates events/messages and logs them via console.

## Prerequisites
In case you want to run the example application locally you need to install a RabbitMQ.

## Installation
````
npm install
````

## Run Locally
````
npm start
````

## Run in Cloud Foundry
Please adjust the [manifest.yml](manifest.yml)
````
cf push
````
You may check the logs via:
````
cf logs msg-event-simulator --recent
````


## License
Copyright (c) 2017 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the Apache Software License, v. 2 except as noted otherwise in the [LICENSE file](../LICENSE.txt).