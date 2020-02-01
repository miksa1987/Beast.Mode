const mongoose = require('mongoose')

const workoutSchema = mongoose.Schema({
  content: { type: String, required: true },
  picture: { type: String, default: '' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes: [ { type: mongoose.Schema.Types.ObjectId, ref: 'User' } ],
  likesLength: { type: Number, default: 0 },
  type: { type: String, default: 'workout' },
  comments: [ { 
    user: String,
    userid: mongoose.Schema.Types.ObjectId,
    content: String,
    date: { type: Date, default: new Date() }
  } ],
  date: { type: Date, default: new Date() },
})

module.exports = mongoose.model('Workout', workoutSchema)