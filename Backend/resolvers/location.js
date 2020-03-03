export default {
  Location: {
    locationName: async (itemLocation, args, { models }) => {
      const location = await models.Location.findByPk(itemLocation, {
        raw: true
      })
      return location.locationName
    }
  }
}
