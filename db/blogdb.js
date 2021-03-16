export default function makeBlogDb({ makeDb }) {
    return Object.freeze({
        findAll,
        find,
        //   findByPostId, 
        insert,
        remove,
        //   update
    })
    async function findAll() {
        const db = await makeDb()
        const query = {}
        const result = await db.collection('blog').find(query)
        return await result.toArray()
    }
    async function find(props, vals) {
        let properties = [];
        let values = [];
        const db = await makeDb()
        let query = {};
        if (Array.isArray(props) && Array.isArray(vals)) {
            properties = props;
            values = vals;
        } else {
            properties.push(props)
            values.push(vals)
        }

        properties.forEach((property, index) => {
            query[properties[index]] = values[index]
        })
        console.warn(query)
        const result = await db.collection('blog').find(query)
        return (await result.toArray())
    }
    // async function findById () {


    // }
    // async function findByPostId () {

    // }
    async function insert(post) {
        const db = await makeDb()
        return await db
            .collection('blog')
            .update({ _id: post._id }, post, { upsert: true })
    }
    async function remove(id) {
        const db = await makeDb()
        await db.collection('blog').remove({ _id: id })
    }
    // async function update () {

    // }
}