export default function makeGetPost({ onePost }) {
    return async function getPost(httpRequest) {
        const headers = {
            'Content-Type': 'application/json'
        }
        try {
            const body = httpRequest.body;
            const post = await onePost(body);

            return {
                headers,
                statusCode: 200,
                body: post
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