const Item = require('../models/item-model')

createItem = (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a item'
    })
  }

  const item = new Item(body)
  if (!item) {
    return res.status(400).json({ success: false, error: err })
  }

  item
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        _id: item._id,
        message: 'Item created!'
      })
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: 'Item not created!'
      })
    })
}

createManyItems = (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a item'
    })
  }

  Item.insertMany(body)
    .then(() => {
      return res.status(201).json({
        success: true,
        message: 'Items created!'
      })
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: 'Items not created!'
      })
    })
}

updateItem = async (req, res) => {
  console.log(req.user)
  const body = req.body
  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update'
    })
  }
  Item.findOne({ _id: req.params.id }, (err, item) => {
    if (err) {
      return res.status(404).json({
        err,
        message: 'Item not found!'
      })
    }
    item._id = body._id || item._id
    item.supplier = body.supplier || item.supplier
    item.location = body.location || item.location
    item.itemName = body.itemName || item.itemName
    item.buildTo = body.buildTo || item.buildTo
    item.order = body.order
    item.showEditForm = body.showEditForm || item.showEditForm
    item.isLocked = body.isLocked || item.isLocked
    item.submittedForWeek = body.submittedForWeek || item.submittedForWeek
    item.itemID = body.itemID || item.itemID
    item.user = body.user || item.user
    item.company = body.company || item.company
    item
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          item: item,
          _id: item._id,
          message: 'Item updated!'
        })
      })
      .catch(error => {
        return res.status(404).json({
          error,
          message: 'Item not updated!'
        })
      })
  })
}

deleteItem = async (req, res) => {
  await Item.findOneAndDelete({ _id: req.params.id }, (err, item) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    if (!item) {
      return res.status(404).json({ success: false, error: `Item not found` })
    }

    return res.status(200).json({ success: true, data: item })
  }).catch(err => console.log(err))
}
deleteManyItems = async (req, res) => {
  await Item.deleteMany({ submittedForWeek: req.params.date }, (err, item) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    if (!item) {
      return res.status(404).json({ success: false, error: `Item not found` })
    }

    return res.status(200).json({ success: true, data: item })
  }).catch(err => console.log(err))
}

getItemById = async (req, res) => {
  await Item.findOne({ _id: req.params.id }, (err, item) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    if (!item) {
      return res.status(404).json({ success: false, error: `Item not found` })
    }
    return res.status(200).json({ success: true, data: item })
  }).catch(err => console.log(err))
}

getItems = async (req, res) => {
  await Item.find({}, (err, items) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!items.length) {
      return res.status(404).json({ success: false, error: `Item not found` })
    }
    return res.status(200).json({ success: true, data: items })
  }).catch(err => console.log(err))
}

getNewestOrderDate = (req, res) => {
  console.log(req.headers)
  console.log(req.user)

  try {
    Item.findOne({})
      .sort({ submittedForWeek: -1 })
      .limit(1)
      .exec()
      .then(item => {
        if (!item) {
          return res
            .status(200)
            .json({ success: false, error: 'No newest date' })
        } else {
          res.json(item.submittedForWeek)
        }
      })
  } catch (err) {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
  }
}
getOrderDates = (req, res) => {
  try {
    Item.distinct('submittedForWeek')
      .exec()
      .then(orderDates => {
        if (!orderDates) {
          return res
            .status(200)
            .json({ success: false, error: 'No newest date' })
        } else {
          res.json(orderDates.sort((a, b) => b - a))
        }
      })
  } catch (err) {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
  }
}
getItemsByDate = (req, res) => {
  try {
    Item.find({ submittedForWeek: req.params.date })
      .exec()
      .then(items => {
        if (!items.length) {
          return res
            .status(404)
            .json({ success: false, error: `Items for date not found` })
        }
        return res.status(200).json({ success: true, data: items })
      })
  } catch (err) {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
  }
}
createNewOrderDate = async (req, res) => {
  lastItem = await Item.findOne({})
    .sort({ submittedForWeek: -1 })
    .limit(1)
    .exec()
  lastDate = lastItem.submittedForWeek
  newDate = new Date(req.params.date)

  lastDateItems = await Item.find({ submittedForWeek: lastDate })

  getLastOrders = async index => {
    lastOrders = await Item.find({ itemID: lastDateItems[index].itemID })
      .sort({ submittedForWeek: -1 })
      .limit(2)
      .exec()
    return {
      lastWeek: lastOrders[0].order,
      twoWeeksAgo: lastOrders[1].order
    }
  }

  newDateItems = Promise.all(
    lastDateItems.map(async (item, index) => {
      return {
        supplier: item.supplier,
        location: item.location,
        itemName: item.itemName,
        buildTo: item.buildTo,
        order: 0,
        showEditForm: item.showEditForm,
        isLocked: item.isLocked,
        submittedForWeek: newDate,
        itemID: item.itemID,
        user: item.user,
        company: item.company,
        previousOrders: await getLastOrders(index)
      }
    })
  )
  Item.insertMany(await newDateItems)
    .then(() => {
      return res.status(201).json({
        success: true,
        message: 'New date created!'
      })
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: 'New date not created!'
      })
    })
}

module.exports = {
  createItem,
  updateItem,
  deleteItem,
  getItems,
  getItemById,
  getNewestOrderDate,
  getOrderDates,
  getItemsByDate,
  createManyItems,
  deleteManyItems,
  createNewOrderDate
}
