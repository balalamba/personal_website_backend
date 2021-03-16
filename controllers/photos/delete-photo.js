export default function makeDeletePhoto({ deletePhotoFS, deletePhotoDB }) {
    return async function getDeletePhoto(httpRequest) {

        const body = httpRequest.body;
        const headers = {
            'Content-Type': 'application/json'
        }

        try {
            await deletePhotoFS(body)
            await deletePhotoDB(body)
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