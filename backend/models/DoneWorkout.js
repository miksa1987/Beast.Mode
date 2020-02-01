const mongoose = require('mongoose')

const doneWorkoutSchema = mongoose.Schema({
  content: { type: String, required: true },
  additional: { type: String, default: '' },
  picture: { type: String, default: '' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes: [ { type: mongoose.Schema.Types.ObjectId, ref: 'User' } ],
  likesLength: { type: Number, default: 0 },
  type: { type: String, default: 'doneworkout' },
  comments: [ { 
    user: String,
    userid: mongoose.Schema.Types.ObjectId,
    content: String,
    date: { type: Date, default: new Date() }
  } ],
  date: { type: Date, default: new Date() },
  time: { type: Number, default: 0 }
})

module.exports = mongoose.model('DoneWorkout', doneWorkoutSchema)