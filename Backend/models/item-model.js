const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Item = new Schema(
  {
    supplier: { type: String, required: false },
    location: { type: String, required: false },
    itemName: { type: String, required: false },
    buildTo: { type: Number, required: false },
    order: { type: Number, required: false },
    showEditForm: { type: Boolean, required: false }
  },
  { timestamps: true }
)

module.exports = mongoose.model('items', Item)
