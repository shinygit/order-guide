export default {
  Supplier: {
    supplierName: async (itemSupplier, args, { models }) => {
      const supplier = await models.Supplier.findByPk(itemSupplier, {
        raw: true
      })
      return supplier.supplierName
    }
  }
}
