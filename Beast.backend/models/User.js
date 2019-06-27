const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  friends: [ObjectId],
  posts: [ { content: String, date: Date, comments: [{ content: String, user: String }], likes: Number } ],
  workouts: [ { content: String, date: Date, comments: [{ content: String, user: String }], likes: Number } ]
})

module.exports = mongoose.model('User', userSchema)