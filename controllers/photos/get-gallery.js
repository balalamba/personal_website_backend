export default function makeGetGallery({ getGallery }) {
    return async function getOneGallery(httpRequest) {
        let body = httpRequest.body;
        const headers = {
            'Content-Type': 'application/json'
        }
        try {
            const gallery = await getGallery(body)
            let albums;
            if (gallery[0]) albums = await getGallery({ property: "parent", value: gallery[0]._id });
            return {
                headers,
                statusCode: 200,
                body: gallery[0] ? Object.assign(gallery[0], { albums }) : {}
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