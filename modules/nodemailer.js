"use strict";
const nodemailer = require("nodemailer");

export default class MailSender {
    constructor() {
        this.host = global.config.smtpHost;
        this.port = 465;
        this.auth =  () => {
            const email_sender = global.config.emailSender;
            const email_sender_password = global.config.emailSenderPassword;
            if(!email_sender.toString().length || !email_sender_password.toString().length) {
                throw 'Set outgoing email & password.'
            }
            return {
                user: email_sender,
                pass: email_sender_password,
            };
        };
        this.connection = null;
    }
    get getTransporter() {
        return this.transporter();
    }
    transporter() {
        if(!this.connection) {
            this.connection =  nodemailer.createTransport({
                host: this.host,
                port: this.port,
                secure: true, // true for 465, false for other ports
                auth: this.auth(),
            })
        }
        return this.connection
    }

}