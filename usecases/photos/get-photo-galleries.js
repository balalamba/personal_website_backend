export default function makeGetPhotoGalleries({ photosDb }) {
    return async function listPhotoGalleries() {
        const galleries = await photosDb.findAll()
        return galleries
    }
}