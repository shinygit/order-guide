require('dotenv').config()
import Sequelize from 'sequelize'

const sequelize = new Sequelize(process.env.DATABASE_URI)
const models = {
  User: sequelize.import('./user'),
  Item: sequelize.import('./item')
}

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models)
  }
})
export { sequelize }
export default models
