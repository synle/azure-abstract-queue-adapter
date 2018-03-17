# azure-abstract-queue-adapter

## Required Envs:
### For Azure Storage Queue
```
export AZURE_STORAGE_ACCOUNT='...'
export AZURE_STORAGE_ACCESS_KEY='...'
export AZURE_STORAGE_CONNECTION_STRING='...'
```

### For Azure Message Service Bus
```
export AZURE_SERVICEBUS_CONNECTION_STRING='...'
```



## To Install
Install with `npm install`
```
npm install --save azure-abstract-queue-adapter
```

## To Use
```
var AzureAbstractQueueAdapter = require('azure-abstract-queue-adapter');
var queueA = new AzureAbstractQueueAdapter('azureStorageQueue');
var queueB = new AzureAbstractQueueAdapter('azureServiceBusMessage');
```


## Reference
```
createQueue
    Inputs:
        queueName, queueOptions
    Outputs:
        Promise
...
createPlainMessage
    Inputs:
        queueName, queueMessage
    Outputs:
        Promise

createJsonMessage
    Inputs:
        queueName, queueMessage
    Outputs:
        Promise
...
getMessage
    Inputs:
        queueName
    Outputs:
        Promise
            messageText
            messageJson
```
