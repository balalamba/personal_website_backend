import buildAddGallery from "./gallery";
import buildAddPhoto from "./image"
export const addGallery = buildAddGallery()
export const pushPhotos = buildAddPhoto()
export default { pushPhotos, addGallery }