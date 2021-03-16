export default function buildAddGallery() {
    return function makeGallery({
        slug,
        title,
        subtitle,
        description,
        parent
    } = {}) {
        if (typeof slug != "string" && !slug.length) {
            throw new Error('No gallery slug!')
        }
        if (typeof parent != "string" && !Array.isArray(parent)) {
            parent = "";
        }
        if (typeof parent == "undefined") parent = "";
        if (Object.keys(title) && Object.keys(description)) {
            let langs = Object.keys(title)

            langs.forEach((lang) => {
                if (!title[lang].length) {
                    throw new Error(`No title for ${lang} language!`)
                }
            })

            // langs.forEach((lang) => {
            //     if (!subtitle[lang].length) {
            //         throw new Error(`No subtitle for ${lang} language!`)
            //     }
            // })
            langs.forEach((lang) => {
                if (!description[lang].length) {
                    throw new Error(`No description for ${lang} language!`)
                }
            })
        }
        let date = new Date()
        return Object.freeze({
            getSlug: () => slug,
            getTitle: () => title,
            getCreatedOn: () => date.getTime().toString(),
            getSubtitle: () => subtitle,
            getDescription: () => description,
            getParent: () => parent,
        })
    }
}