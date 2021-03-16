export default function makePhotosDb({ makeDb }) {
    return Object.freeze({
        findAll,
        //   findById,
        //   findByPostId,
        upsert,
        find,
        insert,
        removePhoto,
        remove,
        update
    })
    async function findAll() {
        const db = await makeDb()
        const query = {}
        const result = await db.collection('photos').find(query)
        return (await result.toArray())
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
        const result = await db.collection('photos').find(query)
        return (await result.toArray())
    }
    // async function findById () {


    // }
    async function remove(id) {
        const db = await makeDb()
        await db.collection('photos').remove({ _id: id })
    }
    async function insert(gallerie, params) {
        const db = await makeDb()
        const result = await db
            .collection('photos')
            .insertOne(gallerie)
        const posted = result.ops[0]
        return posted
    }
    async function removePhoto(_id, photoObj) {
        const db = await makeDb()
            //db.photos.update({"_id" : "1586954018616"},{ $pull: {gallery:{image:"img/photos/1586954018616/DSC_2177.jpg",thumb : "img/photos/1586954018616/thumbs/DSC_2177.jpg"}}})
            //db.photos.update({"_id" : "1586954018616","albums._id": "1586971697105"},{ $pull: {"albums.$.gallery":{image:"img/photos/1586954018616/1586971697105/DSC_2177.jpg",thumb : "img/photos/1586954018616/1586971697105/thumbs/DSC_2177.jpg"}}})
        return await db.collection('photos').update({ "_id": _id }, { $pull: { gallery: { image: photoObj.image, thumb: photoObj.thumb } } })
    }
    async function upsert(filter, body) {
        const db = await makeDb()
        try {
            const updated = await db
                .collection('photos')
                .update(filter, { $set: body }, { upsert: true })
            return updated
        } catch (err) {
            throw new Error(err)
        }
    }
    async function update(filter, body) {
        const db = await makeDb()
        try {
            const updated = await db
                .collection('photos')
                .updateOne(filter, body)
            return updated
        } catch (err) {
            throw new Error(err)
        }


    }
}