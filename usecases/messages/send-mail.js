import { makeMail } from '../../domains/messages'
import MailSender from '../../modules/nodemailer'
const mailer = new MailSender;
const sender = mailer.transporter();

export default function makeSendMail(){
    return async function sendMail(mailInfo,toVisitor = false){
        const { ...body } = mailInfo;
        const mail = makeMail({...body});
        let result;
        try {
            result = await sender.sendMail({
                from: mail.getFrom(),
                to: mail.getTo(toVisitor),
                subject: mail.getSubject(toVisitor),
                text: mail.getBody(toVisitor),
                html: mail.getBody(toVisitor),
              });
        } catch(e) {
            logger.log({
                level: 'error',
                message: e.message
              })
        }
        return result
    }
}

