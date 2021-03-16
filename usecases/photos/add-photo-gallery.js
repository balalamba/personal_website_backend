import { addGallery } from '../../domains/gallery'

export default function makeAddPhotoGallery({ photosDb }) {
    return async function addPhotoGallery(body, params) {
        const newGallery = addGallery(body)
        const time = new Date()
        const added = photosDb.insert({
            _id: time.getTime().toString(),
            slug: newGallery.getSlug(),
            title: newGallery.getTitle(),
            description: newGallery.getDescription(),
            albums: []
        }, params)
        return added
    }
}