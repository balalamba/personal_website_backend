import hash from './hash'
export default function makeGetRegisterUser({ registerUser, findUser }) {
  return async function getRegisterUser(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }

    try {
      let body = httpRequest.body;
      const foundUser = await findUser(body);
      if (foundUser !== null) {
        throw new Error("User already exists.")
      }
      else {
        let hashPwd = await hash.hashPassword(body.password.toString())
        let toRegister = { ...body, password: hashPwd }
        const user = await registerUser(toRegister)
        const userReponse = {
          email: user.email,
          name: user.name,
          image: user.image
        }
        return {
          headers,
          statusCode: 200,
          body: userReponse
        }
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