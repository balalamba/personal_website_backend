import makeUser from '../../domains/users'


export default function makeRegisterUser({userDb}){
    return async function registerUser(userInfo){
        const user = makeUser(userInfo)
        return userDb.insert({
            createdOn:user.getCreatedOn(),
            email: user.getEmail(),
            emailconfirmed:user.getemailConfirmed(),
            name: user.getName(),
            image: user.getImage(),
            password:user.getPassword()
        })
         
    }
}

