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
  const component = render(<Provider store={store}><Router><Workout workout={workout} /></Router></Provider>)

  const title = component.getByTestId('workout-title')
  const exnumber = component.getByTestId('workout-exnumber')
  const likes = component.getByTestId('workout-likes')
  const exercises = component.getByTestId('workout-exercises')
  const button = component.getByTestId('viewworkoutbutton')

  expect(title).toHaveTextContent('WORKOUT BY MIKSA')
  expect(exnumber).toHaveTextContent('4')
  expect(likes).toHaveTextContent('2')
  expect(exercises).toHaveTextContent('5x5 pullup')
  expect(exercises).toHaveTextContent('5x5 push up')
  expect(button).toBeDefined()
})