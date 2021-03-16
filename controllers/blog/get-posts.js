export default function makeGetListPosts({ listPosts }) {
    return async function getListPosts(httpRequest) {
        const headers = {
            'Content-Type': 'application/json'
        }
        try {
            const posts = await listPosts()
            return {
                headers,
                statusCode: 200,
                body: posts
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