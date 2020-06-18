import models from '../models'
import { v4 as uuidv4 } from 'uuid'
import { createUserStarterOrderAndItems } from '../user/utils/createNewUserItems'
require('dotenv').config()

export default async () => {
  const items = () => {
    const lotsofitems = []
    for (let i = 0; i < 200; i++) {
      lotsofitems.push({
        itemName: `Good Book ${i}`,
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
        itemId: uuidv4(),
      })
    }
    return lotsofitems
  }
  const loc1 = await models.Location.create({ locationName: 'floor' })
  const loc2 = await models.Location.create({ locationName: 'not floor' })
  const sup1 = await models.Supplier.create({
    supplierName: 'Chucks Place of Goods',
    deliveryDay: 'Thursday',
    salesPersonName: 'Chuck',
    salesPersonPhoneNumber: '708-555-4321',
    officePhoneNumber: '708-555-1234',
    salesPersonEmail: 'chuckgood@thanks.com',
  })
  const sup2 = await models.Supplier.create({
    supplierName: "Joe's Good Store",
    deliveryDay: 'Tuesday',
    salesPersonName: 'Joe',
    salesPersonPhoneNumber: '708-555-4567',
    officePhoneNumber: '708-555-7654',
    salesPersonEmail: 'Joegood@thanks.com',
  })
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
              itemId: '8b41c801-dce8-4899-b0a2-498ccc25df90',
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
              itemId: '4018d0fc-a835-4e99-82ad-b088a300375f',
            },
          ],
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
              itemId: '8b41c801-dce8-4899-b0a2-498ccc25df90',
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
              itemId: '4018d0fc-a835-4e99-82ad-b088a300375f',
            },
          ],
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
              itemId: '8b41c801-dce8-4899-b0a2-498ccc25df90',
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
              itemId: '4018d0fc-a835-4e99-82ad-b088a300375f',
            },
          ],
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
              itemId: '8b41c801-dce8-4899-b0a2-498ccc25df90',
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
              itemId: '4018d0fc-a835-4e99-82ad-b088a300375f',
            },
          ],
        },
        {
          orderDate: '2020-01-29',
          items: items(),
        },
      ],
    },
    { include: { model: models.Order, include: [{ model: models.Item }] } }
  ).catch((e) => console.log(e))
  loc1.setUser(user)
  loc2.setUser(user)
  sup1.setUser(user)
  sup2.setUser(user)
  const user5 = await models.User.create({
    email: 'hello5@david.com',
    password: '12345678',
  })
  await models.NotificationMethod.create({
    email: process.env.EMAIL,
    phoneNumber: null,
    confirmed: true,
    userId: 2,
  })
  await models.NotificationMethod.create({
    email: process.env.PHONE,
    phoneNumber: null,
    confirmed: true,
    userId: 2,
  })

  createUserStarterOrderAndItems(user5, models)
}
