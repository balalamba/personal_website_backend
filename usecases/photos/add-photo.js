import { pushPhotos } from '../../domains/gallery'

export default function makeAddPhotos({ photosDb }) {
    return async function addPhotos(body) {
        if (body.photos) {
            const newGallery = body.photos.map(photo => pushPhotos(photo));
            const toUpdate = {
                gallery: newGallery.map((photo) => ({
                    image: photo.getImage(),
                    thumb: photo.getThumb()
                })),
            };
            return photosDb.update({ _id: body._id }, { $push: { gallery: { $each: toUpdate.gallery } } })

        }

    }
}