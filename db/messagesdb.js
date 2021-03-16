
export default function makeMessagesDb({ makeDb, ObjectID }) {
    return Object.freeze({
        ObjectID,
        findAll, 
        insert,
        upsert,
        remove,
    })
    async function findAll() {
        const db = await makeDb()
        const query = {}
        const result = await db.collection('messages').find(query)
        return (await result.toArray()).map(({ _id: id, ...found }) => ({
            id,
            ...found
        }))
    }

    async function insert (message) {
        const db = await makeDb()
        const result = await db
          .collection('messages')
          .insertOne(message)
        const posted = result.ops[0]
        return posted
    }
    async function remove(messageId) {
        const db = await makeDb()
        return await db.collection('messages').remove({ _id : ObjectID(messageId) })
    }
    async function upsert (filter, body) {
        const db = await makeDb()
        try {
            const updated = await db
                .collection('messages')
                .update(filter, { $set: body }, { upsert: true })
            return updated
        } catch (err) {
            throw new Error(err)
        }
    }
}