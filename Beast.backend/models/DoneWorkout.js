const mongoose = require('mongoose')

const doneWorkoutSchema = mongoose.Schema({
  content: { type: String, required: true },
  additional: String,
  picture: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes: [ { type: mongoose.Schema.Types.ObjectId, ref: 'User' } ],
  likesLength: Number,
  type: String,
  comments: [ { 
    user: String,
    userid: mongoose.Schema.Types.ObjectId,
    content: String,
    date: Date
  } ],
  date: Date,
  time: Number
})

module.exports = mongoose.model('DoneWorkout', doneWorkoutSchema)