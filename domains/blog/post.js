export default function buildMakePost() {
    return function makePost({
        title,
        published,
        subtitle,
        // createdOn = Date.Now(),
        image,
        gallery,
        // gallery_thumbs,
        tags,
        locale,
        slug,
        content
    } = {}) {
        if (!title) {
            throw new Error(' No title!')
        }
        if (!subtitle) {
            throw new Error(' No subtitle!')
        }
        if (!locale) {
            throw new Error(' No locale!')
        }
        if (!slug) {
            throw new Error(' No slug!')
        }
        if (!content) {
            throw new Error(' No content!')
        }
        let date = new Date()
        return Object.freeze({
            getTitle: () => title,
            getPublished: () => typeof published === "boolean" ? published : false,
            getSubtitle: () => subtitle,
            getCreatedOn: () => date.getTime().toString(),
            getImage: () => image,
            // getThumb: () => thumb,
            getGallery: () => gallery,
            // getGalleryThumbs: () => gallery_thumbs,
            getTags: () => tags,
            getLocale: () => locale,
            getSlug: () => slug,
            getContent: () => content,
        })
    }
}