const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Item = new Schema(
  {
    supplier: { type: String, required: false },
    location: { type: String, required: false },
    itemName: { type: String, required: false },
    buildTo: { type: Number, required: false },
    order: { type: Number, required: false },
    showEditForm: { type: Boolean, required: false },
    isLocked: { type: Boolean, required: false },
    submittedForWeek: { type: Date, required: true },
    itemID: { type: String, required: false },
    user: { type: String, required: false },
    company: { type: String, required: false },
    previousOrders: { type: Object, required: false }
    // productOrderNumber
    // received
  },
  { timestamps: true }
)

module.exports = mongoose.model('items', Item)
