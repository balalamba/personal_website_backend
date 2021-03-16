import hash from './hash'
import jwt from 'jsonwebtoken';
export default function makeGetLoginUser({ findUser }) {
  return async function getLoginUser(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      let body = httpRequest.body 
      let pwd = body.password.toString()
      const user = await findUser({...body,password:pwd})
      
      if (user !== null) { 
        let ifCorrectPassword = await hash.compareHash(pwd, user.password)
        if (ifCorrectPassword) {
          let params = { id: user.name,email:user.email,confirmed:user.emailconfirmed}
          const jwttoken = jwt.sign(params, global.config.jwttoken);
          const userReponse = {
            email: user.email,
            emailconfirmed: user.emailconfirmed,
            name: user.name,
            image: user.image,
            token:jwttoken
          }
          
          return {
            headers,
            statusCode: 200,
            body: userReponse
          }
        }
      }
      else {
        throw new Error('Password is not correct!')
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