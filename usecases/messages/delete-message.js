export default function makeRemoveMessage({messagesDb}){
    return async function removeMessage(messageInfo){ 
        return messagesDb.remove(messageInfo._id)
    }
}