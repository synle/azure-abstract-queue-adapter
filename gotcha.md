## Clear / Clean up Azure Message Service Bus Dead Letter Queue
Dead Letter Queue is stored in the sub-queue called `${queueName}/$DeadLetterQueue`

Source: https://medium.com/@DomBurf/clearing-the-dead-letter-queue-on-an-azure-service-bus-queue-3c942b312f98

```
var azure = require('azure');
var serviceBusService = azure.createServiceBusService();

async function _purgeDeadLetterQueue(queueName){
    return new Promise(resolve => {
        serviceBusService.receiveQueueMessage(`${queueName}/$DeadLetterQueue`, function(error, receivedMessage){
            if(error){
                console.log('no messages...', error, receivedMessage);
                process.exit();
                return;
            }
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
