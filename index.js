var adapterAzureServiceBusMessage = require('./adapter-azure-message-bus.js');
var adapterAzureStorageQueue = require('./adapter-azure-storage-queue.js');


// this is mainly for json...
var createJsonMessage = function(queueName, queueMessage){
    queueMessage = JSON.stringify(queueMessage || {});
    this.createPlainMessage(queueMessage);
};

adapterAzureServiceBusMessage.createJsonMessage = createJsonMessage.bind(adapterAzureServiceBusMessage);
adapterAzureStorageQueue.createJsonMessage      = createJsonMessage.bind(adapterAzureStorageQueue);

module.exports = function(adapterType){
    switch(adapterType){
        case 'azureStorageQueue':
            return adapterAzureStorageQueue;
        case 'azureServiceBusMessage':
            return adapterAzureServiceBusMessage;
        default:
            const error = 'Adapter Type Can either "azureServiceBusMessage" or "azureStorageQueue"';
            console.error(error);
            throw error;
            break;
    }
}
