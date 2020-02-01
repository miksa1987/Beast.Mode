import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import User from '../User'

afterEach(cleanup)

const user = {
  id: '12345',
  username: 'Miksa',
  picture: 'xxx'
}

test('User component renders correctly', () => {
  const component = render( <Router><User user={user} /></Router> )
  const picture = component.getByTestId('user-picture')
  const title = component.getByTestId('user-username')

  expect(picture).toBeDefined()
  expect(title).toHaveTextContent('Miksa')
})