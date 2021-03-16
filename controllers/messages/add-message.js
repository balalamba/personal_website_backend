export default function makeAddMessage({ addMessage, sendMail }){
    return async function postMessage(httpRequest){
        const body = httpRequest.body;
        const headers = {
            'Content-Type': 'application/json'
          }
          try {
            const posted = await addMessage(body)
            await sendMail(body)
            setTimeout(() => {sendMail(body, true)}, 10000)
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