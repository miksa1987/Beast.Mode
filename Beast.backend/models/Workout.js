const mongoose = require('mongoose')

const workoutSchema = mongoose.Schema({
  content: String,
  user: ObjectId,
  likes: Number,
  comments: [ {user: ObjectId, content: String} ]
})

module.exports = mongoose.model('Workout', workoutSchema)