const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const itemSchema = new Schema({
  title: String,
  startYear: Number,
  endYear: Number,
  location: String,
  description: String,
},
    { timestamps: true }
)//end itemSchema

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;