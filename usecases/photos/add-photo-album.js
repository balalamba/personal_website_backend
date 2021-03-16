import { addGallery } from '../../domains/gallery'

export default function makeAddPhotoAlbum({ photosDb }) {
    return async function addPhotoAlbum(body, params) {
        const newGallery = addGallery(body);
        const time = new Date()
        const toAdd = {
            _id: time.getTime().toString(),
            slug: newGallery.getSlug(),
            title: newGallery.getTitle(),
            description: newGallery.getDescription()
        };

        const added = photosDb.update({ _id: params.galleryId }, { $push: { albums: toAdd } })

        return added
    }
}