export default function makeGetListGalleries({ getGallery }) {
    return async function getListGalleries(httpRequest) {
        let body = httpRequest.body;
        const headers = {
            'Content-Type': 'application/json'
        }
        try {
            const gallery = await getGallery(body)
            return {
                headers,
                statusCode: 200,
                body: gallery
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