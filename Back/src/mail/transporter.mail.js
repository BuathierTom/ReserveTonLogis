const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

// Configurez un transporteur de messagerie
const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

module.exports = {
    transporter
}