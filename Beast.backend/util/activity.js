const User = require('../models/User')

const setActivity = async (userid, type, id) => {
  const user = await User.findById(userid)
  let activity = {}

  switch(type) {
    case 'post':
      activity = {
        text: `${user.username} posted a post`,
        uri: `/post/${id}`
      }
      break
    case 'workout':
      activity = {
        text: `${user.username} created a workout`,
        uri: `/doworkout/${id}`
      }
      break  
    case 'doneworkout':
      activity = {
        text: `${user.username} did a workout`,
        uri: `/doneworkout/${id}`
      }
      break  
    case 'comment':
      activity = {
        text: `${user.username} commented on a post`,
        uri: `/post/${id}`
      }
      break  
    case 'like':
      activity = {
        text: `${user.username} liked a post`,
        uri: `/post/${id}`
      }
      break  
    case 'commentworkout':
      activity = {
        text: `${user.username} commented on a workout`,
        uri: `/workout/${id}`
      }
      break  
    case 'likeworkout':
      activity = {
        text: `${user.username} liked a workout`,
        uri: `/workout/${id}`
      }
      break
    case 'commentdoneworkout':
      activity = {
        text: `${user.username}`,
        uri: `/doneworkout/${id}`
      }
      break
    case 'likedoneworkout':
      activity = {
        text: `${user.username}`,
        uri: `/doneworkout/${id}`
      }
      break
    case 'addfriend':
        activity = {
          text: `${user.username} added a friend`,
          uri: `/profile/${id}`
        } 
      break
    default:
      return {}
  }
  const newActivity = user.activity.concat(activity)

  const userToUpdate = {
    ...user.toObject(),
    activity: newActivity
  }

  const savedUser = await User.findByIdAndUpdate(userid, userToUpdate, { new: true })

  return savedUser
}

module.exports = { setActivity }