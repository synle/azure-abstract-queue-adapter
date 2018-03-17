const _createAzureStorageQueue = async (queueName, queueOptions) =>{
    return new Promise((resolve, reject) => {
        queueAzureStorageSvc.createQueueIfNotExists(queueName, function(error, result, response){
            if(!error){
                resolve(result);
            }
            else {
                console.error('[Create Queue] [Error]', queueName, error);
                reject(error);
            }
        });

    });
}

const _enqueueAzureStorageMessage = async (queueName, queueMessage) => {
    return new Promise((resolve, reject) => {
        queueAzureStorageSvc.createMessage(queueName, queueMessage, function(error, result, response){
            if(!error){
                resolve(result);
            } else {
                console.error('[Create Queue Message] Error', queueName, queueMessage, error);
                reject(error);
            }
        });
    });
}

const _dequeueAzureStorageMessage = async (queueName) => {
    return new Promise((resolve, reject) => {
        queueAzureStorageSvc.getQueueMetadata(queueName, function(err1, result, response){
            if(!err1){
                queueAzureStorageSvc.getMessages(queueName, function(err2, result, response){
                    if(!err2 && result.length > 0){
                        var message = result[0];
                        queueAzureStorageSvc.deleteMessage(
                            queueName,
                            message.messageId,
                            message.popReceipt,
                            function(err3, response){
                                if(!err3){
                                    try{
                                        message.messageJson  = JSON.parse(message.messageText);
                                    } catch(e){}
                                    return resolve(message);
                                } else {
                                    console.error('[Dequeue Message] [Error] Cant delete the message', queueName, err3);
                                    reject(err3);
                                }
                            }
                        );
                    } else {
                        console.error('[Dequeue Message] [Error] Queue is empty...', queueName, err2);
                        reject(err2)
                    }
                });
            }
        });
    });
}

module.exports = {
    createQueue: _createAzureStorageQueue,
    createPlainMessage: _enqueueAzureStorageMessage,
    getMessage: _dequeueAzureStorageMessage
}
