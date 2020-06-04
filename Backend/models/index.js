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
  pool: {
    max: 2,
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
}

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models)
  }
})
export { sequelize }
export default models
