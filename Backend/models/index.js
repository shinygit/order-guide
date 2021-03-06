require('dotenv').config()
import Sequelize from 'sequelize'

const getDatabase = () => {
  if (process.env.TEST) {
    return process.env.TESTDATABASE_URI
  } else {
    return process.env.DATABASE_URI
  }
}
const sequelize = new Sequelize(getDatabase(), {
  logging: false,
  pool: {
    max: 3,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
})
const models = {
  User: sequelize.import('./user'),
  Item: sequelize.import('./item'),
  Location: sequelize.import('./location'),
  Supplier: sequelize.import('./supplier'),
  Order: sequelize.import('./order'),
  Supplier_Order: sequelize.import('./supplier_order'),
  Receiver: sequelize.import('./receiver'),
  NotificationMethod: sequelize.import('./notificationMethod'),
  Category: sequelize.import('./category'),
  sequelize: sequelize,
}

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models)
  }
})
export { sequelize }
export default models
