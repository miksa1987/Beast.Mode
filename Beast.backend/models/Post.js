const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
  content: String,
  picture: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes: Number,
  comments: [ {user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, content: String} ],
  date: Date
})

module.exports = mongoose.model('Post', postSchema)