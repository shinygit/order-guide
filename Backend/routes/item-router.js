const express = require('express')

const ItemCtrl = require('../controllers/item-controller')

const router = express.Router()

router.post('/item', ItemCtrl.createItem)
router.put('/item/:id', ItemCtrl.updateItem)
router.delete('/item/:id', ItemCtrl.deleteItem)
router.get('/item/:id', ItemCtrl.getItemById)
router.get('/items', ItemCtrl.getItems)
router.get('/newestOrderDate', ItemCtrl.getNewestOrderDate)
router.get('/orderDates', ItemCtrl.getOrderDates)
router.get('/items/:date', ItemCtrl.getItemsByDate)
router.post('/items', ItemCtrl.createManyItems)
router.delete('/items/:date', ItemCtrl.deleteManyItems)
router.post('/items/:date', ItemCtrl.createNewOrderDate)

module.exports = router
