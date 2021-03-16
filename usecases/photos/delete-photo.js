import fsModule from '../../modules/fs'
export function makeDeletePhotoDB({ photosDb }) {
    return async function deletePhotoDB(body) {
        const { _id, image } = body;
        return await photosDb.removePhoto(_id, image)
    }
}

export function makeDeletePhotoFS() {
    return async function deletePhotoFS(body) {
        const { image } = body;
        return fsModule.deleteMultipleFile(image)
    }
}