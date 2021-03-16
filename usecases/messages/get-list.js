export default function makeGetListMessages({messagesDb}){
    return async function listMessages(){
        const messages = messagesDb.findAll()
        return messages
    }
}