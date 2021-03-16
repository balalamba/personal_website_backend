export default function getVisitorMailTemplate(website, contactPerson, contactEmail, name, email, content) {
    return `<!doctype html>
    <html>
    <head>
        <title>Your message has been sent to ${contactPerson}.</title>
    </head>
    <body style="font-family: sans-serif;margin:0;">
        <section class="background" style="margin:6rem 0rem;position: absolute;width: 100%;height: 100%;min-width: 100%;min-height: 100%;);">
            <div class="mail-body" style="padding: 2rem;margin: 2rem;background-color: #4cc9f0;border-radius: 3rem;">
                <div class="header" style="padding: 1rem;border-radius: 3rem;">
                    <h1>Thank you. Your message has been sent to ${contactPerson}</h1>
                </div>
                <div class="mail-content" style="padding: 0rem 1rem;display: flex;align-items: center;justify-items: start;flex-direction: column;">
                <q><span>
                        <p><b>Имя: </b>${name}</p>
                        <p><b>Email: </b>${email}</p>
                        <p>${content}</p>
                    </span></q>
                </div>
                <span style="margin-top:2rem;">
                    <p>If you do not receive a response in the near future, you can email me directly on: ${contactEmail} </p>
                    <p> Best regards, ${contactPerson} from ${website}</p>
                </span>
            </div>
        </section>
    </body>
    
    </html>`
};