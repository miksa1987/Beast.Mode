import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import socket from './service/socket' // Needed for socket.IO

import store from './store'

import './index.css'
import App from './App'

const renderApp = () => {
  ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))
}

store.subscribe(renderApp)
renderApp()