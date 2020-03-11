import models from '../models'
export default async () => {
  const loc1 = await models.Location.create({ locationName: 'floor' })
  const loc2 = await models.Location.create({ locationName: 'not floor' })
  const sup1 = await models.Supplier.create({ supplierName: 'good store' })
  const sup2 = await models.Supplier.create({ supplierName: 'not good store' })
  const user = await models.User.create(
    {
      email: 'hello@david.com',
      password: '12345678',
      orders: [
        {
          orderDate: '2020-01-01',
          items: [
            {
              itemName: 'Good Book',
              orderAmount: 2,
              buildTo: 2,
              quanityOnHand: 1,
              locationId: 1,
              supplierId: 1,
              unitPriceInPennies: 1245,
              isMarketPrice: false,
              productNumber: '9u12012h',
              unitSize: '1 book',
              quantityReceived: 0,
              itemNote: 'get this book every week for sure',
              specialNote: 'last week was a bad book',
              itemId: '8b41c801-dce8-4899-b0a2-498ccc25df90'
            },
            {
              itemName: 'Bad Book',
              orderAmount: 2,
              buildTo: 2,
              quanityOnHand: 1,
              locationId: 2,
              supplierId: 2,
              unitPriceInPennies: 1122,
              isMarketPrice: true,
              productNumber: '231208-2',
              unitSize: '1 book',
              quantityReceived: 0,
              itemNote: "Don't get this book every week.",
              specialNote: null,
              itemId: '4018d0fc-a835-4e99-82ad-b088a300375f'
            }
          ]
        },
        {
          orderDate: '2020-01-08',
          items: [
            {
              itemName: 'Good Book',
              orderAmount: 2,
              buildTo: 2,
              quanityOnHand: 1,
              locationId: 1,
              supplierId: 1,
              unitPriceInPennies: 1245,
              isMarketPrice: false,
              productNumber: '9u12012h',
              unitSize: '1 book',
              quantityReceived: 0,
              itemNote: 'get this book every week for sure',
              specialNote: 'last week was a bad book',
              itemId: '8b41c801-dce8-4899-b0a2-498ccc25df90'
            },
            {
              itemName: 'Bad Book',
              orderAmount: 2,
              buildTo: 2,
              quanityOnHand: 1,
              locationId: 2,
              supplierId: 2,
              unitPriceInPennies: 1122,
              isMarketPrice: true,
              productNumber: '231208-2',
              unitSize: '1 book',
              quantityReceived: 0,
              itemNote: "Don't get this book every week.",
              specialNote: null,
              itemId: '4018d0fc-a835-4e99-82ad-b088a300375f'
            }
          ]
        },
        {
          orderDate: '2020-01-15',
          items: [
            {
              itemName: 'Good Book',
              orderAmount: 2,
              buildTo: 2,
              quanityOnHand: 1,
              locationId: 1,
              supplierId: 1,
              unitPriceInPennies: 1245,
              isMarketPrice: false,
              productNumber: '9u12012h',
              unitSize: '1 book',
              quantityReceived: 0,
              itemNote: 'get this book every week for sure',
              specialNote: 'last week was a bad book',
              itemId: '8b41c801-dce8-4899-b0a2-498ccc25df90'
            },
            {
              itemName: 'Bad Book',
              orderAmount: 2,
              buildTo: 2,
              quanityOnHand: 1,
              locationId: 2,
              supplierId: 2,
              unitPriceInPennies: 1122,
              isMarketPrice: true,
              productNumber: '231208-2',
              unitSize: '1 book',
              quantityReceived: 0,
              itemNote: "Don't get this book every week.",
              specialNote: null,
              itemId: '4018d0fc-a835-4e99-82ad-b088a300375f'
            }
          ]
        },
        {
          orderDate: '2020-01-22',
          items: [
            {
              itemName: 'Good Book',
              orderAmount: 2,
              buildTo: 2,
              quanityOnHand: 1,
              locationId: 1,
              supplierId: 1,
              unitPriceInPennies: 1245,
              isMarketPrice: false,
              productNumber: '9u12012h',
              unitSize: '1 book',
              quantityReceived: 0,
              itemNote: 'get this book every week for sure',
              specialNote: 'last week was a bad book',
              itemId: '8b41c801-dce8-4899-b0a2-498ccc25df90'
            },
            {
              itemName: 'Bad Book',
              orderAmount: 2,
              buildTo: 2,
              quanityOnHand: 1,
              locationId: 2,
              supplierId: 2,
              unitPriceInPennies: 1122,
              isMarketPrice: true,
              productNumber: '231208-2',
              unitSize: '1 book',
              quantityReceived: 0,
              itemNote: "Don't get this book every week.",
              specialNote: null,
              itemId: '4018d0fc-a835-4e99-82ad-b088a300375f'
            }
          ]
        },
        {
          orderDate: '2020-01-29',
          items: [
            {
              itemName: 'Good Book',
              orderAmount: 2,
              buildTo: 2,
              quanityOnHand: 1,
              locationId: 1,
              supplierId: 1,
              unitPriceInPennies: 1245,
              isMarketPrice: false,
              productNumber: '9u12012h',
              unitSize: '1 book',
              quantityReceived: 0,
              itemNote: 'get this book every week for sure',
              specialNote: 'last week was a bad book',
              itemId: '8b41c801-dce8-4899-b0a2-498ccc25df90'
            },
            {
              itemName: 'Bad Book',
              orderAmount: 2,
              buildTo: 2,
              quanityOnHand: 1,
              locationId: 2,
              supplierId: 2,
              unitPriceInPennies: 1122,
              isMarketPrice: true,
              productNumber: '231208-2',
              unitSize: '1 book',
              quantityReceived: 0,
              itemNote: "Don't get this book every week.",
              specialNote: null,
              receivingNote: 'Sent back, was a really bad book',
              itemId: '4018d0fc-a835-4e99-82ad-b088a300375f'
            }
          ]
        }
      ]
    },
    { include: { model: models.Order, include: [{ model: models.Item }] } }
  ).catch(e => console.log(e))
  loc1.setUser(user)
  loc2.setUser(user)
  sup1.setUser(user)
  sup2.setUser(user)
}
