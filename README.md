# azure-abstract-queue-adapter

## Setup / Required Envs:
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
### Include the library
```
var AzureAbstractQueueAdapter = require('azure-abstract-queue-adapter');
```

### Get an adapter to use
#### Storage Queue
```
var queueAdapterA = new AzureAbstractQueueAdapter('azureStorageQueue');
```

#### Azure Service Bus
```
var queueAdapterB = new AzureAbstractQueueAdapter('azureServiceBusMessage');
```


### Create Message
#### Create Message with JSON
```
async function createMessage(){
    await queueAdapterA.createJsonMessage(
        'myQueue', 
        {name: 'aaa', value: 'bbb'},
        'myQueueMessageId123' // optional...
    )
}
```

#### Create Message with plain string
```
async function createMessage(){
    await queueAdapterA.createPlainMessage(
        'myQueue',
        'myQueueMessage',
        'myQueueMessageId123' // optional...
    )
}
```


### Receive Message
```
try{
    const { messageJson, messageText} = await queueAdapterA.getMessage(dlqName);
    // queue message is popped...
} catch(e){
    // queue is empty
}
```




## Reference
```
createQueue
    Inputs:
        queueName
        queueOptions
    Outputs:
        Promise
...
createPlainMessage
    Inputs:
        queueName
        queueMessage
        queueMessageId
    Outputs:
        Promise

createJsonMessage
    Inputs:
        queueName
        queueMessage
        queueMessageId
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
