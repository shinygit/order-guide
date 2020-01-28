require('dotenv').config()
import Sequelize from 'sequelize'

const getDatabase = () => {
  if (process.env.TEST) {
    return process.env.TESTDATABASE_URI
  } else {
    return process.env.DATABASE_URI
  }
}
const sequelize = new Sequelize(getDatabase())
const models = {
  User: sequelize.import('./user'),
  Item: sequelize.import('./item'),
  Location: sequelize.import('./location')
}

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models)
  }
})
export { sequelize }
export default models
