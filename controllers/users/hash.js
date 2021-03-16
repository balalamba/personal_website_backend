import bcrypt from 'bcrypt'

export default {
    hashPassword: function hashPassword(password){
        return new Promise((resolve,reject)=>{
            bcrypt.hash(password, 10, function(err, hash) {
                if(err) reject(err)
                resolve(hash)
              });
        })
    },
    compareHash: function compareHash(received,local){
        return new Promise((resolve,reject)=>{
            bcrypt.compare(received, local, function(err, res) {
                if(res) {
                 resolve(true)
                } else {
                 reject(false)
                } 
              });
        })
    } 
}

