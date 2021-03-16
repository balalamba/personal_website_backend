import { makeMessage } from '../../domains/messages'

export default function makeUpdateMessage({messagesDb}){
    return async function updateMessage(messageInfo){
        let { _id, createdOn, ...body } = messageInfo;

        const message = makeMessage(body);
        const id = typeof _id == 'string' ? messagesDb.ObjectID(_id) : _id;
        return messagesDb.upsert(
            { 
                _id: id,
            },
            {
                createdOn:createdOn ? createdOn : message.getCreatedOn(),
                email: message.getEmail(),
                name: message.getName(),
                content: message.getContent(),
                read: message.getRead(),
                important: message.getImportant(),
            }
        )
    }
}