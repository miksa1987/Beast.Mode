const mongoose = require('mongoose')

const workoutSchema = mongoose.Schema({
  description: String,
  exercises: [ { name: String, sets: Number, reps: Number, rounds: Number } ],
  picture: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes: Number,
  comments: [ {user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, content: String} ]
})

module.exports = mongoose.model('Workout', workoutSchema)