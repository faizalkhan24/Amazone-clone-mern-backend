const nodemailer = require('nodemailer');
const asyncHandler = require("express-async-handler");

const sendEmail = asyncHandler(async (data, req, res) => {
    
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: 'valerie.swift@ethereal.email',
            pass: 's8UYetA77CuFzUsfrk'
        },
        requireTLS: true, // Use if the server requires TLS
    });
    console.log('Sending email to:', data.to);
    
    

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"hello 👻" <valerie.swift@ethereal.email>', // sender address
            to: data.to, // list of receivers
            subject: data.subject, // Subject line
            text: data.text, // plain text body
            html: data.html, // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    }
    main().catch(console.error);
    });

module.exports = {
    sendEmail
};
