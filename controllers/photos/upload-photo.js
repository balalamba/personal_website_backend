import formidable from 'formidable'
import shell from 'shelljs'



function getRealPath(isThumbs, files) {
    let newPaths = []
    for (const chunk in files) {
        if (Array.isArray(files[chunk])) {
            files[chunk].forEach(photo => newPaths.push(Object.assign({ photo }, { isThumbs, path: photo.path.replace(global.config.staticPath, "") })))
        } else {
            newPaths.push(Object.assign({ photo: files[chunk] }, { isThumbs, path: files[chunk].path.replace(global.config.staticPath, "") }))
        }

    }
    return newPaths
}

export default function makeUploadPhoto() {
    return async function getUploadPhoto(httpRequest) {
        const body = httpRequest.body;
        const params = httpRequest.params;
        const isThumbs = params.thumbs == 'true' ? true : false
        const thumbSuffix = isThumbs ? 'thumbs/' : '';
        const headers = {
            'Content-Type': 'multipart/form-data'
        }
        try {
            let formidableOptions = {
                multiples: true,
                uploadDir: "img",
                keepExtensions: true
            };
            const form = formidable(formidableOptions)
            form.on('fileBegin', (name, file) => {
                let path = global.config.staticPath + "/" + form.uploadDir + name + thumbSuffix;
                shell.mkdir('-p', path);
                file.path = path + file.name;
            });

            var formfields = await new Promise(function(resolve, reject) {
                form.parse(httpRequest, (e, fields, files) => {
                    if (e) {
                        logger.log({
                            level: 'error',
                            message: e.message
                          })
                        throw new Error(e)
                    }
                    let realPaths = getRealPath(isThumbs, files)
                    resolve(realPaths)
                });
            })


            return {
                headers,
                statusCode: 200,
                body: formfields
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