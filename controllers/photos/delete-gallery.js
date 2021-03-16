export default function makeDeleteGallery({ deleteGalleryFS, deleteGalleryDB }) {
    return async function getDeleteGallery(httpRequest) {

        const body = httpRequest.body;
        const headers = {
            'Content-Type': 'application/json'
        }

        try {
            await deleteGalleryFS(body)
            await deleteGalleryDB(body)
            return {
                headers,
                statusCode: 200,
                body: {}
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