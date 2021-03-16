export default function makeAddGallery({ addGallery }) {
    return async function getAddGallery(httpRequest) {
        const body = httpRequest.body;
        const params = httpRequest.params;
        const headers = {
            'Content-Type': 'application/json'
        }
        try {
            const added = await addGallery(body, params)

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