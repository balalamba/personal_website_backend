export default function getOwnerTemplate(website, name, email, content) {
    return `<!doctype html>
    <html>
    <head>
        <title>Новое сообщение с сайта: ${website}</title>
    </head>
    <body style="font-family: sans-serif;margin:0;">
        <section class="background" style="margin:6rem 0rem;position: absolute;width: 100%;height: 100%;min-width: 100%;min-height: 100%;);">
            <div class="mail-body" style="padding: 2rem;margin: 2rem;background-color: #4cc9f0;border-radius: 3rem;">
                <div class="header" style="padding: 1rem;border-radius: 3rem;">
                    <h1>Новое сообщение с сайта: <b>${website}</b></h1>
                </div>
                <div class="mail-content" style="padding: 0rem 2rem;display: flex;align-items: center;justify-items: center;flex-direction: column;">
                    <span>
                        <p><b>Имя: </b>${name}</p>
                        <p><b>Email: </b>${email}</p>
                        <p>${content}</p>
                    </span>
                    <span style="margin-top:2rem;">
                        ${ email ? `<a class="reply" href="mailto:${email}" style="max-width: 300px;cursor: pointer;font-size: 1.3rem;text-decoration: none; border: 0px;border-radius: 2rem;padding: 1rem 2rem; color:#fff; background-color: #555b6e;">Ответить</a>`: null}
                        <a class="gotosite" href="${website}/panel" style="max-width: 300px;cursor: pointer;font-size: 1.3rem;border: 0px;text-decoration: none; border-radius: 2rem;padding: 1rem 2rem;background: #fff;">Админка</a>
                    </span>
                </div>
            </div>
        </section>
    </body>
    
    </html>`
};