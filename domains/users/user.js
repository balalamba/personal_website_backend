
export default function buildMakeUser(){
    return function makeUser({
        createdOn = Date.now(),
        name,
        email,
        emailConfirmed = false,
        image = null,
        password,
    } = {}){
        if(!name) {
            throw new Error(' No name!')
        }
        if(!email) {
            throw new Error(' No email!')
        }
        if(!password) {
            throw new Error(' No password!')
        }

        return Object.freeze({
            getCreatedOn: () => createdOn,
            getEmail: () => email,
            getemailConfirmed: ()=>emailConfirmed,
            getImage:()=>image,
            getName: () => name,
            getPassword: () => password,
        })
    }
}
