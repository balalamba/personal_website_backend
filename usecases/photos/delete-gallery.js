import fsModule from '../../modules/fs'
export function makeDeleteGalleryDB({ photosDb }) {
    return async function deleteGalleryDB(body) {
        const { _id } = body;
        return await photosDb.remove(_id)
    }
}

export function makeDeleteGalleryFS() {
    return async function deleteGalleryFS(body) {
        const { _id, parent } = body;
        return fsModule.deleteGalleryFiles(_id, parent)
    }
}