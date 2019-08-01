const mongoose = require('mongoose')

const doneWorkoutSchema = mongoose.Schema({
  content: { type: String, required: true },
  additional: String,
  picture: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes: [ { type: mongoose.Schema.Types.ObjectId, ref: 'User' } ],
  type: String,
  comments: [ { 
    user: String,
    content: String,
    date: Date
  } ],
  date: Date,
  time: Number
})

module.exports = mongoose.model('DoneWorkout', doneWorkoutSchema)