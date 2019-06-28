const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  picture: String,
  friends: [ { type: mongoose.Schema.Types.ObjectId, ref: 'User' } ],
  posts: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Post' } ],
  workouts: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Workout' } ]
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