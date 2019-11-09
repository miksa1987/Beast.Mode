const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
  content: { type: String, default: ''},
  picture: { type: String, default: '' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes: [ { type: mongoose.Schema.Types.ObjectId, ref: 'User' } ],
  likesLength: { type: Number, default: 0 },
  type: { type: String, default: 'post' },
  comments: [ {
    user: String, 
    userid: mongoose.Schema.Types.ObjectId,
    content: String,
    date: { type: Date, default: new Date() }
  } ],
  date: { type: Date, default: new Date() }
})

module.exports = mongoose.model('Post', postSchema)