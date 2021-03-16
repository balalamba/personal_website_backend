export default function makeGetListPosts({blogDb}){
    return async function listPosts(){
        const posts = blogDb.findAll()
        return posts
    }
}