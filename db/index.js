import mongodb from 'mongodb'
import makeBlogDb from './blogdb'
import makePhotosDb from './photosdb'
import makeMessagesDb from './messagesdb'
import makeUserDb from './userdb'

const MongoClient = mongodb.MongoClient
const dbUrl = global.config.dbUrl;
const dbName = global.config.dbName;
const client = new MongoClient(dbUrl, { useNewUrlParser: true })

const ObjectID = mongodb.ObjectID

export async function makeDb() {
    if (!client.isConnected()) {
        await client.connect()
    }
    return client.db(dbName)
}
const blogDb = makeBlogDb({ makeDb })
const photosDb = makePhotosDb({ makeDb })
const messagesDb = makeMessagesDb({ makeDb, ObjectID })
const userDb = makeUserDb({ makeDb })
export { blogDb, photosDb, messagesDb, userDb }