const items = require('./testItems')

const resolvers = {
  Query: {
    item: (parent, { id }) => {
      return items[id]
    },
    items: () => Object.values(items)
  }
}

module.exports = resolvers
