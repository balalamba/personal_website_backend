export default function makeGetOnePost({ blogDb }) {
    return async function getOnePost(request) {
        return await blogDb.find(request.property, request.value)
    }
}