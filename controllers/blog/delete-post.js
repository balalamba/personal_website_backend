export default function makeDeletePost({ deletePostFS, deletePostDB }) {
    return async function getDeletePost(httpRequest) {

        const body = httpRequest.body;
        const headers = {
            'Content-Type': 'application/json'
        }

        try {
            await deletePostFS(body)
            await deletePostDB(body)
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