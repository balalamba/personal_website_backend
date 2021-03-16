export default function makeGetPhotoGallery({ photosDb }) {
    return async function getPhotoGallery(request) {
        const gallery = photosDb.find(request.property, request.value)
        return gallery
    }
}