
export default function buildAddImage(){
    return function makeImage({
        image,
        thumb
    } = {}){
        if(typeof image != "string" && !image.length) {
            throw new Error(' No image link!')
        } 
        if(typeof thumb != "string" && !thumb.length) {
            throw new Error(' No thumb link!')
        }
        return Object.freeze({
            getImage: () => image,
            getThumb: () => thumb,
        })
    }
}