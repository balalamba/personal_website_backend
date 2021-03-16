import { addGallery, pushPhotos } from '../../domains/gallery'

export default function makeUpdateGallery({ photosDb }) {
    return async function updateGallery(body) {

        let toUpdate;
        if (body._id) {
            toUpdate = body;
            if (body.image) toUpdate.image = { image: pushPhotos(body.image).getImage(), thumb: pushPhotos(body.image).getThumb() };
        } else {
            const newGallery = addGallery(body)
            toUpdate = {
                _id: body._id ? body._id : newGallery.getCreatedOn(),
                created: body.created ? body.created : newGallery.getCreatedOn(),
                slug: newGallery.getSlug(),
                title: newGallery.getTitle(),
                subtitle: newGallery.getSubtitle(),
                description: newGallery.getDescription(),
                parent: newGallery.getParent()
            }
            if (body.image) toUpdate.image = { image: pushPhotos(body.image).getImage(), thumb: pushPhotos(body.image).getThumb() };
            if (body.gallery) toUpdate.gallery = body.gallery;
        }


        return photosDb.upsert({ _id: toUpdate._id }, toUpdate)
            // else if (params.galleryId && !params.albumId) {
            //     return photosDb.update({ _id: params.galleryId }, { $set: toUpdate })
            // }

    }
}