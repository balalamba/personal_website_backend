const webpush = require('web-push');

const publicVapidKey = global.config.publicVapidKey;
const privateVapidKey = global.config.privateVapidKey;

// Replace with your email
webpush.setVapidDetails('mailto:oleg@popovskiy.com', publicVapidKey, privateVapidKey);

export default webpush;
