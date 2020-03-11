export const createUserStarterOrderAndItems = async (user, models) => {
  const order = await models.Order.create({ orderDate: Date.now() })
  const item1 = await models.Item.create({
    itemName: 'Milk',
    buildTo: 2,
    quanityOnHand: 1,
    unitPriceInPennies: 245,
    isMarketPrice: true,
    productNumber: '9u12012h',
    unitSize: '1 Gallon',
    quantityReceived: 0,
    itemNote: 'Check expiration date!',
    specialNote: 'Check the price on chocolate milk.'
  })
  const item2 = await models.Item.create({
    itemName: 'Sugar',
    buildTo: 2,
    quanityOnHand: 1,
    unitPriceInPennies: 45,
    isMarketPrice: false,
    productNumber: '129837-vx',
    unitSize: '1 Cup',
    quantityReceived: 0,
    itemNote: "Make sure it's always cane.",
    specialNote: ''
  })
  const loc1 = await models.Location.create({ locationName: 'Fridge' })
  const loc2 = await models.Location.create({ locationName: 'Pantry' })
  const sup1 = await models.Supplier.create({
    supplierName: 'The Grocery Store'
  })
  const sup2 = await models.Supplier.create({ supplierName: 'Neighbor' })
  await order.setUser(user)
  await Promise.all([
    loc1.setUser(user),
    loc2.setUser(user),
    sup1.setUser(user),
    sup2.setUser(user),
    item1.setLocation(loc1),
    item2.setLocation(loc2),
    item1.setSupplier(sup1),
    item2.setSupplier(sup2),
    item1.setOrder(order),
    item2.setOrder(order)
  ])
}
