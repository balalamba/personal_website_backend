export default function makeGetListPosts({ listMessages }){
    return async function getListMessages(httpRequest){ 
        const headers = {
            'Content-Type': 'application/json'
          }
          try {
            const messages = await listMessages()

            return {
                headers,
                statusCode: 200,
                body: messages}
          } catch(e){
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