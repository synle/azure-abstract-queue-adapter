Clear / Clean up Azure Message Service Bus Dead Letter Queue
```
var azure = require('azure');
var _ = require('lodash');
var serviceBusService = azure.createServiceBusService();

var count = 1;

async function _purgeDeadLetterQueue(queueName){
    return new Promise(resolve => {
        serviceBusService.receiveQueueMessage(`${queueName}/$DeadLetterQueue`, function(error, receivedMessage){
            if(error){
                console.log('no messages...', error, receivedMessage);
                process.exit();
                return;
            }
            console.log(
                [
                    count++,
                    _.get(receivedMessage, 'brokerProperties.EnqueuedTimeUtc'),
                    _.get(receivedMessage, 'body'),
                ].join(' - ')
            );
            resolve();
        });
    });
}


async function _doWork(){
    while(true){
        await _purgeDeadLetterQueue('myQueue');
    }
}



_doWork();
```
