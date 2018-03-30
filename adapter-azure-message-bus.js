const azureCore = require('azure');
const queueAzureServiceBusSvc = azureCore.createServiceBusService();

// azure message bus queue
const _createAzureServiceBusQueue = async (queueName, queueOptions) =>{
    return new Promise((resolve, reject) => {
        queueOptions = Object.assign({
            MaxSizeInMegabytes: '5120',
            DefaultMessageTimeToLive: 'PT1M'
        }, queueOptions || {});


        queueAzureServiceBusSvc.createQueueIfNotExists(queueName, queueOptions, function(error){
            if(!error){
                // Queue exists
            }
            resolve();
        });
    });
}

const _enqueueAzureServiceBusMessage = async (queueName, queueMessage, queueMessageId) => {
    // api: http://azure.github.io/azure-sdk-for-node/azure-sb/latest/ServiceBusService.html#sendQueueMessage
    
    return new Promise((resolve, reject) => {
        queueAzureServiceBusSvc.sendQueueMessage(
            queueName, 
            {
                body: queueMessage,
                brokerProperties: {
                    // TODO: this propery is a way to dedup messages within azure service bus...
                    MessageId: queueMessageId || queueMessage || Date.now(), 
                },
            },
            function(error){
                if(!error){
                    resolve();
                } else{
                    reject();
                }
            }
        );
    });
}

const _dequeueAzureServiceBusMessage = async (queueName) => {
    return new Promise((resolve, reject) => {
        queueAzureServiceBusSvc.receiveQueueMessage(queueName, function(error, receivedMessage){
            if(!error){
                var resp = Object.assign(
                    {
                        messageJson: {},
                        messageText: receivedMessage.body,
                    },
                    receivedMessage
                );
                try{
                    resp.messageJson = JSON.parse(receivedMessage.body || '{}');
                    resolve(resp);
                } catch(e){
                    reject({message: resp, error: e});
                }
            } else {
                reject(error);
            }
        });
    });
}


module.exports = {
    createQueue: _createAzureServiceBusQueue,
    createPlainMessage: _enqueueAzureServiceBusMessage,
    getMessage: _dequeueAzureServiceBusMessage
}
