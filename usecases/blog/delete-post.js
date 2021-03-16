import fsModule from '../../modules/fs'
export function makeDeletePostDB({ blogDb }) {
    return async function deletePostDB(body) {
        const { _id } = body;
        return await blogDb.remove(_id)
    }
}

export function makeDeletePostFS() {
    return async function deletePostFS(body) {
        const { locale, slug } = body;
        return fsModule.deletePostFiles(locale, slug)
    }
}