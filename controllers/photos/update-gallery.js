export default function makeUpdateGallery({ updateGallery }) {
    return async function getUpdateGallery(httpRequest) {
        const body = httpRequest.body;
        const headers = {
            'Content-Type': 'application/json'
        }
        try {
            const added = await updateGallery(body)

            return {
                headers,
                statusCode: 200,
                body: added
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