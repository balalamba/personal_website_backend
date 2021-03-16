export default function makeRemoveMessage({ removeMessage }){
    return async function getRemoveMessage(httpRequest){
        const body = httpRequest.body;
        const headers = {
            'Content-Type': 'application/json'
          }
          try {
            const deleted = await removeMessage(body)

            return {
                headers,
                statusCode: 200,
                body: deleted}
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