import makePost from '../../domains/blog'

export default function makeAddPost({ blogDb }) {
    return async function addPost(postInfo) {
        const post = makePost(postInfo)
        return blogDb.insert({
            _id: postInfo._id ? postInfo._id : post.getCreatedOn(),// TODO
            created: postInfo.created ? postInfo.created : post.getCreatedOn(),
            title: post.getTitle(),
            published: post.getPublished(),
            subtitle: post.getSubtitle(),
            image: post.getImage(),
            gallery: post.getGallery(),
            locale: post.getLocale(),
            slug: post.getSlug(),
            tags: post.getTags(),
            content: post.getContent(),
        })

    }
}