
export default function buildMakeMessage(){
    return function makeMessage({
        createdOn = Date.now(),
        name,
        email,
        content,
        read,
        important,
    } = {}){
        if(!name) {
            throw new Error(' No name!')
        }
        if(!email) {
            throw new Error(' No email!')
        }
        if(!content) {
            throw new Error(' No content!')
        }
        if(!read){
            read = false;
        }
        if(!important){
            important = false;
        }
        return Object.freeze({
            getCreatedOn: () => createdOn,
            getEmail: () => email,
            getName: () => name,
            getContent: () => content,
            getRead: () => read,
            getImportant: () => important,
        })
    }
}