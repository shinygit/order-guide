import { smtpTransport } from './email'
import models, { sequelize } from './../../models'
require('dotenv').config()

async function sendNotification(message, me) {
  if (me.receivesForUser) {
    me.id = me.receivesForUser
  }

  const recipientsObjects = await models.NotificationMethod.findAll({
    where: { userId: me.id, confirmed: true, deleted: false },
    attributes: ['email', 'phoneNumber'],
    raw: true,
  })

  const recipientList = [
    ...new Set([].concat(...recipientsObjects.map(Object.values))),
  ].filter(Boolean)

  return Promise.all(
    recipientList.map((recipient) =>
      smtpTransport.sendMail({
        from: process.env.NODEMAILER_GMAIL_USER,
        to: recipient,
        text: message,
      })
    )
  )
}
export { sendNotification }
