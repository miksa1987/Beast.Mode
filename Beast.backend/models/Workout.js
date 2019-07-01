const mongoose = require('mongoose')

const workoutSchema = mongoose.Schema({
  content: String,
  picture: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes: Number,
  comments: [ {user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, content: String} ],
  date: Date,
  done: {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: Date
  }
})

module.exports = mongoose.model('Workout', workoutSchema)