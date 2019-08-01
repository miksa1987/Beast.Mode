import io from 'socket.io-client'
import store from '../store'

const socket = io()

socket.on('user_add_post', (post) => {
  const user = store.getState().currentUser
  
  if (user.friends.indexOf(post.user.id) > -1) {
    store.dispatch({ type: 'ADD_NEW_TO_FEED', data: post })
  }
})

socket.on('user_add_doneworkout', (post) => {
  const user = store.getState().currentUser
  
  if (user.friends.indexOf(post.user.id) > -1) {
    store.dispatch({ type: 'ADD_NEW_TO_FEED', data: post })
  }
})

socket.on('comment_doneworkout', (data) => {
  const user = store.getState().currentUser

  if (user.friends.indexOf(data.userid) > -1) {
    const message = `${data.username} commented on your done workout`
    store.dispatch({ type: 'SET_NOTIFICATION_MESSAGE', data: message })
    setTimeout(() => {    
      store.dispatch({ type: 'SET_NOTIFICATION_MESSAGE', data: '' })
    }, 3000)
  }
})

socket.on('comment_workout', (data) => {
  const user = store.getState().currentUser

  if (user.friends.indexOf(data.userid) > -1) {
    const message = `${data.username} commented on your workout`
    store.dispatch({ type: 'SET_NOTIFICATION_MESSAGE', data: message })
    setTimeout(() => {    
      store.dispatch({ type: 'SET_NOTIFICATION_MESSAGE', data: '' })
    }, 3000)
  }
})

socket.on('comment_post', (data) => {
  const user = store.getState().currentUser

  if (user.friends.indexOf(data.userid) > -1) {
    const message = `${data.username} commented on your post`
    store.dispatch({ type: 'SET_NOTIFICATION_MESSAGE', data: message })
    setTimeout(() => {    
      store.dispatch({ type: 'SET_NOTIFICATION_MESSAGE', data: '' })
    }, 3000)
  }
})

socket.on('like_doneworkout', (data) => {
  const user = store.getState().currentUser

  if (user.friends.indexOf(data.userid) > -1) {
    const message = `${data.username} liked your done workout`
    store.dispatch({ type: 'SET_NOTIFICATION_MESSAGE', data: message })
    setTimeout(() => {    
      store.dispatch({ type: 'SET_NOTIFICATION_MESSAGE', data: '' })
    }, 3000)
  }
})

socket.on('like_workout', (data) => {
  const user = store.getState().currentUser

  if (user.friends.indexOf(data.userid) > -1) {
    const message = `${data.username} liked your workout`
    store.dispatch({ type: 'SET_NOTIFICATION_MESSAGE', data: message })
    setTimeout(() => {    
      store.dispatch({ type: 'SET_NOTIFICATION_MESSAGE', data: '' })
    }, 3000)
  }
})

socket.on('like_post', (data) => {
  const user = store.getState().currentUser

  if (user.friends.indexOf(data.userid) > -1) {
    const message = `${data.username} liked your post`
    store.dispatch({ type: 'SET_NOTIFICATION_MESSAGE', data: message })
    setTimeout(() => {    
      store.dispatch({ type: 'SET_NOTIFICATION_MESSAGE', data: '' })
    }, 3000)
  }
})

export default socket 