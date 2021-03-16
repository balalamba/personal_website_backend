import { parseImagesFromString, getDeletedImages } from '../../modules/parseImages.js'
import fsModule from '../../modules/fs'
export default function makeAddPost({ addPost, onePost }) {
    return async function postPost(httpRequest) {
        const body = httpRequest.body;
        const headers = {
            'Content-Type': 'application/json'
        }
        try {
            let foundOne = body._id ? await onePost({ property: '_id', value: body._id }) : null;
            let withReplacedImages = await parseImagesFromString(body);
            if (foundOne && foundOne[0].image && withReplacedImages.image) {
                let oldImg = foundOne[0].image;
                let newImg = withReplacedImages.image;
                oldImg.image !== newImg.image ? fsModule.deleteFile(oldImg.image) : null;
                oldImg.thumb !== newImg.thumb ? fsModule.deleteFile(oldImg.image) : null;
            }
            if (foundOne && foundOne[0].content && withReplacedImages.content) {
                let deletedImages = getDeletedImages(foundOne[0].content, withReplacedImages.content);
                deletedImages.forEach(link => {
                    fsModule.deleteFile(link);
                })
            }
            const posted = await addPost(withReplacedImages);
            return {
                headers,
                statusCode: 200,
                body: posted.result
            }
        } catch (e) {
            logger.log({
                level: 'error',
                message: e.message
              })
            return {
                headers,
                statusCode: 400,
                body: {
                    error: e.message
                }
            }
        }
    }
}