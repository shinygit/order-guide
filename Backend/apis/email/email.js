const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2
require('dotenv').config()

const oauth2Client = new OAuth2(
  process.env.NODEMAILER_GMAIL_CLIENTID, // ClientID
  process.env.NODEMAILER_GMAIL_CLIENTSECRET, // Client Secret
  'https://developers.google.com/oauthplayground' // Redirect URL
)

oauth2Client.setCredentials({
  refresh_token: process.env.NODEMAILER_GMAIL_REFRESHTOKEN,
})
const accessToken = oauth2Client.getAccessToken()

const smtpTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.NODEMAILER_GMAIL_USER,
    clientId: process.env.NODEMAILER_GMAIL_CLIENTID,
    clientSecret: process.env.NODEMAILER_GMAIL_CLIENTSECRET,
    refreshToken: process.env.NODEMAILER_GMAIL_REFRESHTOKEN,
    accessToken: accessToken,
  },
})

/* const mailOptions = {
  from: 'Build.To.Order.Guide@gmail.com',
  to: '7735777850@messaging.sprintpcs.com',
  subject: 'Node.js Email with Secure OAuth',
  generateTextFromHTML: true,
  html: '<b>test</b>',
} */

/* smtpTransport.sendMail(mailOptions, (error, response) => {
  error ? console.log(error) : console.log(response)
  smtpTransport.close()
}) */

export { smtpTransport }
