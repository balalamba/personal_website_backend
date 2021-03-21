import fs from 'fs'
const Buffer = require('buffer').Buffer;
const path = require('path');
const del = require('del');

var fsModule = {};

// fsModule.encode_base64 = function(filename) {
//     fs.readFile(path.join(__dirname, '/public/', filename), function(error, data) {
//         if (error) {
//             throw error;
//         } else {
//             let buf = Buffer.from(data);
//             let base64 = buf.toString('base64');
//             // console.log('Base64 ' + filename + ': ' + base64);
//             return base64;
//         }
//     });
// };
fsModule.decode_base64 = async function(base64str, filename) {
    const subfolder = global.config.blogFolder + '/';
    let buf = Buffer.from(base64str, 'base64');

    return new Promise((resolve, reject) => {
        fs.writeFile(path.join(__dirname, '../' + global.config.staticPath + subfolder, filename), buf, function(error) {
            if (error) reject(error)
            resolve(subfolder + filename)
        })
    })
}
fsModule.deleteMultipleFile = function(fileObject) {
    return Promise.all(
        Object.keys(fileObject).map(async(entity) => {
            return await this.deleteFile(fileObject[entity])
        })
    )
}

fsModule.deletePostFiles = function(locale, slug) {
    const subfolder = global.config.blogFolder + '/';
    let fullPath = path.join(__dirname, '../' + global.config.staticPath + subfolder + locale + '/' + slug);
    return new Promise((resolve, reject) => {
        fs.rmdir(fullPath, { recursive: true }, function(error) {
            if (error) reject(error);
            resolve();
        })
    })

}
fsModule.deleteGalleryFiles = async function(_id, parent) {
    const photosfolder = global.config.photosFolder + '/';
    let fullPath = path.join(__dirname, '../' + global.config.staticPath + photosfolder, _id);
    return await del([fullPath + '/**', fullPath], {force:true});

}

fsModule.deleteFile = function(filepath) {
    return new Promise((resolve, reject) => {
        fs.unlink(path.join(__dirname, '../' + global.config.staticPath + filepath), function(err) {
            if (err) reject(err);
            resolve()
        });

    })
}


export default fsModule