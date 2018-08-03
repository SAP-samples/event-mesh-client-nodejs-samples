# Sample application for Messaging Client Node.js

## How To run

  1. Prerequisite: Enable Enterprise Messaging on _SAP CP_ 
      1. Create required _Enterprise Messaging_ service via e.g. `cf cs enterprise-messaging dev enterprise-messaging-service-instance-name -c '{"emname":"sample_application"}'`
      1. Create service key via e.g. `cf csk enterprise-messaging-service-instance-name key-name -c '{"emname":"sample_application"}'`
      1. Get key via e.g. `cf service-key enterprise-messaging-service-instance-name key-name`
      1. Update the `config/cf-sample-config.js` with information of the _service key_
  1. Install required dependencies via `npm install` 
  1. Run sample application
      1. Start producer via `npm run-script producer` (default) or via `node src/producer.js ../config/cf-sample-config.js` (with given config file)
      1. Start consumer via `npm run-script consumer` (default) or via `node src/consumer.js ../config/cf-sample-config.js` (with given config file)


## License
Copyright (c) 2017 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the Apache Software License, v. 2 except as noted otherwise in the [LICENSE file](../LICENSE.txt).