export default function makeUpdateMessage({ updateMessage }){
    return async function getUpdateMessage(httpRequest){
        const body = httpRequest.body;
        const headers = {
            'Content-Type': 'application/json'
          }
          try {
            const posted = await updateMessage(body)

            return {
                headers,
                statusCode: 200,
                body: posted}
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