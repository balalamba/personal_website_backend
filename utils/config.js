import dotenv from 'dotenv'
dotenv.config({ debug: true });
export default (function(){
    const environment = process.env.NODE_ENV;
    const keys = {
        env: 'NODE_ENV',
        apiRoot: 'BASE_API_ROOT',
        dbUrl: 'DB_URL',
        dbName: 'DB_NAME',
        port: {
            development:'DEVPORT',
            production:'PORT',
        },
        host: {
            development:'DEVHOST',
            production:'HOST',
        },
        jwttoken: 'JWTSECRET',
        static: {
            development:'STATIC_DEV',
            production:'STATIC_PROD',
        },
        blogFolder: 'BLOGFOLDER',
        photosFolder: 'PHOTOSFOLDER',
        siteUrl: 'SITEURL',
        ownerEmail: 'OWNEREMAIL',
        ownerName: 'OWNERNAME',
        robotEmail: 'ROBOTEMAIL',
        publicVapidKey:'PUBLIC_VAPID_KEY',
        privateVapidKey:'PRIVATE_VAPID_KEY',
        smtpHost: 'SMTP_HOST',
        emailSender:'EMAIL_SENDER',
        emailSenderPassword:'EMAIL_SENDER_PASSWORD',
    }
    const setKey = (suffix) => {
        let value = suffix;
        if(typeof suffix !== 'string') {
            value = suffix[environment];
        }
        const keyvalue = process.env[value];
        if(!keyvalue || !keyvalue.toString().length) {
            throw `Please set process.env.${ value } keyvalue`
        } else return keyvalue;
    };

    const getConfig = () => {
        const result = {};
        Object.keys(keys).forEach((name)=> {
            result[name] = setKey(keys[name]);
            // logger.log({
            //     level: 'info',
            //     message: `${name}: ${result[name]}`,
            //   })
        })
        global.config = result;
        // return result
    }
    return getConfig();
})()