import { makeMessage } from '../../domains/messages'

export default function makeAddMessage({messagesDb}){
    return async function addMessage(messageInfo){
        const message = makeMessage(messageInfo)
        return messagesDb.insert({
            createdOn:message.getCreatedOn(),
            email: message.getEmail(),
            name: message.getName(),
            content: message.getContent(),
        })
         
    }
}