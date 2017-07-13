const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
  title: String,
  description: String,
  url: String,
  votes: Number,
  openGraph: Object,
  createdAt: Date,
  updateAt: Date,
  isDeleted: {
    type: Boolean,
    default: false,
  },
})

// Create the model class
const ModelClass = mongoose.model('post', postSchema)

// Export the model
module.exports = ModelClass
