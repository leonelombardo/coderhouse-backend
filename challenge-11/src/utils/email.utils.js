const nodemailer = require("nodemailer");
const { EMAIL_SERVICE, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD } = require("../config/email.config");

const transport = nodemailer.createTransport({
    service: EMAIL_SERVICE,
    port: EMAIL_PORT,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD
    }
})

const sendEmail = async (to, subject, message) => {
    const html = `
        <h4 style="font-size: 12px; font-family: sans-serif;  text-align: center;">
            ${message}
        </h4>
    `

    const options = {
        from: `test@noreply.com <leonelombardotest@gmail.com>`,
        to,
        subject,
        html
    }

    return await transport.sendMail(options);
}

module.exports = sendEmail;