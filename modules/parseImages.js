import fsModule from './fs';

async function getImageLink(name, path, match) {
    var matched = /([a-zA-Z]{3,4});base64,(.+)/g.exec(match);
    var image = { extension: matched[1], image: matched[2], }
    return new Promise(async(resolve, reject) => {
        let link = await fsModule.decode_base64(image.image, path + '/' + name + "." + image.extension)
        resolve(link)
    })
};

export const findImageLinks = function(content) {
    let regex = /img(.*?\n?.*?)src=[\"\'](\/.*?)(?=[\'\"])/gs;
    var match = regex.exec(content);
    let links = [];
    while (match != null) {
        links.push(match[2])
        match = regex.exec(content);
    }
    return links
};

export const getDeletedImages = function(oldContent, newContent) {
    let oldImgs = findImageLinks(oldContent);
    let newImgs = findImageLinks(newContent);
    return oldImgs.filter(function(i) { return newImgs.indexOf(i) < 0; });
};

export const parseImagesFromString = async function(body) {

    let slug = body.slug;
    let content = body.content;
    var cont = content.replace(/\"/g, '\'')
    var regex = /(data:image\/([a-zA-Z]{3,4});)(base64,)([a-zA-Z\d\S]*?)(?=[\'\"])/g;
    let path = [body.locale, body.slug].join('/')
    let newcontent = await replaceAsync(slug, cont, regex, path, getImageLink)
    return Object.assign(body, { content: newcontent })
};


export const replaceAsync = async function(slug, str, regex, path, asyncFn) {
    const promises = [];
    let i = 0;
    str.replace(regex, match => {
        i++;
        const promise = asyncFn(slug + "-" + i, path, match);
        promises.push(promise);
    });
    const data = await Promise.all(promises);
    let res = await str.replace(regex, () => data.shift());
    return res
}