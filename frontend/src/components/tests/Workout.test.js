import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Workout from '../workout/Workout'
import store from '../../store'

afterEach(cleanup)

const workout = {
  content: '5x5 pullup\n5x5 push up\n5x5 squat\n5x5 toes to bar',
  picture: '',
  comments: [],
  likes: [ '423423452', '214124124' ],
  user: {
    id: '423524242',
    username: 'Miksa'
  }
}

test('Workout component renders everything', () => {
  const component = render(
    <Provider store={store}>
      <Router>
        <Workout workout={workout} />
      </Router>
    </Provider>
  )
  
  expect(component).toMatchSnapshot()
})