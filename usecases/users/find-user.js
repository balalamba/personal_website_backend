export default function makeLoginUser({userDb}){
    return async function loginUser(userInfo){
        // FIND BY NAME ONLY OR WITH PASSWORD ?
        return userDb.findOne({
            email: userInfo.email
        })
         
    }
}