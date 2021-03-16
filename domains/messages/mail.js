import getOwnerTemplate from '../../utils/owner-mail-template';
import getVisitorMailTemplate from '../../utils/visitor-mail-template';
const defaultMessage = 'There is no text here, please check admin panel of your site.';

const ownerMail = global.config.ownerEmail;
const ownerName = global.config.ownerName;
const siteUrl = global.config.siteUrl;
const from = global.config.emailSender;

export default function buildMakeMail() {
    return function makeSendMail({
        name = "no-info",
        email = "no-info",
        content = defaultMessage 
    }) {
        
        return Object.freeze({
            getTo: (toVisitor) => toVisitor ? email : ownerMail,
            getFrom: () => from,
            getSubject: (toVisitor) => toVisitor ? `Your message was sent to ${ownerName}`:`New message on your site from ${name}`,
            getBody: (toVisitor) => toVisitor ? getVisitorMailTemplate(siteUrl, ownerName, ownerMail, name, email, content) : getOwnerTemplate(siteUrl, name, email, content),
        })
    }
}