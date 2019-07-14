const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  info: String,
  age: Number,
  picture: String,
  pictures: [ String ],
  activity: [ { text: String, uri: String } ],
  postCount: Number,
  workoutCount: Number,
  doneWorkoutCount: Number,
  friends: [ { type: mongoose.Schema.Types.ObjectId, ref: 'User' } ],
  posts: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Post' } ],
  workouts: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Workout' } ],
  doneWorkouts: [ { type: mongoose.Schema.Types.ObjectId, ref: 'DoneWorkout' } ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)