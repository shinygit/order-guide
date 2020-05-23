export default {
  SupplierCreateResults: {
    __resolveType(parent, context, info) {
      if (parent.error) {
        return 'SupplierError'
      }

      if (parent.id) {
        return 'Supplier'
      }

      return null
    },
  },
  SupplierDeleteResults: {
    __resolveType(parent, context, info) {
      if (parent.error) {
        return 'SupplierError'
      }

      if (parent.id) {
        return 'Supplier'
      }

      return null
    },
  },
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
      if (input.supplierName.trim() === '') {
        return {
          error: 'A supplier must have a name!',
        }
      }
      const exists = await models.Supplier.findOne({
        where: {
          supplierName: input.supplierName,
          userId: me.id,
        },
      })
      if (exists) {
        return {
          error: 'Supplier already exists!',
        }
      }

      const newSupplier = await models.Supplier.create({
        userId: me.id,
        ...input,
      })
      return newSupplier.dataValues
    },
    deleteSupplier: async (parent, { id }, { me, models }) => {
      const latestOrder = await models.Order.findOne({
        where: {
          userId: me.id,
        },
        order: [['orderDate', 'DESC']],
      })
      const hasItems = await models.Item.findOne({
        where: {
          supplierId: id,
          orderId: latestOrder.id,
        },
      })
      if (hasItems)
        return {
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
          error: 'This supplier does not exist.',
        }
      if (supplier) supplier.destroy()
      return supplier.dataValues
    },
    updateSupplier: async (parent, { id, input }, { me, models }) => {
      const supplier = await models.Supplier.findOne({
        where: {
          id: id,
          userId: me.id,
        },
      })
      if (!supplier)
        return { __typename: 'SupplierError', error: 'No supplier match!' }
      if (!input.supplierName)
        return {
          __typename: 'SupplierError',
          error: 'A supplier must have a name!',
        }
      await supplier.update({
        supplierName: input.supplierName,
        deliveryDay: input.deliveryDay,
        salesPersonName: input.salesPersonName,
        salesPersonPhoneNumber: input.salesPersonPhoneNumber,
        officePhoneNumber: input.officePhoneNumber,
        salesPersonEmail: input.salesPersonEmail,
      })
      return { __typename: 'Supplier', ...supplier.dataValues }
    },
  },
}
