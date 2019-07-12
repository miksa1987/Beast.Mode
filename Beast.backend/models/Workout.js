const mongoose = require('mongoose')

const workoutSchema = mongoose.Schema({
  content: String,
  picture: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes: [ { type: mongoose.Schema.Types.ObjectId, ref: 'User' } ],
  type: String,
  comments: [ { 
    user: String,
    content: String,
    date: Date
  } ],
  date: Date
})

module.exports = mongoose.model('Workout', workoutSchema)