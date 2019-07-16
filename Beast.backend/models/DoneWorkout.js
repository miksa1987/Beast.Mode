const mongoose = require('mongoose')

const doneWorkoutSchema = mongoose.Schema({
  content: String,
  additional: String,
  picture: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes: [ { type: mongoose.Schema.Types.ObjectId, ref: 'User' } ],
  type: String,
  comments: [ { 
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: String,
    date: Date
  } ],
  done: {
    date: Date,
    time: Number, // Time in seconds
    done: Boolean
  }
})

module.exports = mongoose.model('DoneWorkout', doneWorkoutSchema)