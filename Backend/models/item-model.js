const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Item = new Schema(
  {
    id: { type: String, required: true },
    supplier: { type: String, required: true },
    location: { type: String, required: true },
    itemName: { type: String, required: true },
    buildTo: { type: Number, required: true },
    order: { type: Number, required: true },
    showEditForm: { type: Boolean, required: true }
  },
  { timestamps: true }
)

module.exports = mongoose.model('items', Item)
