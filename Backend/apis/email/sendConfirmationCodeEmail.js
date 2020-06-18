import { smtpTransport } from './email'
import models, { sequelize } from './../../models'
require('dotenv').config()

async function sendConfirmationCodeEmail(email, code) {
  return smtpTransport.sendMail({
    from: process.env.NODEMAILER_GMAIL_USER,
    to: email,
    subject: 'Build-To Order Guides confirmation code.',
    html: `Your confirmation code is ${code}.`,
  })
}
export { sendConfirmationCodeEmail }
