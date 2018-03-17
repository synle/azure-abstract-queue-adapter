var adapterAzureServiceBusMessage = require('./adapter-azure-message-bus.js');
var adapterAzureStorageQueue = require('./adapter-azure-storage-queue.js');

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
