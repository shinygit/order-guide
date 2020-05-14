export default {
  Query: {
    suppliers: async (parent, args, { me, models }) => {
      return await models.Supplier.findAll({
        where: {
          userId: me.id,
        },
      })
    },
    supplier: async (parent, { id }, { me, models }) => {
      return await models.Supplier.findOne({
        where: {
          id: id,
          userId: me.id,
        },
      })
    },
  },
  Mutation: {
    createSupplier: async (parent, { input }, { me, models }) => {
      const newSupplier = await models.Supplier.create({
        userId: me.id,
        ...input,
      })
      return { __typename: 'Supplier', ...newSupplier.dataValues }
    },
    deleteSupplier: async (parent, { id }, { me, models }) => {
      const latestOrder = await models.Order.findOne({
        where: {
          userId: me.id,
        },
        order: [['orderDate', 'DESC']],
      })
      console.log(latestOrder.id)
      const hasItems = await models.Item.findOne({
        where: {
          supplierId: id,
          orderId: latestOrder.id,
        },
      })
      if (hasItems)
        return {
          __typename: 'supplierError',
          error: 'The most current order is using this supplier.',
        }
      const supplier = await models.Supplier.findOne({
        where: {
          id: id,
          userId: me.id,
        },
      })
      if (!supplier)
        return {
          __typename: 'supplierError',
          error: 'This supplier does not exist.',
        }
      if (supplier) supplier.destroy()
      return { __typename: 'Supplier', ...supplier.dataValues }
    },
    updateSupplier: async (parent, { id, input }, { me, models }) => {
      const supplier = await models.Supplier.findOne({
        where: {
          id: id,
          userId: me.id,
        },
      })
      if (!supplier)
        return { __typename: 'supplierError', error: 'No supplier match!' }
      if (!input.supplierName)
        return {
          __typename: 'supplierError',
          error: 'A supplier must have a name!',
        }
      await supplier.update({
        supplierName: input.supplierName,
        deliveryDay: input.deliveryDay,
        salesPersonName: input.salesPersonName,
        salesPersonPhoneNumber: input.salesPersonPhoneNumber,
        officePhoneNumber: input.officePhoneNumber,
      })
      return { __typename: 'Supplier', ...supplier.dataValues }
    },
  },
}
