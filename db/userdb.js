
export default function makeUserDb({ makeDb }) {
    let collection = 'users'
    return Object.freeze({
        findAll,
        findOne,
        //   findByPostId, 
          insert,
        //   remove,
        //   update
    })
    async function findAll() {
        const db = await makeDb()
        const query = {}
        const result = await db.collection(collection).find(query)
        return (await result.toArray()).map(({ _id: id, ...found }) => ({
            id,
            ...found
        }))
    }

    async function findOne (user) {
        const db = await makeDb()
        return await db.collection(collection).findOne(user) 
    }
    // async function findByPostId () {

    // }
    async function insert (user) {
        const db = await makeDb()
        const result = await db
          .collection(collection)
          .insertOne(user)
        const registered = result.ops[0]
        return registered
    }
    // async function remove () {

    // }
    // async function update () {

    // }
}